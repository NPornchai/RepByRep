## Agent Rule — MUST write this file at end of every session

> When finishing ANY session that modifies code, rewrite this file completely.
> Structure: what changed → key decisions → files touched → warnings → what's next.
> This is the backward-looking companion to `current-task.md` (forward-looking).
> A new agent reads BOTH files before starting work.

---

# Handoff — 2026-07-06

## What was done (consolidated — covers all uncommitted work in the working tree)

This working tree contains work from several back-to-back sessions on 2026-07-06 that
had not yet been committed. Consolidated here as one coherent record:

| Fix/Feature | File | Detail |
|---|---|---|
| Bootstrapped context-files system | `CLAUDE.md`, `.claude/context/*.md` | Created `CLAUDE.md` plus `current-task.md`, `handoff.md`, `decisions.md` under `.claude/context/`, populated from existing repo state (package.json, server.ts, vite.config.ts, src/ tree, metadata.json) |
| Rewrote README | `README.md` | Replaced AI Studio boilerplate with real project docs (Features/Stack/Run-locally/Project-structure) |
| Retroactive: added favicon + title | `index.html`, `public/favicon.svg` | `<title>` changed from "My Google AI Studio App" to "RepByRep"; added `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`; created `public/favicon.svg` — a maroon (`#6E1B1D`) rounded-square tile with a cream (`#FAF8F5`) dumbbell icon, matching the app's brand colors. This predates the Coach Terminal AI removal session below (done in an earlier, separate session) and was never logged here until now — logging it retroactively per review flag. Verified working: dev server tested, favicon served with 200 status and correct `image/svg+xml` mime type. |
| Removed Coach Terminal AI feature | `src/components/AICoach.tsx` | Deleted entirely — chat UI, quick commands, message history, markdown formatter |
| Removed AICoach usage | `src/App.tsx` | Dropped `import AICoach from "./components/AICoach"` and the `<AICoach />` render call + its leading comment near the end of the right column |
| Removed Gemini backend wiring | `server.ts` | Removed `GoogleGenAI` import/`aiClient`/`getAiClient()` singleton, the `app.post("/api/workout-ai", ...)` route (system instructions, chat history mapping, Gemini call, offline fallback text), `dotenv` import/`dotenv.config()`, and `app.use(express.json())` (nothing else parsed JSON bodies). `/api/health` and Vite/static-serving logic left untouched. |
| Removed unused dependencies | `package.json`, `package-lock.json` | Removed `@google/genai` and `dotenv` (confirmed via grep neither is imported/used anywhere else); ran `npm install` to prune `node_modules` and sync `package-lock.json` (37 packages removed, 0 vulnerabilities). **Note:** `package-lock.json` had never been committed to git before this — it was untracked. It is being staged/committed for the first time now, alongside this prune. |
| Removed GEMINI_API_KEY entry | `.env.example` | Deleted the `GEMINI_API_KEY` line and its comment block; left `APP_URL` as-is (unrelated to this feature, pre-existing) |
| Rewrote Features/Stack/Run-locally/Project-structure (2nd pass) | `README.md` | Removed "AI Coach" bullet, `@google/genai`/Gemini stack line, the `.env`/`GEMINI_API_KEY` setup step, `/api/workout-ai` route mention, and `AICoach.tsx` from the project structure listing |
| Updated Stack/Hard-rules/Solution-structure | `CLAUDE.md` | Dropped the `@google/genai`/Gemini stack line and `/api/workout-ai` references; removed the two hard rules tied to `GEMINI_API_KEY` (server-side-only requirement, offline-mode-fallback requirement — both moot since the key no longer exists in the app); removed `AICoach.tsx` from solution structure; updated the one-line project description (was: "...and chat with an AI coach (Gemini) for guidance") |

## Key decisions made

- Removed `app.use(express.json())` from `server.ts` along with the route it existed
  for — verified via read of the full file that no other route reads `req.body`.
- Removed `dotenv` usage entirely — grepped for `process.env` across the repo; the
  only other `process.env` reads are `NODE_ENV` (set by the runner, not `.env`) and
  `DISABLE_HMR` (read directly in `vite.config.ts`, not via `dotenv`/`server.ts`).
  `APP_URL` in `.env.example` was already unused by any `process.env.APP_URL` read
  before this session — left it in `.env.example` untouched since it's unrelated to
  the AI Coach feature and out of this task's scope.
- Did not touch `metadata.json` (`majorCapabilities: ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]`)
  — it's AI Studio platform metadata, not in the task's listed file scope. Flagging
  it here in case a future task wants it cleaned up too.
- Ran `npm install` (not just edited `package.json`) to actually prune `@google/genai`
  and `dotenv` from `node_modules` and resync `package-lock.json`, so the dev server
  environment matches the trimmed manifest exactly.
- `package-lock.json` is being committed to git for the first time in this same commit
  (it was untracked before) — staged deliberately so it doesn't silently get skipped by
  a plain `git commit -a` (which ignores untracked files).
- The favicon/title change (`index.html`, `public/favicon.svg`) is not logged in
  `decisions.md` — it's a straightforward, low-risk asset addition with no non-obvious
  trade-off, so a decision-log entry wasn't judged necessary. It is logged here in
  `handoff.md` for completeness per code-review feedback.

## Files changed in this consolidated commit

```
CLAUDE.md                       (new)
.claude/context/current-task.md (new)
.claude/context/handoff.md      (new)
.claude/context/decisions.md    (new)
README.md
index.html
public/favicon.svg              (new)
src/components/AICoach.tsx      (deleted)
src/App.tsx
server.ts
package.json
package-lock.json                (new — first time tracked in git)
.env.example
```

## Warnings / watch out for

- `metadata.json` still references Gemini (`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`)
  — stale but out of scope for this task; consider cleaning up if AI Studio metadata
  is ever revisited.
- No test suite exists — only `npm run lint` (`tsc --noEmit`) for verification.
  Ran it multiple times across these sessions (before/after `npm install`, and again
  before this consolidated commit); all passed clean with zero errors.
- `img/` is untracked in git and intentionally NOT part of this commit — pre-existing
  personal photos unrelated to any of this work. Leave it alone unless the user asks.
- `package-lock.json` was untracked before this commit — always check `git status`
  for untracked-but-relevant files before assuming `git commit -a` captured everything.

## What's next
See `current-task.md` for the prioritized task list.
**Immediate next task:** None assigned — awaiting user's next request.
