# RepByRep

**Every rep counts. Every day matters.**

RepByRep is a workout tracking and consistency app. Pick your training split, log
weight/reps for every set, and watch an anatomical mannequin light up the muscles
you're targeting.

## Features

- **5-day training split** — Chest & Triceps, Back & Biceps, Legs, Shoulders, Arms
  (`src/data/workouts.ts`), each with exercises, target muscles, equipment, and
  step-by-step instructions.
- **Set-by-set logging** — track weight and reps per set, mark sets complete, and
  see live progress bars per exercise (`WorkoutDayCard`).
- **Interactive anatomical mannequin** — highlights which muscles the active day's
  exercises target; click a muscle to filter the exercise list to it
  (`AnatomicalMannequin`).
- **Rest timer** — quick 45s/60s/90s interval timer that auto-starts when a set is
  completed, with an audio beep on finish (synthesized via Web Audio API, no
  audio files).
- **Streak tracking** — counts consecutive days a full workout is completed.
- **Local persistence with optional Supabase sync** — workout set logs (weight,
  reps, completed) and the streak counter are saved via
  `src/services/workoutStorage.ts`: to `localStorage` by default (no backend
  database required), or to Supabase when the project is configured (see
  "Run locally" below). No login is required either way — Supabase rows are
  keyed by a client-generated anonymous ID, not an authenticated user.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS 4, `lucide-react`, `motion`
- **Backend:** Express 4 (`server.ts`) — serves the app via Vite middleware in dev
  and static files in production, plus the `/api/health` route
- **Data:** `localStorage` by default; optional Supabase (`@supabase/supabase-js`)
  for workout history/streak persistence

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. (Optional) Configure Supabase. Copy `.env.example` to `.env` and set
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your Supabase project's
   URL and anon key, then apply `supabase/migrations/` to that project. **This
   step is entirely optional** — if these two vars are left unset, the app
   works exactly the same and persists workout data to `localStorage` instead.
3. Start the dev server:
   ```
   npm run dev
   ```
   The app runs at `http://localhost:3000`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Express + Vite dev server (tsx) |
| `npm run build` | Build the frontend (Vite) and bundle the server (esbuild) into `dist/` |
| `npm start` | Run the production build (`dist/server.cjs`) |
| `npm run preview` | Preview the built frontend with Vite |
| `npm run lint` | Type-check with `tsc --noEmit` (no test suite configured) |

## Project structure

```
server.ts                  Express entry — /api/health, Vite wiring
supabase/migrations/       SQL schema for optional Supabase-backed persistence
src/
  main.tsx                 React entry
  App.tsx                  App state: workouts, timer, streak, muscle filter
  types.ts                 WorkoutSet / Exercise / WorkoutDay / UserWorkoutHistory
  data/workouts.ts         5-day workout split data
  lib/supabaseClient.ts    Supabase client (null when not configured)
  services/workoutStorage.ts Persistence abstraction: Supabase when configured, localStorage otherwise
  components/
    WorkoutDayCard.tsx     Per-exercise set tracker (weight/reps/complete)
    AnatomicalMannequin.tsx SVG muscle-target visualization
    ExerciseIllustration.tsx Per-exercise vector illustrations
```
