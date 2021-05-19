---
title: Almost Katamari Damacy
date: Sat Apr 14 12:35:41 PDT 2021
thumbnail: https://i.ibb.co/yknnM6w/katamari-damacy-gameplay-Moment.jpg
prev:
    text: Back to Projects
    link: /projects
---

# Almost Katamari


## Objective / Inspiration

I've been watching my partner play through [Katamari Damacy](https://www.nintendo.com/games/detail/katamari-damacy-reroll-switch/) on the Nintendo Switch lately.
I'd never really played or seen this game, only heard about it as the game where you "roll a bunch of stuff into a ball."

Interesting...

I tried a level and was thrown off within an instant by the whacky control scheme. It seemed unintuitive and unnecessarily difficult. After a few attempts though, I started to get the hang of it.
I still lost the level and had to hand the controller back to my partner.
We both watched the King of All Cosmos express his immense disappointment in my abilities.
Yet I had become convinced that the controls suited the game. It's a simple game, with a simple objective: roll junk into a ball. And the quirky controls add a bit of a learning curve to it, and, for my experience, fed into the katamari chaos.

I then wanted to see if I could mock up the core of Katamari's gameplay. So much of the game is about its other components -- the amazing soundtrack, iconic art, somewhat reflective and deprecating messaging about consumerism, or something. But in essence, I wanted to replicate the core mechanical interaction between the player, the katamari, and all the stuff you get to roll-up.

<VideoFrame videoUrl="https://www.youtube.com/embed/hEAP-4iUirY" />

## Beginning

I started the scene by adding some of the usual packages: the new input manager, probuilder, and progrids. I also download this [asset](https://assetstore.unity.com/packages/3d/props/interior/polygon-office-low-poly-3d-art-by-synty-159492) (Synty's low poly 3d art) from the unity asset store in preparation for the 'interactable' items I'd like to implement.

![editor-1](https://i.ibb.co/LCd2Jdw/editor-1.png)

With a rigidbody and input handler on the katmari game object, I started by trying to understand the whacky controls.


## Movement

![controls](https://i.ibb.co/nmSrnkQ/controls.png)

Trying to convert these into a program, even as pseudo-code, took me a bit to understand, and I had to spend a great deal of time in the Katamari tutorial area seeing how different axes configurations impacted the movement and rotation of the katamari.

So first was getting movement down, as that seemed simplest. If the two joysticks are in approximately similar directions then it should be considered a movement in that direction of the two input vectors. 

I set up Unity's new input manager to read the left and right sticks of a gamepad as normalized input vectors.

```cs
// KatamariInputController.cs
public void OnLeftThrottle(InputValue val)
{
    _leftThrottle = val.Get<Vector2>();
}

public void OnRightThrottle(InputValue val)
{
    _rightThrottle = val.Get<Vector2>();
}
```

The best way I thought of to determine the directional similarity of the two inputs was using their dot product.
A positive dot product means the vectors are going in mostly the same direction, thus the input should be considered a movement, and if they're negative, then they're in opposing directions, and we should treat the input as a rotation.

```cs
// KatamariInputController.cs
private void Update()
{
    Vector3 localForce = Vector3.zero;
    if (_leftThrottle != Vector2.zero && _rightThrottle != Vector2.zero)
    {
        _dot = Vector2.Dot(_leftThrottle, _rightThrottle);
        if (_dot > 0.0f)
        {
            float avgX = (_leftThrottle.x + _rightThrottle.x) / 2;
            float avgY = (_leftThrottle.y + _rightThrottle.y) / 2;
            localForce = new Vector3(avgX, 0.0f, avgY):
        }
    }
    nextForce = localForce;
}

// KatamariController.cs
private void Start()
{
    _input = GetComponent<KatamariInputController>(); 
    _rb = GetComponent<Rigidbody>();
}

private void FixedUpdate()
{
    if (_input.nextForce != Vector3.zero)
        _rb.AddForce(_input.nextForce * pushForce);
}
```

Excellent.

## Rotation

If the two input vectors are not pointing in the same direction, or if one is zero while the other isn't, the camera is rotated (orbited?) about the katamari. 

Another feature of this control scheme is that inverted input vectors (i.e l=(0, 1) r=(0, -1)) accelerate the rotation. And the camera never rotates when there is the input necessary for movement. In Katamari, it's one or the other. Rotation or movement.

This control scheme became a little easier when I thought of the left and right inputs as the left and right hands of the Prince of the Cosmos, pulling and pushing the katamari about the level.

Positive on the left (0, 1) pushes on the left-hand side of the katamari, thus we get a clockwise rotation about the y axis.

Positive on the right (0, 1) push on the right-hand side of the katamari, and thus we get counter-clockwise rotation about the y axis.

First, I created a new script to manage the camera and follow the katamari's position.
Putting the tracking logic in `LateUpdate()` made sure that the any movements applied to the katamari were finished when the camera was up to transform its own position.

```cs
// SimpleCameraFollow.cs
private void LateUpdate()
{
    UpdateTarget();
    Vector3 target = _target.position;
    Vector3 lookDir = transform.forward;
    transform.localPosition = target - lookDirection * distance;
}
```

Since there's only 1 axis about which to rotate, I simply stored the rotation direction in this camera script, being set by the input controller.
```cs
// KatamariInputController.cs
private void Update()
{
    _camController.StickYToRotation(_leftThrottle.y, _rightThrottle.y);
    // rigidbody force stuff
}

// SimpleCameraFolllow.cs

private void LateUpdate()
{
    UpdateTarget();
    ManualRotation();
    Quaternion lookRotation = Quaternion.Euler(orbitAngles);
    // set the local position
    Vector3 lookDirection = lookRotation * Vector3.forward;
    // Add one on the y to keep the camera off the ground
    Vector3 localPosition = (_targetPoint - lookDirection * distance);
    localPosition.y += 1;
    transform.SetPositionAndRotation(localPosition, lookRotation);
}

private void ManualRotation()
{
    const float e = 0.001f;
    if (rotationDir > e || rotationDir < -e)
        orbitAngles.y += rotationSpeed * Time.unscaledDeltaTime * rotationDir;
}

private void UpdateTarget()
{
    // update target properties
    Vector3 nextTarget = target.position;
    // force radius allows for a "deadzone"
    // with the camera follow
    // if the distance between the target on the last frame and current frame
    // is larger than the parameter,
    // Lerp into this new target point,
    // if not, no movement.
    if (forceRadius > 0f)
    {
        float distance = Vector3.Distance(nextTarget, _targetPoint);
        // amount to interpolate
        float t = 1f;
        // recenter the camera to create a 
        // 'catching up' effect
        if (distance > 0.01f && focusCentering > 0f)
            t = Mathf.Pow(1f - focusCentering, Time.unscaledDeltaTime);
        if (distance > forceRadius)
            t = Mathf.Min(t, forceRadius / distance);
        _targetPoint = Vector3.Lerp(nextTarget, _targetPoint, t);
    }
    else
        _targetPoint = nextTarget;
}                                                                                                        

public void StickYToRotation(float ly, float ry)
{
    const float e = 0.001f;
    if (ly > e || ly < -e)
        rotationDir = ly;
    else if (ry > e || ry < -e)
        // invert the ry as it behaves as the inverse of ly for rotationDir
        rotationDir = -ry;
    else
        rotationDir = 0;
}
```

This worked nicely, and now it was a matter some conditions for ironing out the edge cases of accelerated rotation and preventing rotation when the inputs yielded movement.


```cs
// KatamariInputController.cs

// in Update()
if (_dot > 0.0f)
{
    // movement stuff
    _camController.HaltRotation();
}
else if (_dot < 0.0f)
{
    _camController.AccelerateRotation();
}
```

<VideoFrame videoUrl="https://www.youtube.com/embed/ZD3gld127-I" />


## Picking up stuff

Time for the heart of Katamari's gameplay. Rolling stuff into a ball.

I started by creating a simple cube, adding a box collider, and a rigid body. Fantastic.
I figured when the katamari collides with some "prop" (my term for anything the player could pick up), I could just parent the prop to the katamari, allowing
its position, rotation, etc. to just be informed by the player input's.

Yet Unity's physics engine understandably has a rough time with this...rigidbodies existing in one another is really not possible, and it creates some funky behavior.

To combat this, I just detected the collision with Unity's `OnCollisionEnter(Collision collider)`.

```cs
// StickyProp.cs
private void OnCollisionEnter(Collision collider)
{
    if (
        collider.gameObject.tag == "Katamari" &&
        CanBeAbsorbed(collider.gameObject)
    )
    {
        StickToKatamari(collider.gameObject);
    }
}
```
And, called a private function in the same file called `StickToKatamari` assuming some basic checks passed (`CanBeAbsorbed()` is a stubbed function that always returns true, but I plan to use it to reject sticking object's bigger than the katamari).

`StickToKatamari()` firstly needed to destroy the rigidbody, so that the following re-parenting didn't bug everything out.
It then needed to do the re-parenting and call any additional functionality on object pickup.

In the actual game, this list is quite long:
- sound 
- shows the latest item picked up
- extends the distance the camera
- Updates the gui for ball size
- some other stuff im probably missing

<br />

```cs
// StickyProp.cs
private void StickToKatamari(GameObject katamari)
{
    Destroy(_rb);
    transform.SetParent(katamari.transform);
}
```
Seeing as I was going to create a large amount of these "props", I decided to spend some time converting the gameobject structure into a prefab that I could just attach different meshes onto.

Applying that onto some sandwiches and we get:


<VideoFrame videoUrl="https://www.youtube.com/embed/7ke_cvaE2LA" />


With this, the core implementation felt more or less "in-place". Level design was a beast itself, and I put all of the UI bits on hold while I looked into polishing some of this behavior.

One of the biggest differences I noticed in playing a Katamari level and my own prototype was that no matter how much stuff you collect onto the ball, it more or less retains the movement of a sphere.
Occasionally there will be some long object on the katamari that can upset it, but the player can always roll forward.

This, it seems, is done, by fudging some of the colliders once they get attached to the Katamari and that the sphere's collider of the katamari is large enough to encapsulate all of the stuck objects with a few exceptions.

And, subtly, as the katamari gets bigger, the camera distances itself on both the z and y axes, which, I assume, is done by manually incrementing the camera's offset each item pickup.

![Colliders](https://i.ibb.co/DGSsG7n/knife-in-ground.png)

For my own implementation I created a child on the "prop" prefab, onto which I attached the mesh collider, and once it was picked up, I shrunk it in half.
Outliers would still operate the same, but it wouldn't absolutely upset the momentum and force applied to the sphere.
I also expanded the sphere collider on the katamari itself when it picked up a new object.

```cs
// StickyProp.cs
private void StickToKatamari(GameObject katamari)
{
    foreach (Transform child in transform)
    {
        if (child.tag == "PropMesh")
            child.localScale /= 2;
    }
    Destroy(_rb);
    transform.SetParent(katamari.transform)

    KatamariController kController = katamari.GetComponent<KatamariController>();
    kController.Expand();

    _cam.IncreaseDistance();
}
```

This also helped with "props" that required multiple mesh colliders. 

## Not picking up stuff

Not picking up stuff required addressing Katamari's "sizing" system, or whatever internal logic is used to govern if or when the player can roll up a specific prop.
At first it made the most to have this be determined by the Katamari's size...can only pick up props that the ball is larger than. Compare its bounds to that of the mesh in question, and good to go.
Yet as I played Katamari, I noticed that this behavior was not consistent. You could, for instance, pick up vending machines before people in some instances, or fences before small bushes, etc etc.

This led me to the conclusion that the sizes must be manually being set, allowing designers to block certain props from being picked up until certain thresholds are met. 
The challenge of Katamari is often about passing these invisible thresholds, and the fun comes from when the player succeeds and are able to roll everything up without interruption. Then they are moved into a new area to restart the process.

It's a little more cumbersome to manually specify sizes on each object, but it gives the designers more control over the experience.


## The level

With some of the basics out of the way. I started designing out a level!
Most Katamari levels start somewhere small: on a table, under a car. And the player is generally restricted to a singular area. The areas with larger props aren't necessarily inaccessible, but they are often hard to get to, and because the paths are lined with bigger and bigger items, they become impossible to navigate.

With most of my props being office-centric, I figured it'd be cool to start on a desk or table, which would explain the large amounts of calculators, coffee cups, sandwiches, and the katamari could slowly progress to different areas of the office: cubicles, conference rooms, break rooms, the kitchen, maybe a lobby.



## Resources

- [CatLikeCoding Orbit Camera](https://catlikecoding.com/unity/tutorials/movement/orbit-camera/)
- [Unity Forums Sticky Ball](https://answers.unity.com/questions/634831/how-do-i-make-make-objects-stick-to-a-ball-and-aff.html)
- [Unity Forums](https://answers.unity.com/questions/512537/oncollisionenter-that-effects-only-the-parent-or-o.html)
- [Reddit Katamari-Like Showcase](https://www.reddit.com/r/Unity3D/comments/kv46c4/one_of_my_favorite_things_about_unity_is_the/)



