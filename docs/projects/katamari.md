---
title: Remaking Katamari Damacy
date: Sat Apr 14 12:35:41 PDT 2021
thumbnail: https://i.imgur.com/brVDhzzm.jpg
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
Yet I had become convinced that the controls suited the game. It's a simple game, with a simple objective: roll junk into a ball. And the quirky controls add a bit of a learning curve to it and, for my experience, fed into the katamari chaos.

I then wanted to see if I could mock up the core of Katamari's gameplay. So much of the game is about its other components -- the amazing soundtrack, iconic art, somewhat reflective and deprecating messaging about consumerism, or something. But in essence, I wanted to replicate the core mechanical interaction between the player, the katamari, and all the stuff you get to roll-up. I made a repo and named my project "Almost Katamari."

<VideoFrame videoUrl="https://www.youtube.com/embed/hEAP-4iUirY" />

## Beginning

I started the scene by adding some of the usual packages: the new input manager, ProBuilder, and ProGrids. I also download this [asset](https://assetstore.unity.com/packages/3d/props/interior/polygon-office-low-poly-3d-art-by-synty-159492) (Synty's low poly 3d art) from the unity asset store in preparation for the "interactable" items I wanted to implement.

![editor-1](https://i.imgur.com/yHNM1pG.png)

With a rigidbody and input handler on the katmari game object, I started by trying to understand the whacky controls.


## Movement

![controls](https://i.imgur.com/CmPlb7f.png)

Trying to convert these into a program, even as pseudo-code, took me a bit to understand, and I had to spend a great deal of time in the Katamari tutorial area seeing how different axes configurations impacted the movement and rotation of the katamari.

So first was getting movement down, as that seemed simplest. If the two joysticks are in approximately similar directions then it should be considered a movement in that direction of the two input vectors. 

I set up Unity's new input manager to read the left and right sticks of a gamepad as normalized input vectors.

```cs
// KatamariInputController.cs
public void OnLeftThrottle(InputValue val)
{
    leftThrottle = val.Get<Vector2>();
}

public void OnRightThrottle(InputValue val)
{
    rightThrottle = val.Get<Vector2>();
}
```

The best way I thought of to determine the directional similarity of the two inputs was using their dot product.
A positive dot product means the vectors are going in mostly the same direction, thus the input should be considered a movement, and if they're negative (or only one has a positive magnitude), then they're in opposing directions, and we should treat the input as a rotation.

```cs
// KatamariInputController.cs
private void Update()
{
	Vector2 flatMovement = InputToFlatMovement();
    nextForce = new Vector3(flatMovement.x, 0.0f, flatMovement.y);
}

private Vector2 InputToFlatMovement()
{
	Vector2 input = Vector2.zero;
    float inputDot = Vector3.Dot(leftThrottle, rightThrottle);

    bool inputsApproximatelySameDirection = inputDot > 0.0f;
    if (inputsApproximatelySameDirection)
    {
        float avgZ = (leftThrottle.y + rightThrottle.y) / 2.0f;
        float avgX = (leftThrottle.x + rightThrottle.x) / 2.0f;
        input.y = avgZ;
        input.x = avgX;
    }
    return input;
}

// KatamariController.cs
private void Start()
{
    input = GetComponent<KatamariInputController>(); 
    rigidBody = GetComponent<Rigidbody>();
}

private void FixedUpdate()
{
    if (input.nextForce != Vector3.zero)
        rb.AddForce(input.nextForce * pushForce);
}
```

Excellent.

## Rotation

If the two input vectors are not pointing in the same direction, or if one is zero while the other isn't, the camera is rotated (orbited?) about the katamari. 

Another feature of this control scheme is that inverted input vectors (i.e l=(0, 1) r=(0, -1)) accelerate the rotation. And the camera never rotates when there is the input necessary for movement. In Katamari, it's one or the other. Rotation or movement.

This control scheme became a little easier when I thought of the left and right inputs as the left and right hands of the Prince of the Cosmos, pulling and pushing the katamari about the level.

Positive on the left (0, 1) pushes on the left-hand side of the katamari, thus we get a clockwise rotation about the y axis.

Positive on the right (0, 1) push on the right-hand side of the katamari, and thus we get counter-clockwise rotation about the y axis.

Rotating the katamari offsets its relative forward direction, and so in the next frame where we apply that input force, we need to account for this transformation. At first, I embedded this logic in a camera script. Inputs that were considered rotations would just orbit the camera about the katamari. Then, in the next frame of applying force, the katamari would just modify its values in relation to the space of the camera's rotation.

Yet it felt odd for the katamari's input and motion to be aware of this. It would perhaps make more sense if complex rotational transforms were present in Katamari, but in general the only transformation that needs to be accounted for before applying force is rotation about the y-axis.

So I stored this rotation in the y component of the input handler's `nextForce` instance variable.

```cs
// KatamariInputController.cs
private void Update()
{
	Vector2 flatMovement = InputToFlatMovement();
    float yRotation = InputToYRotation();
    nextForce = new Vector3(flatMovement.x, yRotation, flatMovement.y);
}

private float InputToYRotation()
{
    float yRotation = 0.0f;

    float leftVertical = leftThrottle.y;
    float rightVertical = rightThrottle.y;

    bool leftPush = leftVertical > rightVertical && leftVertical > 0.0f;
    bool leftPull = Mathf.Abs(leftVertical) > rightVertical && Mathf.Abs(leftVertical) > 0.0f;

    bool rightPush = rightVertical > leftVertical && rightVertical > 0.0f;
    bool rightPull = Mathf.Abs(rightVertical) > leftVertical && Mathf.Abs(rightVertical) > 0.0f;

    if ((leftPush && !rightPush) || (rightPull && !leftPull))
        yRotation = (leftVertical - rightVertical) / 2.0f;
    else if ((rightPush && !leftPush) || (leftPull && !rightPull))
        yRotation = -Mathf.Abs((leftVertical - rightVertical)) / 2.0f;

    return yRotation;
}

```

In order to account for the `yRotation` when the force is actually applied, I just got the result of the force's application against this rotational transformation.

```cs
// KatamariController.cs
private void Update()
{
    rotationY += input.nextForce.y * Time.deltaTime * rotationMultiplier;
}

private void FixedUpdate()
{
    ApplyInputForce();
}

private void ApplyInputForce()
{
    float lateralInput = input.nextForce.x;
    float forwardInput = input.nextForce.z;

    Vector3 force = new Vector3(
        lateralInput * forceMultiplier,
        0.0f,
        forwardInput * forceMultiplier
    );

    velocity = Forward() * force;
    rigidBody.AddForce(velocity);
}

private Quaternion Forward()
{
    Vector3 forward = new Vector3(0, rotationY, 0);
    return Quaternion.Euler(forward);
}
```

After that, the camera's logic (A lot of this logic was frankensteined from [UnderGear's Klonmari](https://github.com/UnderGear/Klonamari/).) became much simpler in that it only needed to update its position and continue to `transform.LootAt(katamari.transform)` in its `LateUpdate()`.

<VideoFrame videoUrl="https://www.youtube.com/embed/ZD3gld127-I" />


## Picking up stuff

Time for the heart of Katamari's gameplay. Rolling stuff into a ball.

I started by creating a simple cube, adding a box collider, and a rigid body. Fantastic.
I figured when the katamari collides with some "prop" (my term for anything the player could pick up), I could just parent the prop to the katamari, allowing
its position, rotation, etc. to just be informed by the player input's.

Yet Unity's physics engine understandably has a rough time with this...rigidbodies existing in one another is really not possible, and it creates some funky behavior.

To combat this, I just detected the collision with Unity's `OnCollisionEnter(Collision collider)`.

```cs
// KatamariController.cs
private void OnCollisionEnter(Collision colllision)
{
  EvaluateCollision(collision);
}

private void EvaluateCollision(Collision collision)
{
   AttemptStick(collision);
}

private bool AttemptStick(Collision collision)
{
    bool collisionIsGround = collision.gameObject.layer == 6;
    if (collisionIsGround)
        return false;

    Transform collisionTransform = collision.transform;
    StickyProp prop = collisionTransform.GetComponent<StickyProp>();
    bool didStick = false;
    if (prop && prop.CanBeAbsorbed(Mass))
    {
        StickProp(prop);
        didStick = true;
    }
    else if (ShouldDetachRandomProp(collision))
        DetachRandomProp();

    return didStick;
}

private void StickProp(StickyProp prop)
{
    rigidBody.mass += prop.Mass;
    prop.Stick(this);
}
```
In evaluating the collision, the katamari is given time to check if the collision should result in the object being picked up `AttemptStick()`, and, if some checks (`CanBeAbsorbed(Mass)`) pass, pick it up `StickProp(prop)`.

In Katamari, when an object is picked up, quite a few things happen.

- A "success" sound is played
- The object and name is shown in the UI
- A temporary line is drawn from the UI object to its location on the katamari
- The UI representation of the katamari is updated
- Camera is distanced (not incrementally, but seemingly at certain size thresholds).

The prop's responsibility though, is quite small. It only needed to modify itself so that it could stick to the katamari.

```cs
// StickyProp.cs
private void Stick(KatamariController katamari)
{
    Destroy(rigidBody);
    transform.SetParent(katamari.gameObject.transform);

    Transform compoundCollider = ChildColliderParent();
    compoundCollider.gameObject.layer = AbsorbedLayerMask();
    if (compoundCollider)
        SetLayerForAbsorbedColliders(compoundCollider);
}

private void SetLayerForAbsorbedColliders(Transform compoundCollider)
{
    foreach (Transform collider in compoundCollider)
        collider.gameObject.layer = AbsorbedLayerMask();
}

private LayerMask AbsorbedLayerMask()
{
    return LayerMask.NameToLayer(ABSORBED_LAYER);
}
```
Changing the Layer of any stuck props was just to ensure that they didn't bug each other out.

Seeing as I was going to create a large amount of these "props", I decided to spend some time converting the gameobject structure into a prefab that I could just attach different meshes onto and create child compound colliders within.

Applying that onto some sandwiches and we get:


<VideoFrame videoUrl="https://www.youtube.com/embed/7ke_cvaE2LA" />


With this, the core implementation felt more or less "in-place". Level design was a beast itself, and I put all of the UI bits on hold while I looked into polishing some of this behavior.

One of the biggest differences I noticed in playing a Katamari level and my own prototype was that no matter how much stuff you collect onto the ball, it more or less retains the movement of a sphere.
Occasionally there will be some long object on the katamari that can upset it, but the player can always roll forward.

This, it seems, is done, by fudging some of the colliders once they get attached to the Katamari and that the sphere's collider of the katamari is large enough to encapsulate all of the stuck objects with a few exceptions.

![Colliders](https://i.imgur.com/xjqwDVy.jpg)

For my own implementation I created a child on the "prop" prefab, onto which I attached the child colliders (either a singular boxcollider or an empty game object that parented a list of box colliders for more complex meshes).

When the prop was picked up, I then fudged its position by a configurable parameter.

```cs {6,14-17}
// StickyProp.cs
private void Stick(KatamariController katamari)
{
    Destroy(rigidBody);
    transform.SetParent(katamari.gameObject.transform);
    MoveTowardsParent();

    Transform compoundCollider = ChildColliderParent();
    compoundCollider.gameObject.layer = AbsorbedLayerMask();
    if (compoundCollider)
        SetLayerForAbsorbedColliders(compoundCollider);
}

private void MoveTowardsParent()
{
    transform.localPosition /= absorbedToCenterDivisor;
}
```

Yet this didn't solve the issue of longer props. Adding force to the katamari only goes forward, and when objects are sticking out, the application force simply pushes forward and does nothing to roll it over the prop.

<VideoFrame videoUrl="https://www.youtube.com/embed/MvKq0-L_KeI" />

The solution  was to add torque to the katamari, informed similarly to the force.



```cs {4}
// KatamariController.cs
private void FixedUpdate()
{
    ApplyInputTorque();
    ApplyInputForce();
}

private void ApplyInputTorque()
{
	float forwardInput = input.nextForce.z;
    float lateralInput = input.nextForce.x;

    Vector3 torque = new Vector3(
        forwardInput * torqueMultiplierWithMass,
        input.nextForce.y * torqueMultiplierWithMass,
        -lateralInput * torqueMultiplierWithMass
    );

    rigidBody.AddTorque(Forward() * torque);
}
```

The x and z components have been switched from the force vector as the axis about which to apply the torque should be perpendicular to the forward direction.

## Climbing

With the current implementation, a lot of the basic actions were out of the way. Movement about the x and z of the world felt more or less in place, and in between starting level design and begging my partner into making me a Katamari styled song for game, I wanted to start adding the ability to climb.

In Katamari, most objects you bump into ricochet you away. If you were moving fast enough, some of your collected items will fly off with accompanying sound. Yet if you approach an object slowly and then continue to move forward against the object, you can actually ascend it. It's a pretty fun way to traverse the level and makes for some interesting moments (some presents are hidden in high places, requiring the player to explore a level's verticality).

Climbing in Katamari is pretty odd, but it's a mechanic I enjoy quite a bit, and after my partner and I had beaten the main game, we started going back through all the levels to find the presents (collectibles that the Prince can wear). A lot of these are in difficult places and involve climbing.

<VideoFrame videoUrl="https://www.youtube.com/embed/G9qs5B6bzOs?start=76" />

Of course, in Unity, this interaction isn't natural. Pushing a ball straight into a wall or flat surface can't possibly make it rise, and thus, it was time to lie.

I followed [this](https://catlikecoding.com/unity/tutorials/movement/climbing/) great tutorial from [Catike Coding](https://catlikecoding.com/) (and by followed, I mean ripped a great chunk of the code from and wrestled it into place). The general idea is to determine the nature of a collision when the katamari bumps up against something. One can cache data returned from these collision events and use them to determine how the katamari should respond to different types of collisions.

```cs
// KatamariController.cs
private void EvaluateCollision(Collision collision)
{
    if (AttemptStick(collision))
        return;

    int layer = collision.gameObject.layer;
    for (int i = 0; i < collision.contactCount; i++)
    {
        Vector3 normal = collision.GetContact(i).normal;
        float upDot = Vector3.Dot(Vector3.up, normal);

        if (CollisionIsClimbable(upDot, layer))
            UpdateStateForClimb(normal);
        else if (CollisionIsGround(upDot))
            UpdateStateForGround(normal);
    }
}

private bool CollisionIsClimbable(float collisionUpDot, int collisionLayer)
{
    return collisionUpDot >= minClimbDotProduct && (climbMask & (1 << collisionLayer)) != 0;
}

private bool CollisionIsGround(float collisionUpDot)
{
    return collisionUpDot >= minGroundDotProduct;
}
```

Here, we're determining whether the active collision being processed is the either the ground or some obstacle in front.

For fuller explanations on the math, definitely check out Catlike Coding's tutorials (and all of them for that matter, they're really great).

Then, in the `FixedUpdate()`, the cache data can be used to inform the velocity of the Katamari, allowing for climbing!

```cs {9,11}
// KatamariController.cs
private bool Climbing => climbContactCount > 0 && Vector3.Dot(lastClimbNormal, velocity) < maxClimbInputDotProduct;

private void FixedUpdate()    
{
    ApplyInputTorque();
    ApplyInputForce();

    AdjustVerticalVelocity();

    ClearState();
}

private void AdjustVerticalVelocity()
{
    Vector3 currentVelocity = rigidBody.velocity;
    float forceToVelocityFactor = 0.0001f;
    if (Climbing)
        currentVelocity.y = climbForceMultiplier * forceToVelocityFactor;
    else
        currentVelocity.y += gravity * Time.deltaTime;

    rigidBody.velocity = currentVelocity;
}

private void ClearState()
{
    groundContactCount = climbContactCount = 0;
    contactNormal = climbNormal = Vector3.zero;
}
```

The manual application of gravity means the `Use Gravity` flag on the rigidbody just needs to be disabled so that it can be applied selectively.

Also, the `Climbing` boolean simply checks if if there's a climbContact stored and also enforces a bit of challenge in the climbing. In Katamari, climbing is only one way: up. In order to climb up, the player has to hold both sticks forward. If they waver too much, the katamari will stop ascending and plummet. For this, I just set an angle that gets converted to a maximum allowed dot product (variance between input vector and collision normal) to make sure the player is still climbing. The lower angle means a stricter check, and higher angles allow for some lateral movement while ascending.



```cs
// KatamariController.cs
private void OnValidate()
{
	maxClimbInputDotProduct = -Mathf.Cos(maxInputClimbAngle * Mathf.Deg2Rad)
}
```



![climbing](https://i.imgur.com/24rKzyh.gif)

There's a little bit of drift, but in general, I'm happy with how it's looking.

## Not picking up stuff

Not picking up stuff required addressing Katamari's "sizing" system, or whatever internal logic is used to govern if or when the player can roll up a specific prop.
At first it made the most to have this be determined by the Katamari's size...can only pick up props that the katamari is larger than. Compare its bounds or calculated mass to that of the mesh in question, and good to go.

Yet as I played Katamari, I noticed that this behavior was not consistent. You could, for instance, pick up vending machines before people in some instances, or fences before small bushes, etc etc.

This led me to the conclusion that the masses must be manually being set, allowing designers to block certain props from being picked up until certain thresholds are met. 
The challenge of Katamari is often about passing these invisible thresholds, and the fun comes from when the player succeeds and are able to roll everything up without interruption. Then they are moved into a new area to restart the process.

It's a little more cumbersome to manually specify sizes on each object, but it gives the designers more control over the experience.

Also, at times in the game, once certain size thresholds have been met, the game pauses briefly. There's some intermittent UI to show your progress.
I believe the game uses this opporunity to reevaluate the scene. Larger objects within some range are then treated as "pickup-able", where as before they may have just been rigidbodies without any of the "StickyProp" stuff.



## The Level

With some of the basics out of the way. I started designing out a level!
Most Katamari levels start somewhere small: on a table, under a car. And the player is generally restricted to a singular area. The areas with larger props aren't necessarily inaccessible, but they are often hard to get to, and because the paths are lined with bigger and bigger items, they become impossible to navigate.

With most of my props being office-centric, I figured it'd be cool to start on a desk or table, which would explain the large amounts of calculators, coffee cups, sandwiches, and the katamari could slowly progress to different areas of the office: cubicles, conference rooms, break rooms, the kitchen, maybe a lobby.

## Resources

- [CatLikeCoding Orbit Camera](https://catlikecoding.com/unity/tutorials/movement/orbit-camera/)
- [UnderGear's Klonmari](https://github.com/UnderGear/Klonamari/)
- [Unity Forums Sticky Ball](https://answers.unity.com/questions/634831/how-do-i-make-make-objects-stick-to-a-ball-and-aff.html)
- [Unity Forums](https://answers.unity.com/questions/512537/oncollisionenter-that-effects-only-the-parent-or-o.html)
- [Reddit Katamari-Like Showcase](https://www.reddit.com/r/Unity3D/comments/kv46c4/one_of_my_favorite_things_about_unity_is_the/)
- [Katamari Clone Open Source](https://github.com/thebeardphantom/KatamariClone)

### Assets

- [Pickup Sound](https://freesound.org/people/rhodesmas/sounds/380292/)
- [Collision Sound Effect](https://freesound.org/people/danlucaz/sounds/500283/)

