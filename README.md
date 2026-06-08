# Dailymotion Video Browser

A small video browsing experience built with React, TypeScript, and the Dailymotion public API.

## Overview

Users can:

- Search for Dailymotion videos
- Browse paginated search results
- Open a video detail page
- Watch videos through the embedded Dailymotion player
- Like and unlike videos locally

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- React Router
- Tailwind CSS
- Vitest
- Testing Library

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test:run
```

Build for production:

```bash
npm run build
```

## Implementation Notes

### Search Experience

Search input is debounced to avoid unnecessary API calls while typing. Results are fetched in pages and exposed through a Load more action, which keeps the initial request lightweight while still allowing deeper browsing.

### Video Page

The detail page shows the embedded Dailymotion player, creator information, video metadata, description, local like state, and related videos from the same channel when available.

The app uses Dailymotion's standard public iframe embed without forcing autoplay or mute parameters. Playback behavior can still be affected by Dailymotion's player configuration and browser media policies, especially around autoplay with sound.

Some console warnings may appear from Dailymotion's embedded player internals, such as player-id monetization guidance or ad SDK preloading. Creating a managed Dailymotion Player Embed requires publisher-side configuration and is outside the scope of this public API assignment.

### Local Like State

The like / unlike feature is kept client-side and persisted in `localStorage`, matching the assignment requirement that no API call is needed.

### API Scope

The app requests only the Dailymotion fields needed by the UI, such as title, thumbnails, duration, channel, creation date, description, and owner metadata. This keeps responses focused and avoids fetching unnecessary data.

## Testing Approach

I focused tests on custom logic and user-facing interactions:

- `LikeButton`: verifies the like action calls the expected handler and exposes the correct accessible label.
- `useLikedVideo`: verifies liked videos are toggled and persisted in `localStorage`.
- `VideoCard`: verifies video information is rendered and links to the correct detail page.
- Formatting utilities: verify duration and description formatting.
- API URL helper: verifies query parameters are encoded correctly.

I intentionally avoided testing third-party behavior from React Query, React Router, and the Dailymotion iframe player.

## Future Improvements

Given more time, I would consider adding shareable search URLs, richer player integration through Dailymotion's Player SDK, and end-to-end tests for the main search-to-playback flow.