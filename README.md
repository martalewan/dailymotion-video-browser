# Dailymotion Video Browser

A video browsing application built with React and TypeScript using the Dailymotion API.

## Overview

This project allows users to:

- Search for videos
- Browse search results
- View detailed video information
- Watch videos using the embedded Dailymotion player
- Like and unlike videos locally

## Tech Stack

- React
- TypeScript
- Vite

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Testing approach

I focused tests on the parts of the application that contain user interaction or custom logic:

- LikeButton: verifies the like action calls the expected handler.
- useLikedVideo: verifies liked videos are toggled and persisted in localStorage.
- VideoCard: verifies video information is rendered and links to the correct detail page.

I intentionally did not test React Query, React Router internals, or the Dailymotion iframe player, as those are third-party concerns.

## Tradeoffs

### Video Playback

Update
Fix player starts muted




dmp.includes.2f092f314a1c1adbb8b2.js:1 A player on this page has been initialized without a player id. This can negatively impact monetization. Please implement your player according to our Player Embeds guidelines: https://faq.dailymotion.com/hc/en-us/articles/4411096679954-Integrate-your-Player-Embed
forEach.window.console.<computed> @ dmp.includes.2f092f314a1c1adbb8b2.js:1Understand this warning
dmp.photon_player.9d0af5a82c1286db2081.js:1 [Violation] Permissions policy violation: picture-in-picture is not allowed in this document.
(anonymous) @ dmp.photon_player.9d0af5a82c1286db2081.js:1Understand this error
player.html?video=xxkb7:1 The resource https://imasdk.googleapis.com/js/sdkloader/ima3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.Understand this warning
dmp.photon_player.9d0af5a82c1286db2081.js:1 [Violation] Permissions policy violation: picture-in-picture is not allowed in this document.
(anonymous) @ dmp.photon_player.9d0af5a82c1286db2081.js:1Understand this error
player.html?video=xxkb7:1 The resource https://imasdk.googleapis.com/js/sdkloader/ima3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.Understand this warning
player.html?video=xxkb7:1 The resource https://imasdk.googleapis.com/js/sdkloader/ima3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.

i didnt had mute or others what are you talking about

Show more
6:08 PM


Worked for 3s
You’re right to push back. These console messages are not saying you still have mute in your code. They are different Dailymotion/player/browser warnings.

What each one means:

1. “initialized without a player id”

This comes from using the basic iframe URL:

https://www.dailymotion.com/embed/video/${video.id}
Dailymotion prefers a newer “Player Embed” setup with a player id, especially for monetization and publisher configuration. For your assignment, the public API task does not require you to create/use a Dailymotion Studio player id, and you probably do not have one.

So this is not a bug in your React app. It means:

You are using the simple iframe embed.
Dailymotion recommends their managed player embed for production/monetization.
Their docs say iframe is the classic/basic integration, while Embed Script or Library Script is recommended for fuller player features. Source: Dailymotion Player Embed docs.

2. “picture-in-picture is not allowed”

This is because your iframe allows PiP here:

allow="fullscreen; picture-in-picture; web-share"
But the browser/Dailymotion iframe policy does not allow it in this context.

Simplest fix: remove picture-in-picture from allow.

Use:

<iframe
  src={`https://www.dailymotion.com/embed/video/${video.id}`}
  title={video.title}
  className="aspect-video w-full"
  allow="fullscreen; web-share"
  allowFullScreen
/>
This should remove that warning.

3. “ima3.js was preloaded but not used”

That is from Dailymotion’s internal ad/player scripts:

https://imasdk.googleapis.com/js/sdkloader/ima3.js
You cannot fix that in your React code. It is inside the embedded Dailymotion player.

What I’d Do

For your assignment, I would use this:

<iframe
  src={`https://www.dailymotion.com/embed/video/${video.id}`}
  title={video.title}
  className="aspect-video w-full"
  allow="fullscreen; web-share"
  allowFullScreen
/>
And in README, keep it simple:

The video page uses Dailymotion's standard iframe embed because the assignment only requires public API usage and video playback. Some console warnings originate from Dailymotion's embedded player internals, such as monetization/player-id guidance or ad SDK preloading, and are outside the React application code.
So no, you weren’t wrong. The console warnings are mostly third-party embed behavior, not your mute/autoplay params.





6:08 PM
VideoPage.tsx:124 Allow attribute will take precedence over 'allowfullscreen'.

dmp.includes.2f092f3….js:1 A player on this page has been initialized without a player id. This can negatively impact monetization. Please implement your player according to our Player Embeds guidelines: https://faq.dailymotion.com/hc/en-us/articles/4411096679954-Integrate-your-Player-Embed
﻿
6:09 PM

These two are okay, and they’re different levels of importance.

1. Allow attribute will take precedence over 'allowfullscreen'

This is just because you have both:

allow="fullscreen; web-share"
allowFullScreen
Modern browsers prefer the allow permissions policy. To remove the warning, keep only allow.

Use:

<iframe
  src={`https://www.dailymotion.com/embed/video/${video.id}`}
  title={video.title}
  className="aspect-video w-full"
  allow="fullscreen; web-share"
/>
Or, if you want the old compatibility attribute too, leave it. It is not a real app problem. But for a clean console, remove allowFullScreen.

2. “initialized without a player id”

This is from Dailymotion, not your React code. It means your iframe is using the simple public embed:

https://www.dailymotion.com/embed/video/${video.id}
Dailymotion recommends a managed Player Embed with a player id for monetization/configuration. For this assignment, you likely do not need to fix it because the task says:

Using the Dailymotion public API, build a small video browsing experience
It does not ask you to create/configure a Dailymotion Studio player.

So the final iframe I’d use is:

<iframe
  src={`https://www.dailymotion.com/embed/video/${video.id}`}
  title={video.title}
  className="aspect-video w-full"
  allow="fullscreen; web-share"
/>
And in README:

The app uses Dailymotion's standard public iframe embed. Dailymotion may log a player-id monetization warning for unmanaged embeds, but creating a managed Player Embed is outside the scope of this public API assignment.




6:09 PM
dmp.includes.2f092f314a1c1adbb8b2.js:1 A player on this page has been initialized without a player id. This can negatively impact monetization. Please implement your player according to our Player Embeds guidelines: https://faq.dailymotion.com/hc/en-us/articles/4411096679954-Integrate-your-Player-Embed
forEach.window.console.<computed> @ dmp.includes.2f092f314a1c1adbb8b2.js:1
(anonymous) @ dmp.includes.2f092f314a1c1adbb8b2.js:1
(anonymous) @ dmp.includes.2f092f314a1c1adbb8b2.js:1
(anonymous) @ dmp.includes.2f092f314a1c1adbb8b2.js:1Understand this warning
player.html?video=xxkb7:1 The resource https://imasdk.googleapis.com/js/sdkloader/ima3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.Understand this warning
player.html?video=xxkb7:1 The resource https://imasdk.googleapis.com/js/sdkloader/ima3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.
6:10 PM

These remaining warnings are not caused by your app code.

They come from inside the Dailymotion iframe.

Warning 1: no player id

A player on this page has been initialized without a player id.
Meaning: you are using the generic public iframe embed:

https://www.dailymotion.com/embed/video/${video.id}
Dailymotion prefers managed player embeds with a player id for monetization/configuration. But for your test, you were asked to use the public API, no API key. You do not need a Dailymotion Studio player id.

So: safe to ignore, or mention as a tradeoff in README.

Warning 2: ima3.js preloaded but not used

https://imasdk.googleapis.com/js/sdkloader/ima3.js was preloaded but not used
That is Dailymotion’s internal ad SDK behavior. Your React app is not preloading that script. The iframe is.

So: you cannot fix this from your React app.

Your final iframe can stay simple:

<iframe
  src={`https://www.dailymotion.com/embed/video/${video.id}`}
  title={video.title}
  className="aspect-video w-full"
  allow="fullscreen; web-share"
/>
README wording:

The app uses Dailymotion's standard public iframe embed. Some console warnings may appear from Dailymotion's embedded player internals, such as player-id monetization guidance or ad SDK preloading. These are outside the React application code and do not affect the requested browsing/playback functionality.




6:10 PM

Videos are embedded using Dailymotion's iframe player. The player behavior is controlled by Dailymotion and browser media policies, which may result in videos starting automatically in a muted state depending on the browser and the video being played.

The application relies on Dailymotion's default embed behavior rather than introducing custom playback logic or the Dailymotion Player SDK, keeping the implementation simple and aligned with the scope of the assignment.

The app uses Dailymotion's standard public iframe embed. Dailymotion may log a player-id monetization warning for unmanaged embeds, but creating a managed Player Embed is outside the scope of this public API assignment. how to update it
6:12 PM


I’d replace those three paragraphs with one cleaner section. Less defensive, more senior:

### Video Playback

The video page uses Dailymotion's standard public iframe embed. I avoided forcing autoplay or mute parameters because playback behavior can be affected by Dailymotion's player configuration and browser media policies, especially around autoplay with sound.

Some console warnings may appear from Dailymotion's embedded player internals, such as player-id monetization guidance or ad SDK preloading. Creating a managed Dailymotion Player Embed requires publisher-side configuration and is outside the scope of this public API assignment.

### Local Like State

The like / unlike feature is persisted in localStorage rather than a backend service. This keeps the implementation simple and aligns with the assignment requirement of using local state only.

### API Scope

The application only requests the fields required by the UI: title, thumbnail, duration, channel, creation date, and description. This keeps network requests lightweight and avoids fetching unnecessary data.

### Testing Strategy

The focus was placed on testing business logic and user interactions rather than implementation details or styling. Reusable logic and critical user flows were covered with automated tests, while simple presentational styling was verified manually.


## Notable decisions

- Search is debounced to avoid unnecessary API calls while typing.
- Video playback uses the standard Dailymotion iframe without forced autoplay/mute parameters because browser policies can override autoplay with sound.
- Likes are persisted in localStorage to keep the feature client-only as requested.
- Related videos and creator metadata were added to make the detail page feel closer to a real browsing experience.