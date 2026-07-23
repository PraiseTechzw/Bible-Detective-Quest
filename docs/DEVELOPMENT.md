# Development guide

This document covers the day-to-day workflow for working on Bible Detective Quest.

## Prerequisites

- Node.js 20+ (24 recommended)
- pnpm
- a PostgreSQL instance if you plan to work with the database layer

## Installation

```bash
pnpm install
```

## Running the app locally

### Mobile client

```bash
pnpm --filter @workspace/mobile run dev
```

This starts the Expo development workflow for the mobile experience.

### API server

```bash
pnpm --filter @workspace/api-server run dev
```

The API server runs the backend entry points and related middleware.

## Validation and build

Run the full workspace checks:

```bash
pnpm run typecheck
pnpm run build
```

## Code generation

If the OpenAPI contract changes, regenerate the API hooks and Zod schemas:

```bash
pnpm --filter @workspace/api-spec run codegen
```

## Database workflow

If you change the database schema, use the workspace database tooling:

```bash
pnpm --filter @workspace/db run push
```

Make sure the required environment variables are available, including `DATABASE_URL`.

## Project notes

- The mobile experience lives in [artifacts/mobile](../artifacts/mobile).
- Backend services live in [artifacts/api-server](../artifacts/api-server).
- Shared packages and generated code live under [lib](../lib).
- The database schema is managed from [db](../db).
