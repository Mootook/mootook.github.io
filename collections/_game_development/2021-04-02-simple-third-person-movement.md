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


To start, I built some simple obstacles from ProBuilder, got a prototype looking model from mixamo, set up some simple lighting, and added cinemachine to control some of the camera controls with its input provider component. Then I began some of the scripting.

I started with two scripts, one to manage the actual collection and reading of inputs into necessary member variables, and then one to actually perform the locomotion should they be present on the input controller.

```c#
// playerinputcontroller.cs
public class PlayerInputController : MonoBehaviour
{
    private Vector2 _movement;
    public Vector3 nextMovement;

    // Start is called before the first frame update
    private void Start()
    {
        
    }

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

!! TODO: Insert GIF

Wow, how fantastic. They move, diagonals are incorrect, and the main issue concerns the incorrect rotation when the camera moves independently of the player. Forward or "W", in this case, always
translates to the original rotation's forward, so even when the camera rotated, the character controller was unaware.

Brackey's video has a solution for this:

```c#


```

