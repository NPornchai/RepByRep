# RepByRep — Decision Log

> **APPEND ONLY — never overwrite or delete entries.**
> Write here whenever a non-obvious trade-off is made that isn't self-evident from the code.
> Both the main assistant and any agent should append when making a significant decision.
>
> Format: `## [YYYY-MM-DD] Short title` → Context → Decision → Rationale → Consequences

---

## [2026-07-06] Bootstrapped context-files system

**Context:** Project had no `CLAUDE.md` or `.claude/context/` files. User asked to
read `c:\Users\pnaka\.claude\guides\context-files-system.md` and follow it.

**Decision:** Created `CLAUDE.md` plus `current-task.md`, `handoff.md`,
`decisions.md` under `.claude/context/`, populated from the existing repo state
(package.json, server.ts, vite.config.ts, src/ tree, metadata.json).

**Rationale:** Following the guide's bootstrap instructions verbatim so future
sessions get consistent forward/backward-looking context without re-deriving it
from scratch each time.

**Consequences:** Any agent/session that changes code in this repo must overwrite
`current-task.md` and `handoff.md` before finishing, and append here only for
non-obvious trade-offs (not for routine changes).

---

## [2026-07-06] Removed Coach Terminal AI feature — also dropped dotenv and express.json()

**Context:** User asked to remove the "Coach Terminal AI" (Gemini chat) feature
entirely, not just hide it. This touched `server.ts`'s only JSON-body-parsing route
and its only `dotenv`-sourced env var (`GEMINI_API_KEY`).

**Decision:** Removed `dotenv`/`dotenv.config()` and `app.use(express.json())` from
`server.ts` in addition to the Gemini client and `/api/workout-ai` route, rather than
leaving them in place "just in case." Verified first via grep that no other code
reads `req.body` or relies on `dotenv`-loaded env vars (`NODE_ENV` and `DISABLE_HMR`
are read directly from `process.env`, not via `.env`/`dotenv`). Also ran `npm install`
after editing `package.json` to actually prune `@google/genai`/`dotenv` from
`node_modules` and resync `package-lock.json`, instead of just editing the manifest.

**Rationale:** Task explicitly said "removed entirely, not just hidden" — leaving
now-dead middleware/imports around would violate the no-dead-code rule and leave a
stale lockfile that could confuse the next `npm install`.

**Consequences:** If a future feature needs JSON request bodies or `.env`-file-based
config again, `express.json()` and `dotenv` will need to be re-added (not still
present as unused scaffolding). `APP_URL` in `.env.example` was left alone — it was
already unused by any `process.env.APP_URL` read before this session and is
unrelated to the AI Coach feature, so it was out of this task's scope.

---

## [2026-07-06] Added Supabase scaffolding — persistence abstraction with required localStorage fallback, no live project yet

**Context:** User asked to add Supabase scaffolding and refactor workout
history/streak persistence to use it, but explicitly: no live Supabase project
exists, no auth is allowed, and the app must work identically to today via
`localStorage` when the two `VITE_SUPABASE_*` env vars are absent.

**Decision:** Built `src/services/workoutStorage.ts` as a persistence abstraction
with an async Supabase-or-localStorage branch per operation, plus **synchronous**
`loadWorkoutsSync()`/`loadStreakSync()` helpers used only for `App.tsx`'s initial
`useState` when Supabase isn't configured (so the no-Supabase first render has zero
timing/behavior change vs. before). Added an `isHydrated` guard state so the
save-on-change effect can't fire with default/placeholder data and clobber real
Supabase rows before the one-time async hydration effect resolves. Also changed the
day-completion/streak-guard key from array index (`selectedDayIndex`) to the stable
`day.id`, in both the new Supabase table and the localStorage fallback path.

**Rationale:** Index-based keys are fragile for a database schema (workout array
order is an implementation detail, not a stable identifier) — needed one coherent
key across both backends. The sync/async split for the localStorage path was
necessary to satisfy "must keep working exactly as it does today" literally (no
flash-of-default-data regression), since Supabase reads are unavoidably async but
localStorage reads never were.

**Consequences:** Any real localStorage data previously stored under the old
`repbyrep_day_comp_last_<index>` keys will not be picked up under the new
`repbyrep_day_comp_last_<day-id>` keys (harmless — worst case a streak
re-increments once instead of being blocked as "already completed today"; no known
real user data exists yet). The Supabase-configured code path has never executed
against a live database (none exists) — it is unit-reasoned/type-checked only, not
live-tested; must be smoke-tested end-to-end the first time a real Supabase project
and credentials exist. `UserWorkoutHistory` in `src/types.ts` remains unused/dead —
confirmed via grep it's never referenced, so it was deliberately excluded from the
new schema rather than guessed into a table.
