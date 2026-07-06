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
- **Streak tracking** — counts consecutive days a full workout is completed,
  persisted in `localStorage`.
- **Local persistence** — all workout progress is saved to `localStorage`
  (`repbyrep_workouts_v1`), no backend database required.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS 4, `lucide-react`, `motion`
- **Backend:** Express 4 (`server.ts`) — serves the app via Vite middleware in dev
  and static files in production, plus the `/api/health` route

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
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
src/
  main.tsx                 React entry
  App.tsx                  App state: workouts, timer, streak, muscle filter
  types.ts                 WorkoutSet / Exercise / WorkoutDay / UserWorkoutHistory
  data/workouts.ts         5-day workout split data
  components/
    WorkoutDayCard.tsx     Per-exercise set tracker (weight/reps/complete)
    AnatomicalMannequin.tsx SVG muscle-target visualization
    ExerciseIllustration.tsx Per-exercise vector illustrations
```
