-- RepByRep: workout history/progress persistence.
--
-- Scope: only the data that was previously stored in localStorage under
-- `repbyrep_workouts_v1` (logged weight/reps/completed per set), the
-- `repbyrep_streak` counter, and the per-day `repbyrep_day_comp_last_*` last
-- completion date. Static workout day/exercise definitions
-- (src/data/workouts.ts) are NOT stored here — they stay hardcoded in the
-- client.
--
-- No auth exists in this app. `client_id` is a client-generated UUID
-- (crypto.randomUUID(), persisted in localStorage under `repbyrep_client_id`)
-- used as the row-owner key instead of a foreign key to an auth table, so the
-- schema is auth-ready later without requiring a login now.

-- Per-set logged progress. One row per (client, exercise, set) combination.
create table if not exists workout_set_logs (
  client_id text not null,
  day_id text not null,
  exercise_id text not null,
  set_id text not null,
  set_index integer not null,
  weight numeric not null default 0,
  reps integer not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (client_id, exercise_id, set_id)
);

create index if not exists workout_set_logs_client_id_idx
  on workout_set_logs (client_id);

-- Consecutive-day streak counter. One row per client.
create table if not exists workout_streaks (
  client_id text primary key,
  streak_count integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Last calendar date (JS `Date.prototype.toDateString()` format) each workout
-- day was fully completed, used to guard against double-incrementing the
-- streak on repeat visits within the same day.
create table if not exists workout_day_completions (
  client_id text not null,
  day_id text not null,
  last_completed_date text not null,
  updated_at timestamptz not null default now(),
  primary key (client_id, day_id)
);
