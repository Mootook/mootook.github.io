---
layout: work-layout
title: "Kast - Kast Player"
date: Sun Sep 20 13:20:27 PDT 2020
category: work
permalink: /work-kast-player
active: true
---
<h2 class="header main">Kast - Kast Player</h2>

<h2 class="header main">iOS</h2>

Implemented a data-driven, in-app way to browse Kast's video-on-demand selection.
All views are data driven with flexible sizings for inconsistent movie poster dimensions. 
Starts with a collection view for the services (Kast-TV, Tubi, YouTube).
Then catalog item collection views with a horizontal scrolling genre table collection view. Tapping on any movie poster brings up the details view.
Each service also allows for search.  
Video playback and controls use Apple's AVFoundation framework (youtube-ios-helper for YouTube). Implemented client-to-client messaging so play/pause state and playback timeline across viewers stayed in sync.
<div class="youtube-wrapper">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/poXUsda_qzE"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

<br>

<h2 class="header main">Desktop/Web</h2>
<div class="youtube-wrapper">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/I5MQ-IlcYRQ"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>  

Helped implement desktop/web in-app video-on-demand browsing and streaming service using React and ElectronJS. Implemented client-to-client messaging to ensure all watchers stayed in sync for video's duration.