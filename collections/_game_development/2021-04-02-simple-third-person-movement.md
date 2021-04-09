---
layout: post
title: Third Person Movement
date: Sat Apr 03 12:35:41 PDT 2021
category: engineering
permalink: /third-person-movement
active: true
---

## Third Person Movement

Create a simple third person character controller in Unity.

### [WIP]

#### Inspiration

- Ratchet & Clank
- 3D Zelda Games

#### Beginning

I wanted to make a simple third person character controller. Nothing fancy, something I could reuse for future demos and give me room to mess around with
different features without building something new each time. It need to be able to walk, run, jump, all with animations.

I also wanted to use Unity's new input manager instead of polling for inputs in a script's update cycle.


To start, I built some simple obstacles from ProBuilder, got a prototype looking model from mixamo, set up some simple lighting, and added cinemachine to control some of the camera controls with its input provider component. 

!! TODO: Insert Scene View

Then I began some of the scripting.

I started with two scripts, one to manage the actual collection and reading of inputs into necessary member variables, and then one to actually perform the locomotion should they be present on the input controller.

```c#
// playerinputcontroller.cs
public class PlayerInputController : MonoBehaviour
{
    private Vector2 _movement;
    public Vector3 nextMovement;

    // Update is called once per frame
    private void Update()
    {
        float speed = 20.0f;
        nextMovement = new Vector3(_movement.x, 0.0f, _movement.y) * speed * Time.deltaTime;
    }

    public void OnMove(InputValue value)
    {
        _movement = value.Get<Vector2>();
    }
}

// playerlocomotioncontroller.cs
public class PlayerLocomotionController : MonoBehaviour
{
    private PlayerInputController _movement;
    private CharacterController _cc;

    private void Start()
    {
        _movement = GetComponent<PlayerInputController>();
        _cc = GetComponent<CharacterController>();
    }

    // Update is called once per frame
    void Update()
    {
        _cc.Move(_movement.nextMovement);
    }
}
```

all of that to produce the following.

![animator-1](https://i.ibb.co/zGnCDR0/cc-1.gif){: .post-image}

Wow, how fantastic. They move, diagonals are incorrect, and there isn't any rotation.

Getting the rotation involves some trigonometry. The Brackey's and Sebastion Lague videos (resources) 
have pretty good explanations, but the gist is:

```c#
// playerinputcontroller.cs
float targetAngle = Mathf.Atan2(_movement.x, _movement.y) * Mathf.Rad2Deg;
transform.rotation = Quaternion.Euler(
    0.0f,
    Mathf.SmoothDampAngle(transform.eulerAngles.y, targetAngle, ref _turnSmoothVelocity, 0.12f),
    0.0f
)
```

We set the gameobject's rotation based on the x, y vectors read from the player's input.
`SmoothDampAngle` is some padding to prevent the transform rotation from instantly snapping to the angle created by the input vectors. 
I added a similar dampening technique to accelerate and decelerate the player, as well.

```c#
float targetSpeed = ((isRunning) ? runSpeed : walkSpeed) * _movement.magnitude;
_currentSpeed = Mathf.SmoothDamp(_currentSpeed, targetSpeed, ref _speedSmoothVelocity, _speedSmoothTime);
```

The isRunning variable is set simply as a callback for the unity event fired by the new input manager.
We set it to true in the callback and read from it in the update loop, and because we can get the "state"
of the input in the callback (performed, canceled, etc.), it'll set it self to false when the user lets go of the sprint
input (left shift currently).


After that I added the handling of gravity and jumping.
```c#
// playerlocomotioncontroller.cs
void Update()
{
    Vector3 movement = _input.nextMovement;
    UpdateVerticalVelocity();
    // apply the vertical movement to our movement vector
    movement += _verticalSpeed * Vector3.up * Time.deltaTime;
    _cc.Move(movement);
}

private void UpdateVerticalVelocity()
{
    // gravity * k_sticking gravity proportion
    if (_cc.isGrounded)
    {
        // stick the player to the ground with a proportion
        // of the downward force applied by _gravity
        _verticalSpeed = -_gravity * _stickingGravityProportion;
        if (_input.isJumping)
            _verticalSpeed = _jumpHeight;
    }
    else
    {
        _verticalSpeed -= _gravity * Time.deltaTime;
    }
}
```

The Unity character controller has a nifty isGrounded variable that can determine if the character controller is airborne or not. .Move() does not automatically
account for gravity, so it has to manually supplied to the movement vector in the call to move.
Notice that jumping, while read from the PlayerInputController.cs, is only allowed if the character is grounded, preventing double jumps.

Now that basic movement, jumping, and gravity were all functioning, I wanted to start adding animations, or at least get some rudimentary behaviors down.

After sourcing some animation from Mixamo, I started with a basic animation tree that entered on an idle state and transitioned into a blend tree for "movement". 
A lot of blend trees I've seen from basic tutorials have the idle state in the locomotion blend tree, but I wanted to keep it separate to make actions like running vs idle jump easier to navigate to and from.

![animator-1](https://i.ibb.co/HXm8rqy/animator-1.png){: .post-image}

While setting up the tree I noticed this odd issue in the animation preview when blending between the jog and spring animations.

!! TODO: Add GIF of animator issue.

After some not so accurate google searches, I realized that the issue was that the animation being fed to the blend tree differed in their lengths. This means that the running animation loop cycle took two steps, while the sprint took four.

I swapped out the animation, and the issue was solved.

Next, I simply got a reference to the animator in the locomotion controller and updated an animation parameter "forwardVelocity" that I created based on the input/movement state.

```c#
float forwardVelocity = 0.0f;
if (isMoving)
    forwardVelocity =  ((_input.isRunning) ? 1 : 0.5f);

_animator.SetFloat(_animForwardVelocity, forwardVelocity, 0.1f, Time.deltaTime);
```

This also allowed me to move the actual character controller movement logic into the `OnAnimatorMove()` callback.


After the basic movement was down, I began working on the jump ability.
My original implementation had two possible animations, `jump_idle` and `jump_forward` that were states accessible from the idle and locomotion states in the animator.

![jump-animator-1](https://i.ibb.co/YZKS3xd/original-jump-anim.png){: .post-image}

The code revolving around this implementation, quickly exposed a few issues. The jump startup for the idle animation jump was quite slow, and while I could've resolved this with a quicker animation, I tried hacky method of postponing the actual application of the upwards vector until a unity event from the animation was called that "allowed" the jump.
Then that conflicted with the locomotion jump animation, which had a different startup time. I also tried coroutines, but similar issues appeared, and the whole implementation felt rather weak to me.

I realized that a lot of publicly distributed character controller's, like Unity's from the asset store, use independent states for the different parts of the animation. A jump for instance, could result in an animation flow along the lines of

jump_prep -> jump_takeoff -> jump_takeoff_2 -> jump_peak -> jump_descend -> jump_descend_2 -> jump_land

And jump_land would sometimes be its own sub-tre with parameters determine the type and speed of the landing.
Not only did this seem cleaner and more intuitive, it also felt more extensible. As I realized that my character controller couldn't account for just falling without a jump (like walking off a cliff) without some more hacky code.







