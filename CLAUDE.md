# RepByRep — Root Context

> This file is loaded automatically by Claude Code every session.
> Keep it short — detailed context lives in `.claude/context/`.
> Update this file only when stack, hard rules, or project structure changes.

---

## Context files — read ALL before starting any work

| File | Purpose | Write rule |
|---|---|---|
| `.claude/context/current-task.md` | Forward-looking — what to do this session | Overwrite each session |
| `.claude/context/handoff.md` | Backward-looking — what was done last session, warnings | Overwrite each session |
| `.claude/context/decisions.md` | Append-only log of non-obvious trade-offs | Append only — never overwrite |

**End-of-session rule (any agent, any code change):**
- Overwrite `current-task.md` — remove done items, update next task
- Overwrite `handoff.md` — date, changes table, decisions + WHY, warnings
- Append to `decisions.md` — only if a non-obvious trade-off was made this session

---

## Project overview

RepByRep — "Every rep counts. Every day matters." A workout tracking and consistency
platform: pick a workout day, log sets/reps/weight per exercise, view an anatomical
muscle-target visualization, and chat with an AI coach (Gemini) for guidance.
Originally scaffolded via Google AI Studio.

## Stack

- **Frontend:** React 19 + TypeScript, Vite 6, Tailwind CSS 4 (`@tailwindcss/vite`), `lucide-react` icons, `motion` for animation
- **Backend:** Express 4 (`server.ts`) — thin server, mainly proxies AI calls and serves the Vite app / static build
- **AI:** `@google/genai` (Gemini) — model `gemini-3.5-flash`, called from `/api/workout-ai`
- **Build/run:** `npm run dev` (tsx server.ts, Vite middleware mode), `npm run build` (vite build + esbuild bundles server to `dist/server.cjs`), `npm start` (production, serves `dist/`)
- **Lint/typecheck:** `npm run lint` → `tsc --noEmit` (no test suite configured)

## Solution structure

```
server.ts                  Express entry point — /api/workout-ai, /api/health, Vite middleware wiring
src/
  main.tsx                 React entry
  App.tsx                  Top-level app state/layout (~500 lines)
  index.css                Tailwind entry
  types.ts                 WorkoutSet / Exercise / WorkoutDay / UserWorkoutHistory
  data/workouts.ts          Static workout day/exercise data (~490 lines)
  components/
    WorkoutDayCard.tsx      Workout day selector/card
    AnatomicalMannequin.tsx SVG muscle-target visualization
    ExerciseIllustration.tsx Per-exercise illustrations (large, ~1300 lines)
    AICoach.tsx             Chat UI calling /api/workout-ai
```

## Hard rules — never violate these

- Do not modify the HMR/watch config in `vite.config.ts` — file watching is
  intentionally disabled when `DISABLE_HMR=true` to prevent flicker during agent edits.
- `GEMINI_API_KEY` must stay server-side only (read in `server.ts` via `dotenv`) —
  never expose it to client bundle code.
- Server always binds `0.0.0.0:3000` and must degrade gracefully (offline-mode
  canned response) when `GEMINI_API_KEY` is missing — don't make the API key required
  for the app to boot.

## Auth & role access

None — no authentication system in this project.

## Known deferred items — do not fix without a dedicated task

(none recorded yet)
