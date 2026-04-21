# ephemeral — website

React SPA for the ephemeral platform. Built with Vite + TypeScript + Tailwind CSS.

## Tech stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Server state management and caching |
| Axios | HTTP client |
| React Hook Form | Form state and validation |
| Tailwind CSS | Utility-first styling |
| Sonner | Toast notifications |
| Lucide React | Icon library |
| Vite | Dev server and bundler |
| TypeScript | Type safety |

## Getting started

```bash
npm install
npm run dev      # starts dev server at http://localhost:5173
npm run build    # type-check + production build
npm run preview  # preview the production build locally
```

The dev server proxies `/api/*` requests to `http://localhost:8080` (the Go backend). You can change this target in `vite.config.ts`.

## Project structure

```
src/
├── api/
│   └── client.ts           # Axios instance with JWT injection and 401 handling
├── components/
│   ├── ProtectedRoute.tsx  # Route guard — redirects to /login if unauthenticated
│   └── ui/
│       └── Button.tsx      # Reusable button (variant + size + loading state)
├── context/
│   └── AuthContext.tsx     # Global auth state, localStorage persistence, useAuth hook
├── pages/
│   ├── Landing.tsx         # Public landing page
│   ├── Project.tsx         # Project info page (placeholder)
│   └── auth/
│       ├── Join.tsx        # Registration — submits to POST /api/auth/register
│       └── Login.tsx       # Login — submits to POST /api/auth/login
├── types/
│   └── index.ts            # Shared TypeScript types (User, Post, AuthResponse, …)
├── App.tsx                 # Route definitions
├── main.tsx                # React entry point — QueryClient + AuthProvider setup
└── index.css               # Tailwind imports + global animation keyframes
```

## Routing

| Path | Component | Auth required |
|---|---|---|
| `/` | `Landing` | No |
| `/project` | `Project` | No |
| `/join` | `Join` | No |
| `/login` | `Login` | No |

Any unmatched path redirects to `/`. Protected routes (feed, profile, admin) are added by wrapping them in `<ProtectedRoute>`.

## Authentication

Auth state lives in `AuthContext`. On login the JWT and user object are stored in `localStorage` under the keys `ephemeral_token` and `ephemeral_user`. The Axios client reads the token on every request and injects it as a `Bearer` header. A 401 response clears storage and redirects to `/login`.

Consume auth state anywhere with the `useAuth` hook:

```tsx
const { user, isAuthenticated, login, logout } = useAuth()
```

## Adding a new page

1. Create `src/pages/MyPage.tsx`.
2. Add a `<Route>` in `App.tsx`. Wrap in `<ProtectedRoute>` if it requires a logged-in user.
3. If the page fetches data, use `useQuery` / `useMutation` from TanStack Query and add an API function in `src/api/`.

## Adding a new API module

Create a file in `src/api/` that uses the shared `apiClient` instance:

```ts
import { apiClient } from './client'
import type { Post } from '../types'

export const getPosts = (cursor?: string) =>
  apiClient.get<{ items: Post[]; nextCursor?: string }>('/feed', { params: { cursor } })
```

Then use it inside a `useQuery` or `useMutation` call in the relevant page.

## Styling conventions

- **Tailwind** for layout, spacing, and common utilities.
- **Inline styles** for theme-driven values (colors, fonts) that need to respond to a runtime theme — avoids the need to generate dynamic class names.
- Global animation keyframes (`fade-up`, `fade-in`, `clip-up`) are defined in `index.css` and applied via the `animation` CSS property.
- Fonts are loaded from Google Fonts in `index.html`: **Cormorant Garamond** (display / hero), **Syne** (bold display), **DM Sans** (UI / body).

## Environment

No `.env` file is required to run the frontend. The only external dependency during development is the Go backend running on port `8080`. If the backend is not running, API calls will fail but the UI will still load.
