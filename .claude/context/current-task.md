## Agent Rule — MUST follow every session

> After completing ANY work in this project, rewrite this file to reflect the new state:
> - Move completed items to "Done this session" or remove them
> - Update "Next task" to the actual next item
> - Keep deferred items as-is unless status changed
>
> This file is the handoff contract between agent sessions. A stale file = wrong context for the next agent.

---

# Current Task

> Overwrite this file each session — do not accumulate old tasks.
> Last updated: 2026-07-06

## Status: Ready to start

> ⚠️ **Supabase is NOT connected yet.** Only scaffolding exists (client module,
> persistence abstraction, SQL migration). No real Supabase project/credentials
> exist. The app runs entirely on the `localStorage` fallback path today — do not
> assume the Supabase code path has ever executed against a real database.

---

## Next task — (none assigned yet)

**Size:** —
**Goal:** Supabase scaffolding for workout history/streak persistence is done (see
`handoff.md` for full detail), but it is scaffolding only — no live Supabase project
exists, so the app is still running on `localStorage` in practice. Next session
should pick up whatever the user asks for and fill this section in.

### What's already done
- Added `@supabase/supabase-js` dependency (`npm install` run, `package-lock.json` synced).
- `src/lib/supabaseClient.ts` — constructs a Supabase client only when
  `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are both set; exports
  `isSupabaseConfigured` and a nullable `supabase` client.
- `src/services/workoutStorage.ts` — persistence abstraction: reads/writes
  workout set logs, streak, and per-day last-completed date via Supabase when
  configured, transparently falling back to the existing `localStorage` keys
  otherwise. Real Supabase errors are thrown (not swallowed); the "not
  configured" case is a silent, expected fallback.
- `supabase/migrations/20260706000000_workout_history.sql` — new migration:
  `workout_set_logs`, `workout_streaks`, `workout_day_completions` tables, all
  keyed by client-generated `client_id` (no auth FK).
- `src/vite-env.d.ts` — added so `import.meta.env.VITE_SUPABASE_*` type-checks.
- Refactored `src/App.tsx` to load/save through the new persistence layer
  instead of calling `localStorage` directly; added a hydration guard so an
  async Supabase load can't be clobbered by the save effect before it resolves.
- Updated `.env.example`, `README.md`, `CLAUDE.md` to document the two new
  optional env vars and the new files/folder.
- `npm run lint` (`tsc --noEmit`) passes clean. Verified via `npm run dev` +
  `curl` that the app still serves correctly and Vite transforms the new
  modules without error (no live Supabase project exists to test against —
  none was created, per the task's explicit instruction).

### What needs to be done
- Awaiting next user request. If/when a real Supabase project is created, the
  next session should apply `supabase/migrations/` to it and smoke-test the
  Supabase-configured code path end-to-end (currently only localStorage-path
  and Vite-transform verified — the Supabase branch is unit-reasoned, not
  live-tested, since no project exists yet).

### Implementation notes
- (none yet)

---

## Deferred (do not do today)

| Item | Reason deferred |
|---|---|
| Clean up `metadata.json`'s `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` capability flag | Out of scope for the AI Coach removal task — it's AI Studio platform metadata, not app code; flagged in handoff.md 2026-07-06 |
| Live-test the Supabase-configured code path | No real Supabase project exists yet — scaffolding only, per explicit task instruction not to invent/hardcode real credentials; flagged 2026-07-06 |
