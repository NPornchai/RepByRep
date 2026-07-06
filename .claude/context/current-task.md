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

---

## Next task — (none assigned yet)

**Size:** —
**Goal:** All prior uncommitted work (context-files bootstrap, README rewrite, favicon/title
addition, Coach Terminal AI removal) has been consolidated into a single commit. Next
session should pick up whatever the user asks for and fill this section in.

### What's already done
- Context-files system bootstrapped (`CLAUDE.md`, `current-task.md`, `handoff.md`, `decisions.md`)
- Rewrote `README.md` — replaced AI Studio boilerplate with real project docs
- Added app title + favicon: `index.html` `<title>` set to "RepByRep" and
  `<link rel="icon">` added; `public/favicon.svg` created (maroon tile, cream dumbbell,
  matches app brand colors) — verified serving correctly from dev server
- Removed the Coach Terminal AI feature entirely: `src/components/AICoach.tsx` deleted,
  `App.tsx` import/render removed, `server.ts` Gemini wiring + `/api/workout-ai` route +
  `dotenv`/`express.json()` removed, `@google/genai`/`dotenv` dropped from `package.json`
  (with `npm install` run to sync `node_modules`/`package-lock.json`), `GEMINI_API_KEY`
  removed from `.env.example`, and `README.md`/`CLAUDE.md` updated accordingly.
  `npm run lint` (`tsc --noEmit`) passes clean.
- Committed all of the above (context bootstrap + README rewrite + favicon + AI
  removal) in one consolidated commit, including `package-lock.json` which was
  previously untracked in git.

### What needs to be done
- Awaiting next user request

### Implementation notes
- (none yet)

---

## Deferred (do not do today)

| Item | Reason deferred |
|---|---|
| Clean up `metadata.json`'s `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` capability flag | Out of scope for the AI Coach removal task — it's AI Studio platform metadata, not app code; flagged in handoff.md 2026-07-06 |
