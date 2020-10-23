---
layout: post
title: Ghost of Tsushima - Level Design, Story, and Side-Quest Structure
date: Fri Jul 31 00:32:04 PDT 2020
category: notes
permalink: /notes-ghost-of-tsushima
active: true
---
<h1 class="title">Ghost of Tsushima:</h1>
<h1 class="title">Level Design, Story, and Side-Quest Structure</h1>

{% comment %}
<h2>Cinematic Visuals - [WIP]</h2>
Most aspects of GoT seem in service of its visual style (Akira Kurosawa films)
- No number on leveling up (pros and cons)
- Camera positioning
- Amazing intro that does better than any game in recent memory of setting its tone
- Mission intro screens
- Waypoints (the wind) and guiding markers (birds/foxes) seem to be a nod to the cinematic motion of Kurosawa

Favorite thing about GoT is the subtle 'leveling up', the game allows for. There's a skill tree, but the only indication of experience or player level is the white icon that fills up after missions. Progression feels organic, challenges seem aspirational and not impossible, flush with both the narrative and gameplay.

<h2>Combat - [WIP]</h2>
{% endcomment %}

<h2>Side-Quests</h2>

A great chunk of GoT is composed of episodic missions that, for the most part, are tangential to the main story but provide incentive through material rewards (crafting supplies, armor upgrades), experience to level up, and narrative arcs with supporting characters.

There are three types of side-quests:  

**Major** -- often multi-part, focusing on the development of a side character's story (Sensei Ishikawa and the hunt for his student Tomoe, for example). These are brought to the player's attention through the narrative progression of the main story. Rewards include materials, upgrade components, or key weapons/items/armor.

**Minor** -- self-contained, short missions focusing on external (to Jin) events that, if left unattended, don't seem to effect to the main gameplay arc. Often brought to the attention of the player through exploration or guided interaction with the world (broken cart on a main path, golden bird guiding you to distraught villager, villager with a speech bubble).
Rewards include materials and upgrade components.

**Mythical** -- self contained, medium length missions focusing on an ancient legend that tend to involve a piece of armor, weapon, or new attack method (strong incentive for player. Aligns narrative goal of quest with tangible reward. Introduced much like minor quests but only through village musician/story-tellers. Rewards include armor, weapons, additions to skill tree.

<h3 class="header">Minor Side-Quests and Small Arena Level Design</h3>

![title-card](./images/ghost-of-tsushima/cost-of-iron/title.png){: .post-image}

"The Cost of Iron", a quest which can be completed in the first act showcases a lot of the qualities of a "minor side-quest". It's short with a self-contained narrative, it offers a few low-impact rewards, and its completion is entirely optional (and is presented as such).  

You start off at the initial way-point, a hut sheltering a group of merchants who unveil the story of an iron mark possessed by another local merchant. The mark, they say, enables its carrier to travel safely among Mongols. Your goal is to find this local merchant and the iron mark he possesses.

![tracks](./images/ghost-of-tsushima/cost-of-iron/tracks.png){: .post-image}

A brief "tracking" style progression ensues which leads the player to investigate the scene that the merchants spoke of, fight some Mongols, return to the merchants to find them dead/dying, track the killers, kill them, and finally rescue the merchant.

This progression--investigate, track, kill--is a pretty typical minor side quest in both narrative and gameplay progression.  

* The narrative is simple and only needs the context of the game's central plot point (Mongols have invaded Tsushima and are wrecking havoc across the land) to be explained.
* The story has a singular motive and doesn't appear to have implications beyond itself (The iron mark does not change gameplay, the rescued merchant is not seen again).
    * The player can choose to ignore this mission and there isn't a lingering sense of guilt or unfinished business because the plight and reward for completion are almost trivial compared to the stake's of the main mission or major side-quests.  
* No promise of a reward is made by the NPC who initiates the quest. So the main motivation for completion are the few rewards promised by the mission info (usually supplies or some material needed for upgrades) in the start menu or just player experience (legend growth, in terms of the game's largely abstracted leveling mechanic).  

The progression of gameplay is generally pretty formulaic in minor side-quests and, with some slight variations, can be illustrated as such:  

![flowchart](./images/ghost-of-tsushima/cost-of-iron/flowchart.svg){: .post-image}  

This, as a general template, makes up a majority of minor side-quests structures. Variations are not necessarily in the directional flow but, at times, in the order (after the initial way-point) and in the repetition of certain gameplay blocks. Some will have more than one tracking segment; some will have multiple fights; sometimes the fight interrupts another segment; sometimes there is no fight at all.  
But all of them are self-contained. They start and end within one mission.  

This is a common side-quest formula, used widely with some variations across games with similar high-level design systems (The Witcher 3, Horizon Zero Dawn, Spiderman...etc, etc.).  

GoT does a good job of letting the player know that minor side-quests are optional. Many games that implement a similar structure can be consumed by what eventually becomes a task list of independent and irrelevant missions. Assassin' Creed Odyssey, for example, comes to mind as a game where the minor side-quests eclipse everything, and progressing in that game is a matter of sieving through every call to action, no matter its relative importance.  

GoT, I think, works largely because of its abstracted leveling system. Without the promise of a numeric exp advantage (though there is the reward of slight/moderate legend growth, which is the same thing), I never found myself grinding out these side-quests in order to level up. I played through them because they were there and because I didn't feel like committing myself to a main quest or major side-quest. Minor side-quests were also nice to have in reserve in case I wanted to try out a new weapon or skill-tree enhancement. 

<h2>Level Design and "Arenas"</h2>

![entry](./images/ghost-of-tsushima/cost-of-iron/entry.png){: .post-image}

I'm sure the developers have a specific term for the stealth/combat-centric spaces throughout Tsushima, but I'll be using the term "arena."  

An arena is a contained area with enemies, obstacles, and a central objective (contained meaning bordered by mountains or fortress walls). Arenas generally have the space for straightforward combat or the layout and enemy positioning for a stealth approach (tall grass, houses, and other places to hide). Arenas generally have small rewards and ammo refills peppered throughout (arrows, kunai, supplies, etc.).  

Camps, forts, captive villages are all "arenas" of different scales, and they can generally be conquered in a variety of ways. Larger spaces, which are the focus of key missions are often a composition of multiple arenas. Castle Kaneda (in the mission ending Act I), for instance, is composed of a few medium-sized arenas, conquered linearly but with variations at the individual arena level.  

Continuing with the "Cost of Iron" sidequest, towards the end of the mission, the trail empties into a small space flanked by mountains and woods. The place where the trail empties Jin, is one one of the smallest types of arenas (excluding patrol squads that Jin finds while traversing Tsushima).


![overview](./images/ghost-of-tsushima/cost-of-iron/overview.png){: .post-image}

This simplified and definitely not poorly drawn layout of the The Cost of Iron's ending arena demonstrates some key aspects of arena level design. Oftentimes in GoT, it is the enemy placement and level design that influences the gameplay choices/strategies made by the player. Certain missions will sway to the extremes of either side of the spectrum to strong-arm the player into a specific style of approach.  

#### The Cost of Iron Arena
![layout](./images/ghost-of-tsushima/cost-of-iron/drawn-layout.png){: .post-image}  

The game empties Jin at the bottom of this arena. When Jin enters an arena, he is--in most cases--placed safely on the perimeter, either with an altitude advantage or in a safe area such as a field of tall grass. In general, safe, easily-traversable areas surround arenas. This means that players can plan a means of attack without fully committing to one approach from the start.  

"Standoff" prompts are at every key entrance to an arena. I'm not sure if these are locational triggers or if their appearance is determined by an enemy's detection radius. Nonetheless, emptying a player into an arena with a standoff entry-point gradates the player into the combat/stealth gameplay block. Along with some accompanied dialogue from Jin and visual triggers like fire smoke, the standoff prompt creates a clear indication that the player has entered into an arena. The focus is now combat.  

Next to these entrypoints, there are usually a good number of safe spaces for the player to explore or survey the area. Outlying enemies are placed next to these safe areas, and they are generally alone so that they can be dispatched with little risk in a number of ways as the player moves closer towards the objective point and farther from safe areas. 

A larger number of enemies guard the central objective and they often have patrol patterns--though they can usually be observed from any of the safe points within an arena. Most arenas will have at least one grouping of enemies where the enemy placement forces choice onto the player. In the case of The Cost of Iron, two enemies sit facing each other, making a stealth approach inviable (unless the player's unlocked the chain assassinate skill). Ranged weapons solve this problem, but it'll throw the arena into a state of panic which will upset, if only briefly, any existing patrol patterns.

One of my main complaints about arenas is that these patrol patterns generally seem a little too convenient. Patrols tend to not cover each other. Isolated enemies are often looking at a wall or into a corner, which is so trivial that one can question why they even exist. Some patience is required but once this general system is understood, whole camps can be destroyed in stealth with little risk of detection. Some of this, of course, stems from the simplicity of the AI (a whole writeup on its own), but I think more dynamic patrol patterns could've helped a lot with making stealth more interesting and fulfilling.  

Creating slightly more dynamic patrol patterns could've led into more complex situations and forced harder choices onto the player. For example (and this is simple, and probably has flaws of its own), how about patrol patterns where stalking for a kill leads a player deeper into the camp, which then limits the plan of attack as the player is now in the center of an arena, rather than perched on the perimeter with all the advantage. Perhaps even making the central objective's location less obvious could create a sense of unease and would necessitate exploration.  

GoT isn't totally deprived of interesting stealth segments. In one of Yuna's sidequest missions "Silent Death", Jin has to sneak into a camp and kill three slavers, but their exact location within the camp is not shown, which means the player has to fully wander and explore the camp. And though this mission is largely simplified by the two guiding parameters of "Don't kill the guards" and "Don't be seen", it does represent another facet of how stealth __could've__ operated in GoT. Simply hiding the objective location added a layer of strategy and tension not present in the general stealth system. And for me, stealth in most games is largely about these two concepts--strategy (creating elaborate death traps and planning a path of assassination) and tension (detection and risk at executing any action).


<h2>Narrative Structure</h2>

GoT's has a 3-act structure, and it makes this narrative division and progression known to the player. While the game may wind and tangent across multiple side-stories, the linear progression of Jin's story is a constant guiding force on the game.

<h3 class="header">Act 1 - Starting from Scratch</h3>

![act-one](./images/ghost-of-tsushima/act-one.png){: .post-image}  

GoT starts at the battle of Komoda beach, the entry point for the mongol invasion. Jin fights alongside other samurai in defense of the coasts, but they fail, and in the fallout Jin is rescued by Yuna (a local thief).  

The intro alone does an incredible job at setting the tone for the game. The main piece of exposition needed to set the game in motion is the mongol invasion, and allowing the player to participate in that chunk of story provides clear motivation. Visuals alone provide scale. The writing is strong and delivered well by the voice actors (I played with the Japanese voices and English subtitles).  

From here, the first act opens up the game and the player is free to explore or dive into major side-quests. This act (which is where a bulk of my playtime was spent) sets up most of the major side characters. The major side characters are essential to the main story. They feel developed and of the world, yet exploring their stories is rarely obstructive to the player.  

The intro also sets up the main internal dichotomy for Jin (honor vs. survival). At first, Jin is hesitant to use any form of assassination to dispatch his enemies, claiming it goes against the samurai code of honor. But the first act does the bulk of work in greying this area for Jin as multiple missions are completed only through the use of stealth. This struggle is constantly harkened back to as Jin's reputation grows--mainly through flashbacks. At first this felt forced, like a thin layer to add some ethical matter onto gameplay, but the indirect narrative feedback, I believe, was intentional, since this mainly sets the groundwork for much stronger story beats in later acts.  

<h3 class="header">Act 2 - A United Force</h3>

![act-two](./images/ghost-of-tsushima/act-two.png){: .post-image}

The second act opens up more of the map and the sidequest availability. At this point I felt pretty comfortable in the game's systems and mechanics (Ryuzo was a good gatekeeper for making sure of this) that exploring the island became more enjoyable. I could dismantle entire Mongol camps I came across with an ever-growing arsenal of tools and a stronger command of the skill tree. Exploration took up more time, as I was no longer worried about running into Mongol patrols or straw hat warriors.

As for the narrative, the second act builds up a lot of the tension started by the first. Missions are less about Jin finding his footing and more about dismantling Mongol strongholds, so in that regard, it's neat that the narrative build-up aligns with the need to present the player with greater challenges. On the flip side however, this heightened tension made all minor side-quests seem pointless, and starting from the second act, I rarely took the time to interact with villager speech bubbles or distressed travels as I explored.  

The second act also deepens Jin's dichotomy between his samurai code of ethics and his rising popularity as the "Ghost," as word of his brutal tactics spread across the island. This is largely possible because of Lord Shimura's entrance into the main story. His sheer presence is a much stronger marker of where Jin started than the first act's occasional flashbacks or Jin's internal monologues.  


A great deal of this act is also devoted to aligning the abstracted level mechanic (Legend growth) with contextual, in-world feedback. In regards to the central story, this creates the wedge between Lord Shimura and Jin. Yet other NPCs begin reacting differently to Jin's presence as the story progresses. NPCs often revel in Jin's presence, asking him to confirm if he actually is the ghost. This simple system contributes substantially to Jin's main story arc and deepens the sense of growth for the player. Even though only key missions directly progress the central story, progressing as a player seems to directly and positively impact the world and its people.  

This legend growth culminates towards the end of Act II with the Seige of Yarikawa, a power-trip of a battle that brings together all the different gameplay aspects of combat and stealth, combines it with the narrative feedback of other warriors being inspired by the player's success in the battle, and is finalized with a brutal addition to the skill-tree. It's a pretty powerful mission that got me pretty committed to the central plot and to seeing Jin succeed as the Ghost.  

<h3 class="header">Act 3 - Leading as The Ghost</h3>

![act-three](./images/ghost-of-tsushima/act-three.png){: .post-image}

Act 3 represents a low point for Jin, a feeling that all is lost. His Uncle and by extension the forces fighting the Mongol invasion have turned against Jin. Yet most of the allies Jin has amassed thus far stay by his side as he flees north.  

The final act is largely about tieing up things, providing resolutions to the numerous narratives presented and explored up to this point. All of the major side characters now have their final missions available for completion.  

Unlike previous chapters in the story, this one does not waste a lot of time or attempt to distract your attention. Tensions are high and the path forward is clear. Aside from the major side quests, I did not have much motivation to explore this final portion of the map or waste time with minor side quests. Part of this is because for a while, much the map is limited while Jin is an outlaw, but also the game does a good job here of narrowing your attention. By now, most of the impetus in the game has come from the characters -- Sensei Ishikawa, Yuna, Lasy Masako -- as well as Jin's struggle with his Samurai upbringing and his Uncle.  

Initially the dichotomy presented to the player, Jin's hesitation in adopting dishonorable tactics, was plastered onto small interludes in gameplay, but the third act presents this struggle as the central point of contention for the game. And by extension, this struggle becomes the main conflict of the stroy. The game's central movement is the Mongol invasion and the growing fight to resist, but the perpetual undercurrent for the narrative is this struggle between Jin and his Uncle.  

It explains why, in the end, the fight with the Khan feels unsatisfying and the story unresolved. The final duel with Uncle Shimura and then allowing the player to choose to kill or spare him is the proper and deserved finale. It demonstrates that the game was always trying to present a story about principles and family. These themes are explored even further in all of the major side-quests.  

It takes all three acts for this core narrative impact to build, and personally, I found it effective, like it had snuck up on me. The game presented itself as a rather shallow revenge story in a time of war. It had some internal struggles introduced without much elegance, but oddly enough, I think it was necessary: to place those ideas in the back of the players mind so that they could be fully unpacked in numerous ways across dozens of missions. 

{% comment %}
[SCRATCHPAD]
One of the interesting dichotomies of the game is Jin's adherence to his samurai code coming up against the pragmatic course of stealth needed to dispatch larger groups.
The game has Jin struggle with this relationship, but as a player, I didn't really care. The story and weight of this 'code' was conveyed, but the game really only had the fight with the mongol leader in the beginning to demonstrate the cons of honorable fighting in the beginning, and that scripted loss felt rather telegraphed.

Sections:
  - Narrative exposition
    - Introduction of "Ghost" mechanics are usually followed by flashback where Jin's upbringing contrasts new skill
{% endcomment %}
#### Resources
- [Akira Kurosawa - Composing Movement, Every Frame a Painting](https://www.youtube.com/watch?v=doaQC-S8de8)
- [Ghost of Tsushima, Kurosawa, and the political myth of the samurai, Polygon](https://www.polygon.com/2020/7/23/21333631/ghost-of-tsushima-kurosawa-films-samurai-japan-abe-politics)
- [Ghosts of Tsushima Isn't Samurai Cinema—It's a Popcorn Flick, Wired](https://www.wired.com/story/ghosts-of-tsushima-essay/)