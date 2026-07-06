# RepByRep

**Every rep counts. Every day matters.**

RepByRep is a workout tracking and consistency app. Pick your training split, log
weight/reps for every set, watch an anatomical mannequin light up the muscles
you're targeting, and chat with an AI coach for form tips and custom plans.

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
- **AI Coach** — chat panel backed by Gemini (`/api/workout-ai`) for form
  questions, exercise substitutions, and custom workout plans. Falls back to a
  canned offline response if no API key is configured.
- **Local persistence** — all workout progress is saved to `localStorage`
  (`repbyrep_workouts_v1`), no backend database required.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS 4, `lucide-react`, `motion`
- **Backend:** Express 4 (`server.ts`) — serves the app via Vite middleware in dev
  and static files in production, plus the `/api/workout-ai` and `/api/health` routes
- **AI:** `@google/genai` (Gemini `gemini-3.5-flash`)

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to your Gemini API key
   (optional — the app runs fine without it, the AI Coach just falls back to an
   offline message).
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
server.ts                  Express entry — /api/workout-ai, /api/health, Vite wiring
src/
  main.tsx                 React entry
  App.tsx                  App state: workouts, timer, streak, muscle filter
  types.ts                 WorkoutSet / Exercise / WorkoutDay / UserWorkoutHistory
  data/workouts.ts         5-day workout split data
  components/
    WorkoutDayCard.tsx     Per-exercise set tracker (weight/reps/complete)
    AnatomicalMannequin.tsx SVG muscle-target visualization
    ExerciseIllustration.tsx Per-exercise vector illustrations
    AICoach.tsx            AI chat panel
```
