# Repository Guidelines

## Project Structure & Module Organization
- `app/` houses the TanStack Start GUI. Source lives in `src/` (`components/`, `routes/`, `integrations/`, `utils/`), shared assets in `public/`, and platform config in `vite.config.ts` + `wrangler.jsonc`.
- `resume/` is the single source of truth: `base/` for roles, `jd/` for job descriptions, and `generated/<jd>/` for LLM artifacts (`v1.tex`, `v1.pdf`, `ats_llm.json`).
- `analysis/` exposes the deterministic ATS engine consumed by CLI + GUI; keep modules pure TypeScript so they run locally and on Cloudflare. Automation scripts live in `scripts/`, while high-level specs stay in `docs/`.

## Build, Test, and Development Commands
- Install dependencies with `bun install` inside `app/` to stay aligned with `bun.lockb`.
- `bun dev` starts Vite on port 3000. `bun run build` emits `app/dist` for Worker deployment, and `bun run serve` previews the production bundle.
- `bun run test` executes Vitest (use `--watch` for focused loops). `bun run deploy` publishes the Worker through Cloudflare Wrangler.

## Coding Style & Naming Conventions
- TypeScript + React functional components. Two-space indentation, single quotes, and trailing commas align with Biome defaults, which also auto-sort imports.
- Run `bun run format` and `bun run lint` before commits so Biome enforces style and catches unused symbols.
- Use PascalCase for React components (`Header.tsx`), kebab-case for hooks/utilities (`use-ats-score.ts`), and mirror URL segments when creating files under `app/src/routes/`.

## Testing Guidelines
- Vitest with Testing Library powers UI tests; wrap components with TanStack Query providers when needed.
- Name specs `*.test.ts|tsx` and colocate them next to the implementation. Critical targets: ATS parsing in `analysis/` and resume preview flows in `app/src/routes/`.
- Run `bun run test -- --coverage` before review and keep statement coverage near 80%; add regression tests for bugfixes touching the analysis engine.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat(app): improve ATS summary`) so changelog tooling stays consistent. Keep subjects imperative and under 72 chars.
- PRs should describe scope, list verification commands (`bun run test`, `bun run lint`), and attach screenshots or GIFs for UI changes. Link related resume/JD issues.
- Keep diffs focused; large refactors need a short note in `docs/decisions.md` for traceability.

## Security & Configuration Notes
- The system is local-first: avoid adding external HTTP calls or telemetry inside `app/src` or Worker handlers without sign-off.
- Store sensitive values in `.dev.vars` for Wrangler instead of tracked files; note required env keys in `docs/config.md` for reproducibility.
