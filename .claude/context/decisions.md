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
