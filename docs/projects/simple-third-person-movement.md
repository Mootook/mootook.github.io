---
title: Third Person Movement
date: Sat Apr 03 12:35:41 PDT 2021
---

## Third Person Movement

### Objective/Inspiration

The third person character controller is a staple in platformers and shooters. While there are many assets for pre-built controllers for quick prototypes, I wanted to try my hand at making one and seeing what went into creating a playable third-person character -- what made it feel responsive or laggy, what range of animations/actions were crucial, and how could I make one that was useful as a base for future extensibility.

#### Ratchet & Clank

I've been watching my partner play through the PS4 re-imagining of Ratchet & Clank the past few weeks, and I've been most interested in the fluidity and responsiveness of the character controller.
It's a snappy game that requires the ability to traverse platforms and obstacles while being able to snap and lock focus on combat and shooting at any time. For those reasons, R&C needed a fundamentally sound controller scheme that focused more on find movement rather than a large swath of actions.

I think R&C is a really good example of a simple yet versatile and effective character controller. I knew moving into this project, I wanted my own implementation to have that responsiveness.

<div style="width: 100%; text-align: center">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/hlS11AnILXs?start=372"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    >
    </iframe>
</div>

#### 3D Zelda Games

3D zelda games are a good base for character controllers. They are simple and unobstructive. In opposition to R&C, where a large part of the game is centered around mastering the movement and skills of the character, 3D zeldas have much less focus on this relationship.

The joy of zelda games, for me, come from the puzzles and environments. It's much slower than R&C with fewer things going on at any time. The camera is often positioned for the player rather than by them, and the moveset is simpler to account for the narrow focus. While this may sound like a negative opinion, I really do think the control of Link is a rather important feature because of how unobtrusive it is. It never gets in your way yet gives you all that you need to explore and interact with the world.

<div style="width: 100%; text-align: center">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/2xnA9tAqaUg?start=4789"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    >
    </iframe>
</div>

### Beginning

I wanted to make a simple third person character controller. Nothing fancy, something I could reuse for future demos and give me room to mess around with
different features without building something new each time. It need to be able to walk, run, jump, all with animations.

I also wanted to use Unity's new input manager instead of polling for inputs in a script's update cycle.

To start, I built some simple obstacles from ProBuilder, got a prototype looking model from mixamo, set up some simple lighting, and added cinemachine to control some of the camera controls with its input provider component. 

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

Wow, how fantastic.

Let's try some rotation.

Getting the rotation involves some trigonometry.
The Brackey's and Sebastion Lague videos (resources) have pretty good explanations, but the gist is:

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
I also added a similar dampening technique to accelerate and decelerate the player, as well.

```c#
float targetSpeed = ((isRunning) ? runSpeed : walkSpeed) * _movement.magnitude;
_currentSpeed = Mathf.SmoothDamp(_currentSpeed, targetSpeed, ref _speedSmoothVelocity, _speedSmoothTime);
```

The `isRunning` variable is set simply as a callback for the unity event fired by the new input manager.
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

The Unity character controller has a nifty `isGrounded` variable that can determine if the character controller is airborne or not.
`Move()` does not automatically account for gravity, so it has to be manually supplied to the movement vector in the call to move.

Notice that jumping, while read from the `PlayerInputController.cs`, is only allowed if the character is grounded, preventing double jumps.

### Animation

Now that basic movement, jumping, and gravity were all functioning, I wanted to start adding animations, or at least get some rudimentary behaviors down.

After sourcing some animation from [Mixamo](https://www.mixamo.com/), I started with a basic animation tree that entered on an idle state and transitioned into a blend tree for "Locomotion".

A lot of blend trees I've seen from basic tutorials have the idle state in the locomotion blend tree, but I wanted to keep it separate to make actions like running vs idle jump easier to navigate to and from.
It'd also be nice to treat idle as its own independent state machine in case I wanted to play different idle animations within the "idle" state.

<div style="width: 100%; text-align:center;">
    <img style="width:50%; height:50%" src="https://i.ibb.co/HXm8rqy/animator-1.png">
</div>

<br/>
While setting up the blend tree, however, I noticed this odd issue in the animation preview when blending between the jog and spring animations.
<br/>

<div style="width: 100%; text-align:center;">
    <img style="width:60%; height:60%" src="https://i.ibb.co/3rbf3hJ/anim-locomotion-bug.gif">
</div>

<br/>

After some not so accurate google searches, I realized that the issue was that the animation being fed to the blend tree differed in their lengths. This means that the running animation loop cycle took two steps, while the sprint took four.

I swapped out the animation, and the issue was solved.

Next, I simply got a reference to the animator in the locomotion controller and updated an animation parameter `forwardVelocity` that I created based on the input/movement state.

```c#
float forwardVelocity = 0.0f;
if (isMoving)
    forwardVelocity =  ((_input.isRunning) ? 1 : 0.5f);

_animator.SetFloat(_animForwardVelocity, forwardVelocity, 0.1f, Time.deltaTime);
```

This also allowed me to move the actual character controller movement logic into the `OnAnimatorMove()` callback.

After the basic movement was down, I began working on the jump ability.
My original implementation had two possible animations, `jump_idle` and `jump_forward` which were states accessible from the idle and locomotion states in the animator.

<div style="width: 100%; text-align:center;">
    <img style="width:80%; height:80%" src="https://i.ibb.co/YZKS3xd/original-jump-anim.png">
</div>

The code revolving around this implementation, quickly exposed a few issues. The jump startup for the idle animation jump was quite slow, and while I could've resolved this with a quicker animation, I tried hacky method of postponing the actual application of the upwards vector until a unity event from the animation was called that "allowed" the jump.
Then that conflicted with the locomotion jump animation, which had a different startup time. I also tried coroutines, but similar issues appeared, and the whole implementation felt rather weak to me.

I realized that a lot of publicly distributed character controller's, like [Unity's](https://assetstore.unity.com/packages/templates/tutorials/3d-game-kit-115747) from the asset store, use independent states for the different parts of the animation.

A jump for instance, could result in an animation flow along the lines of

`jump_prep -> jump_takeoff -> jump_takeoff_2 -> jump_peak -> jump_descend -> jump_descend_2 -> jump_land`

And `jump_land` would sometimes be its own sub-tree with parameters determine the type and speed of the landing.

Not only did this seem cleaner and more intuitive, it also felt more extensible. Proceeding with this method, I also realized that my initial character controller couldn't account for just falling without a jump (like walking off a cliff) without some more hacky code. This new way solved for that.

The first pass with isolated `Airbone` states wasn't all that bad:

![jump-animator-2](https://i.ibb.co/Sc34s0s/anim-jump-1.gif){: .post-image}

Definitely quite rough, but I think the the logic is far more sensible. The biggest problem is the landing, which is caused by the `isGrounded` boolean (from the character controller) being set too early.
One of the animations in the airborne tree is applying some root motion that is offsetting the model from the character controller, so the landing animation isn't matching when the character actually lands.

![cc-anim-bug](https://i.ibb.co/jzFWJ7g/cc-anim-bug.png)

It's a little easier to see here, where the character is still in the 'airborne' blend tree. 
Yet the animation for landing lags behind, so the character looks odd when they land.


The fix is largely dependent on the animation, a fix likely happening by modifying the root motion displacement on the landing. It would also be nice to have a static animation for something like "prepare_landing". A lot of character controllers that implement a snappy jump resolve the final stages of the animation descent with a character's legs extended, almost to account for this (and also to combat for the fact that few fast controller's have impact landing to maintain momentum when moving and jumping).

As of right now this implementation is "good enough", even though it's not that easy to look at, I think it'll serve its purpose well. It's largely an issue of polish (which in my experience often takes just as much time as the initial implementation), and it's for sure something to which I'll come back.


### Current State

This, by design, was something I wanted to implement quickly, get a feel for, and iterate upon in the future.

The first iteration [05.11.2021] includes basic 3D locomotion, jumping, and falling.

<div style="width: 100%; text-align: center">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/OYi6gO65fJ0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    >
    </iframe>
</div>

### Next Steps 

Possible things I want to add or polish:

- Falling/Landing animation states
    - https://gamedev.stackexchange.com/questions/162853/how-to-disable-animation-root-motion
    - https://assetstore.unity.com/packages/3d/animations/movement-animset-pro-14047 
    - https://learn.unity.com/search?k=%5B%22q%3AAnimation%22%5D 
- Double jump
- Ledge hanging (pull up to ledge)
- Camera centering and focus (Zelda style z-targeting)

<br/>

### Resources
- [Creating a Third Person Camera using Cinemachine in Unity](https://www.youtube.com/watch?v=537B1kJp9YQ&ab_channel=Unity)
- [Should You Use Root Motion?](https://www.youtube.com/watch?v=j7XZ3Q8JNfM&ab_channel=BirdmaskStudio)
- [Creating a Character in Uncharte: Drake's Fortune (GDC Slides)](https://ubm-twvideo01.s3.amazonaws.com/o1/vault/gdc08/slides/S6169i1.pdf)
- [Unity Third Person Control Video Series](https://www.youtube.com/watch?v=b0PvJ4AWvWQ&list=PLKFvhfT4QOqlEReJ2lSZJk_APVq5sxZ-x&index=2&ab_channel=JohnMac)
- [Character Creation Series](https://www.youtube.com/watch?v=sNmeK3qK7oA&ab_channel=SebastianLague)