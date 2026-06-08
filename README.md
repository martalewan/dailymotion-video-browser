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

Videos are embedded using Dailymotion's iframe player. The player behavior is controlled by Dailymotion and browser media policies, which may result in videos starting automatically in a muted state depending on the browser and the video being played.

The application relies on Dailymotion's default embed behavior rather than introducing custom playback logic or the Dailymotion Player SDK, keeping the implementation simple and aligned with the scope of the assignment.

### Local Like State

The like / unlike feature is persisted in localStorage rather than a backend service. This keeps the implementation simple and aligns with the assignment requirement of using local state only.

### API Scope

The application only requests the fields required by the UI: title, thumbnail, duration, channel, creation date, and description. This keeps network requests lightweight and avoids fetching unnecessary data.

### Testing Strategy

The focus was placed on testing business logic and user interactions rather than implementation details or styling. Reusable logic and critical user flows were covered with automated tests, while simple presentational styling was verified manually.