# Contributing

Thank you for helping improve Bible Detective Quest.

## Before you start

1. Review the project documentation in [README.md](README.md) and [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).
2. Check whether there is already an issue or discussion related to your idea.
3. Keep changes focused and aligned with the existing game experience.

## Development workflow

- Create a feature branch from the latest main branch.
- Keep commits small and descriptive.
- Run typechecking before opening a pull request:

```bash
pnpm run typecheck
```

## Pull request checklist

- Describe the problem and solution clearly.
- Include screenshots or screen recordings when the UI changes.
- Ensure the change does not introduce new type errors.
- Update documentation when behavior or workflows change.

## Coding guidelines

- Prefer clear, readable TypeScript and React components.
- Keep gameplay logic understandable and easy to maintain.
- Preserve the tone and structure of the existing app experience.
- Avoid introducing unnecessary dependencies.

## Reporting issues

Please open an issue with:

- a concise problem statement
- reproduction steps when relevant
- expected vs actual behavior
- environment details such as OS, device, or browser
