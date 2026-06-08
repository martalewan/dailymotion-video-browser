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