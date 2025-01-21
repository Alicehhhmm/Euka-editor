# Environment

## 1.Cloud Dev Frameworks

| Framework | Description | Website                       |
| --------- | ----------- | ----------------------------- |
| Clerk     | Auth JWT    | [Clerk](https://clerk.com/)   |
| Convex    | back end    | [Convex](https://convex.dev/) |
| Vercel    | CI/CD       | [Vercel](https://vercel.com/) |

## 2. local env configuration

-   **`.env.local`** : Configure the keys required for the above cloud development locally

```sh
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# JWT: clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

# Liveblocks
LIVEBLOCKS_SECRET_KEY=
Liveblocks_PUBLISHABLE_API_KEY=
```

# Features

## 1.Shortcuts:

-   User presses Ctrl+Z to undo the last action.
-   User presses Ctrl+Shift+Z to redo the last action.

## 2.Pencil Tool:

-   User selects the pencil tool and adjusts stroke width using the sidebar.
-   User draws with varying pressure sensitivity on a tablet.

## 3.Zoom:

-   User zooms in using Ctrl++ to edit fine details.
-   User uses the scroll wheel to zoom in and out for quick adjustments.

## 4.Sidebar:

-   User selects an element and adjusts its color and opacity via the sidebar.
-   User sees real-time changes as they adjust properties.

## 5.Thumbnails:

-   User clicks on a thumbnail to view a specific state of the canvas.
-   User uses thumbnails to navigate through layers quickly.

## 6.Canvas with
