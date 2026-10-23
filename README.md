# VELORA

Premium responsive football prediction MVP built with Next.js App Router, TypeScript, Tailwind CSS 4 and Lucide. Entertainment only: all fixtures, odds, statistics and leaderboard opponents are mock data; credits have no monetary value.

## Run

Requires Node.js 20.9+.

```sh
npm ci
npm run dev
# http://localhost:3000
```

Production: `npm run build && npm start`.

## Features and routes

- `/`: featured fixtures, simulated live/upcoming matches, search, league/status/market filters. Query parameters: `?league=La%20Liga`, `?status=live`.
- `/match/[id]`: mock scoreboard, statistics, winner, over/under 2.5 and both-teams-to-score markets. Example: `/match/ars-che`.
- `/slip`: toggle selections, set stake, calculate combined odds and virtual return, submit predictions. One selection per match; switching a market replaces that match's existing selection.
- `/profile`: virtual balance, prediction history, pending/won/lost results and fictional leaderboard.
- `/admin`: create demo fixtures, edit score/status, finalize results and settle predictions, reset demo. Local-only, intentionally unauthenticated. Final results lock to prevent repeated payouts.
- EN/FA toggle: English LTR and Persian RTL layout with translated primary navigation/dashboard labels. Full Persian copy is not implemented.
- Loading, empty, invalid-stake, missing-route and corrupt/browser-storage recovery states.

## Data and architecture

`src/lib/data.ts` defines teams, fixtures, selections, predictions and demo state. `src/lib/predictions.ts` holds calculation, validation and settlement logic. Reusable UI lives in `src/components/`; App Router pages live in `src/app/`.

State is stored only in browser localStorage under `velora-demo-v1`: balance, matches, selected outcomes, predictions and language. Starts at 1,000 VC. No backend, authentication, API credentials, database, payments or real-money wagering. Data is browser-specific and editable by the user; not suitable for real wagering or trusted accounting. Accumulators pay only when every leg wins; any finished losing leg settles the prediction as lost. Returns include the original stake; displayed amounts round to two decimals.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
# Start the app before browser tests:
npx playwright install --with-deps chromium
npx playwright test
```

Verified: production build, lint, seven unit tests and three Chromium desktop/mobile workflows (persistence, stake validation, payout settlement, filters, admin creation, RTL and invalid storage). Production dependency audit is clean. The development-only Next ESLint toolchain currently reports upstream braces/fast-glob advisories; there is no available non-breaking fix.

## Repository and deployment

Repository: https://github.com/Tifo123lord/Site

Runs as a Next.js production server on port 3000. `ecosystem.config.cjs` is supplied for the sandbox PM2 process. Not publicly production-deployed. GitHub stores source code; this App Router project does not run directly on GitHub Pages. Use a Next-compatible host, or configure an appropriate Cloudflare adapter separately on Linux. The original repository's standalone `index.html`, if present, is legacy and is not used by Next.js.

Next steps, if needed: complete Persian translations and choose a production host. No sports API or payments are planned for this demo.

Stadium photo: [Pixnio public-domain image](https://pixnio.com/sport/football/soccer-field-spotlight-stadium-lawn-lights-night-football-goal-grass), stored locally in `public/stadium.jpg`. Team crests are original typographic demo badges, not official assets.
