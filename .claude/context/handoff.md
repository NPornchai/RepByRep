## Agent Rule — MUST write this file at end of every session

> When finishing ANY session that modifies code, rewrite this file completely.
> Structure: what changed → key decisions → files touched → warnings → what's next.
> This is the backward-looking companion to `current-task.md` (forward-looking).
> A new agent reads BOTH files before starting work.

---

# Handoff — 2026-07-06 (session 2)

## What was done

Added Supabase scaffolding and refactored the workout persistence layer to use it,
with a required localStorage fallback since no live Supabase project exists yet.

| Fix/Feature | File | Detail |
|---|---|---|
| Added dependency | `package.json`, `package-lock.json` | `@supabase/supabase-js` (`^2.110.0`), installed via `npm install` |
| Supabase client module | `src/lib/supabaseClient.ts` (new) | Builds a `SupabaseClient` only when `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are both set; exports `isSupabaseConfigured` (boolean) and `supabase` (nullable) |
| Persistence abstraction | `src/services/workoutStorage.ts` (new) | `loadWorkouts`/`saveWorkouts`, `loadStreak`/`saveStreak`, `getDayLastCompleted`/`setDayLastCompleted`, plus sync `loadWorkoutsSync`/`loadStreakSync` for the no-Supabase initial render and `getClientId()` for the anonymous row-owner UUID. Supabase path when configured; `localStorage` path (same keys as before) when not. Real Supabase errors are thrown, not swallowed. |
| Vite env types | `src/vite-env.d.ts` (new) | `/// <reference types="vite/client" />` + `ImportMetaEnv`/`ImportMeta` overrides so `import.meta.env.VITE_SUPABASE_*` type-checks |
| SQL migration | `supabase/migrations/20260706000000_workout_history.sql` (new) | `workout_set_logs`, `workout_streaks`, `workout_day_completions` — see schema section below |
| Refactored persistence wiring | `src/App.tsx` | Replaced direct `localStorage` reads/writes with calls into `workoutStorage.ts`; added `isHydrated` state + an async hydration `useEffect` (Supabase-only) that runs once on mount; day-completion/streak effect now keys off `activeDay.id` (async) instead of `selectedDayIndex` (sync) — see decision below |
| Docs | `.env.example`, `README.md`, `CLAUDE.md` | Documented `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` as optional, localStorage-fallback-by-default; added new files/`supabase/migrations/` to project-structure listings |

## Schema designed (and why)

Source of truth for "what to migrate" was reading `src/App.tsx` + `src/types.ts` first,
not guessing. Found three distinct localStorage keys in current code, not the unused
`UserWorkoutHistory` type (that type exists in `types.ts` but is never read/written
anywhere — dead type, left untouched, out of scope):

1. `repbyrep_workouts_v1` — actually the **entire** `WorkoutDay[]` array (static
   exercise metadata + per-set `weight`/`reps`/`completed`), re-serialized whole on
   every change. Since static day/exercise definitions must stay in
   `src/data/workouts.ts` per the task, the Supabase table only needs the *logged*
   portion — `weight`/`reps`/`completed` per set — and the client reconstructs the
   full `WorkoutDay[]` by overlaying these logs onto `defaultWorkouts` at load time
   (`applySetLogs()` in `workoutStorage.ts`).
   → **`workout_set_logs`**: `client_id, day_id, exercise_id, set_id, set_index,
   weight, reps, completed, updated_at`, PK `(client_id, exercise_id, set_id)`.
2. `repbyrep_streak` — a single integer.
   → **`workout_streaks`**: `client_id (PK), streak_count, updated_at`.
3. `repbyrep_day_comp_last_${selectedDayIndex}` — one key per day, storing the last
   `Date.prototype.toDateString()` string that day was fully completed (guards
   double-incrementing the streak same-day).
   → **`workout_day_completions`**: `client_id, day_id, last_completed_date (text),
   updated_at`, PK `(client_id, day_id)`.

All three tables use `client_id text` (no FK — no auth table exists) populated from a
`crypto.randomUUID()` generated once and persisted in `localStorage` under
`repbyrep_client_id` (`getClientId()` in `workoutStorage.ts`).

## Key decisions made

- **Keyed day-completion/streak-guard by `day.id`, not array index.** The original
  code used `repbyrep_day_comp_last_${selectedDayIndex}` (array-position-based). For
  the Supabase table this is fragile (workout order is an implementation detail), so
  both the new `workout_day_completions` table AND the localStorage fallback path
  now key on `activeDay.id` (e.g. `"day-1"`) instead of index. This is a minor,
  intentional behavior-shape change from the literal pre-existing key string — no
  real users/data exist against the old key yet, and it's required to have one
  coherent key across both backends. Functionally identical (still guards
  same-day double-increment); just a more stable identifier.
- **Async persistence layer, but localStorage path stays fully synchronous.**
  Since Supabase reads are inherently async, `loadWorkouts()`/`loadStreak()` are
  `Promise`-returning. To avoid any visible "flash of default data" regression in
  the (current, only-real) no-Supabase case, `App.tsx`'s initial `useState` calls
  the new **synchronous** `loadWorkoutsSync()`/`loadStreakSync()` helpers directly
  when `isSupabaseConfigured` is false — identical timing/behavior to before. The
  async hydration `useEffect` only runs at all when Supabase IS configured.
- **`isHydrated` guard before the first save.** Without it, the effect that
  persists `workouts` on every change would fire on the very first render (with
  default/placeholder data) before the async Supabase load resolves, potentially
  upserting zeroed-out defaults over real previously-saved rows. `isHydrated`
  starts `true` when not configured (no async load needed) and starts `false`
  when configured, flipping to `true` only after the load `useEffect` settles
  (success or failure).
- **Errors are not swallowed once Supabase is configured.** Every Supabase branch
  in `workoutStorage.ts` throws on `{ error }` from the client; `App.tsx` catches
  and `console.error`s at the call sites (load effect, save effect, streak/day-
  completion effect) rather than silently no-op'ing, per the task's explicit
  requirement that "not configured" (silent fallback) and "configured but failing"
  (visible error) are different failure modes.
- **`UserWorkoutHistory` in `types.ts` was left untouched.** Grepped for it — it's
  never imported or used anywhere in the app (dead type, pre-existing). Out of
  scope for this task; not part of the schema since it doesn't reflect anything
  actually persisted today.

## Files changed/created

```
package.json                                          (added @supabase/supabase-js)
package-lock.json                                     (synced via npm install)
src/lib/supabaseClient.ts                              (new)
src/services/workoutStorage.ts                         (new)
src/vite-env.d.ts                                       (new)
supabase/migrations/20260706000000_workout_history.sql  (new)
src/App.tsx                                             (persistence calls refactored)
.env.example                                            (added VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
README.md                                               (Run locally + project structure updated)
CLAUDE.md                                               (Stack + Solution structure + Auth note updated)
```

## Warnings / watch out for

- **No live Supabase project exists.** The Supabase code branches in
  `workoutStorage.ts` are unit-reasoned (read carefully, types check, upsert/select
  shapes match the migration's columns) but have never executed against a real
  database — there was nothing to test against, per explicit task instruction not
  to invent/hardcode real credentials. When a real project exists: apply
  `supabase/migrations/20260706000000_workout_history.sql`, set the two `.env` vars,
  and smoke-test load/save/streak/day-completion end-to-end before trusting this
  path in production.
- **`workout_day_completions`/streak keying changed from index to `day.id`** (see
  decision above) — if any real localStorage data existed under the old
  `repbyrep_day_comp_last_<index>` keys, it will not be picked up under the new
  `repbyrep_day_comp_last_<day-id>` keys (harmless: worst case, streak
  re-increments once on next completion instead of being blocked as "already
  logged today"). No real user data is known to exist yet.
- `UserWorkoutHistory` in `src/types.ts` remains an unused/dead type — not touched,
  not part of the new schema; flagged here again in case a future task wants it
  either wired up or removed.
- `metadata.json` still references Gemini (`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`)
  — stale but out of scope, carried over from the prior session's note.
- `img/` remains untracked in git and was not touched.
- No test suite exists — only `npm run lint` (`tsc --noEmit`) for static
  verification, plus manual `npm run dev` + `curl` checks (see Testing below).

## Testing checklist (Mode B — no test suite/Codex in this project)

| Check | Result |
|---|---|
| `npm run lint` (`tsc --noEmit`) | ✅ passes clean, zero errors |
| `npm install` completed, `package-lock.json` includes `@supabase/supabase-js` | ✅ confirmed `^2.110.0` in `package.json`/lockfile |
| `npm run dev` starts, `GET /` returns 200 with expected `<title>RepByRep</title>` | ✅ confirmed via curl |
| `GET /api/health` returns `{"status":"ok",...}` | ✅ confirmed via curl |
| Vite can transform new modules (`App.tsx`, `workoutStorage.ts`, `supabaseClient.ts`) without error | ✅ all returned 200 via Vite dev endpoint; `App.tsx` transform includes `isSupabaseConfigured` reference (grep confirmed) |
| Live Supabase connection (configured branch) | ❌ not tested — no live project exists; explicitly out of scope per task instructions |
| Manual UI click-through (toggle sets, streak increment, timer) in browser | ❌ not performed this session — only HTTP-level checks (curl/Vite transform) were run, no browser automation available; recommend a manual pass next session if UI behavior is in question |

Build: ✅ — `npm run lint` clean; dev server verified serving correctly via curl/Vite
module transforms with the Supabase env vars absent (the current, expected state).

## What's next
See `current-task.md` for the prioritized task list.
**Immediate next task:** None assigned — awaiting user's next request. When a real
Supabase project is created, apply the migration and live-test the configured path.
