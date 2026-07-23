# Architecture overview

Bible Detective Quest uses a modular monorepo structure so the game client, API layer, shared packages, and database tooling can evolve independently.

## High-level structure

- Mobile app: the Expo Router experience that renders the onboarding flow, gameplay screens, leaderboards, and progression UI.
- API server: the Express server that hosts backend routes and shared services.
- Shared libraries: generated API hooks, Zod validation types, and reusable client utilities.
- Database layer: Drizzle-based schema and migration tooling for persisted state.

## Runtime flow

```text
Mobile client
  -> API routes / shared services
  -> database persistence (when enabled)
  -> generated client and schema contracts
```

## Key responsibilities

### Mobile app

Responsible for:

- rendering the game experience
- managing case selection and gameplay state
- tracking progression, ranks, badges, and streaks
- presenting daily and timed challenge modes

### API server

Responsible for:

- handling HTTP requests for app services
- applying middleware and logging
- coordinating with shared validation and persistence layers

### Shared packages

Responsible for:

- keeping API contracts consistent through OpenAPI-driven generation
- providing Zod schemas used across the stack
- reducing duplication between client and server logic

## Design notes

- The app is intentionally structured around a mobile-first experience rather than a full browser app.
- The case content and game rules are treated as first-class content that can evolve independently from the UI shell.
- Shared contracts are preferred over ad hoc API payload definitions to keep the client and server aligned.
