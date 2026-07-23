# Bible Detective Quest

Bible Detective Quest is a mobile-first Bible investigation game that turns Scripture into interactive cases, ranked progression, and daily mystery challenges.

## What this project does

Players explore biblical events through detective-style casework, answer evidence-based questions, earn badges and ranks, and unlock new game modes such as Story Mode, Daily Mystery, Time Attack, and Survival Mode.

The app is built as a monorepo with:

- an Expo Router mobile client for the gameplay experience
- an Express-based API server for backend services and shared logic
- generated API clients and Zod schemas from an OpenAPI contract
- a Drizzle-based database layer for persistence and progression

## Key features

- Onboarding flow that captures the player name and introduces the game loop
- Case-based investigation experience grounded in biblical references
- Daily Mystery and timed gameplay modes
- Leaderboard and progression tracking with ranks and badges
- Story Mode that unlocks after the full case set is completed

## Quick start

### Prerequisites

- Node.js 20+ (24 recommended)
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run the mobile app

```bash
pnpm --filter @workspace/mobile run dev
```

### Run the API server

```bash
pnpm --filter @workspace/api-server run dev
```

### Typecheck and build

```bash
pnpm run typecheck
pnpm run build
```

## Project structure

- [artifacts/mobile](artifacts/mobile) — Expo Router app, screens, components, game data, and assets
- [artifacts/api-server](artifacts/api-server) — Express API server entry points and middleware
- [lib](lib) — shared client, schema, and generated package code
- [db](db) — Drizzle ORM schema and database tooling
- [scripts](scripts) — repository helper scripts

## Documentation

- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — local development and workflow guidance
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — application architecture and package responsibilities

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
