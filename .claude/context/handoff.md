## Agent Rule — MUST write this file at end of every session

> When finishing ANY session that modifies code, rewrite this file completely.
> Structure: what changed → key decisions → files touched → warnings → what's next.
> This is the backward-looking companion to `current-task.md` (forward-looking).
> A new agent reads BOTH files before starting work.

---

# Handoff — 2026-07-06

## What was done this session

| Fix/Feature | File | Detail |
|---|---|---|
| Bootstrapped context-files system | `CLAUDE.md`, `.claude/context/*.md` | Created root context + current-task/handoff/decisions per the standard template |
| Rewrote README | `README.md` | Replaced Google AI Studio boilerplate with real project docs: features (5-day split, set logging, anatomical mannequin, rest timer, streaks, AI coach, localStorage persistence), stack, run/scripts, project structure |

## Key decisions made

None yet — this session set up context-file scaffolding and rewrote the README
by reading the existing project (App.tsx, AICoach.tsx, WorkoutDayCard.tsx,
workouts.ts, server.ts, vite.config.ts). No app code was changed, only docs.

## Files changed this session

```
CLAUDE.md
.claude/context/current-task.md
.claude/context/handoff.md
.claude/context/decisions.md
README.md
```

## Warnings / watch out for

- Project was scaffolded from Google AI Studio (see `metadata.json`, `README.md`
  reference to ai.studio) — some conventions (e.g. `DISABLE_HMR` handling in
  `vite.config.ts`) exist specifically to support that platform's agent-editing flow.
- No test suite exists — only `npm run lint` (`tsc --noEmit`) for verification.

## What's next
See `current-task.md` for the prioritized task list.
**Immediate next task:** None assigned — awaiting user's next request.
