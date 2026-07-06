import { WorkoutDay } from "../types";
import { defaultWorkouts } from "../data/workouts";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

// Persistence abstraction for workout history/progress (logged sets + streak).
// Static workout day/exercise definitions (src/data/workouts.ts) never move to
// Supabase — only the per-set logged values (weight/reps/completed) and the
// streak/day-completion tracking are persisted here.
//
// When VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set, every function
// below transparently falls back to the same localStorage keys/behavior the
// app used before this abstraction existed. When Supabase IS configured, real
// errors are thrown (not swallowed) so callers can decide how to surface them.

const WORKOUTS_KEY = "repbyrep_workouts_v1";
const STREAK_KEY = "repbyrep_streak";
const CLIENT_ID_KEY = "repbyrep_client_id";
const DAY_COMPLETION_KEY_PREFIX = "repbyrep_day_comp_last_";
const DEFAULT_STREAK = 4;

/** Stable anonymous per-browser identifier used as the row-owner key in Supabase (no auth). */
export function getClientId(): string {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}

interface WorkoutSetLogRow {
  exercise_id: string;
  set_id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

function applySetLogs(workouts: WorkoutDay[], logs: WorkoutSetLogRow[]): WorkoutDay[] {
  if (logs.length === 0) return workouts;
  const logsBySetId = new Map(logs.map((log) => [log.set_id, log]));
  return workouts.map((day) => ({
    ...day,
    exercises: day.exercises.map((ex) => ({
      ...ex,
      sets: ex.sets.map((set) => {
        const log = logsBySetId.get(set.id);
        return log
          ? { ...set, weight: log.weight, reps: log.reps, completed: log.completed }
          : set;
      }),
    })),
  }));
}

function loadWorkoutsFromLocalStorage(): WorkoutDay[] {
  const saved = localStorage.getItem(WORKOUTS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved workouts", e);
    }
  }
  return defaultWorkouts;
}

/** Synchronous localStorage-only load, used for the no-Supabase initial render (no flash of default data). */
export function loadWorkoutsSync(): WorkoutDay[] {
  return loadWorkoutsFromLocalStorage();
}

/** Synchronous localStorage-only load, used for the no-Supabase initial render. */
export function loadStreakSync(): number {
  return parseInt(localStorage.getItem(STREAK_KEY) || String(DEFAULT_STREAK), 10) || DEFAULT_STREAK;
}

export async function loadWorkouts(): Promise<WorkoutDay[]> {
  if (!isSupabaseConfigured || !supabase) {
    return loadWorkoutsFromLocalStorage();
  }
  const clientId = getClientId();
  const { data, error } = await supabase
    .from("workout_set_logs")
    .select("exercise_id, set_id, weight, reps, completed")
    .eq("client_id", clientId);
  if (error) {
    throw new Error(`Failed to load workout sets from Supabase: ${error.message}`);
  }
  return applySetLogs(defaultWorkouts, data ?? []);
}

export async function saveWorkouts(workouts: WorkoutDay[]): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
    return;
  }
  const clientId = getClientId();
  const rows = workouts.flatMap((day) =>
    day.exercises.flatMap((ex) =>
      ex.sets.map((set) => ({
        client_id: clientId,
        day_id: day.id,
        exercise_id: ex.id,
        set_id: set.id,
        set_index: set.setIndex,
        weight: set.weight,
        reps: set.reps,
        completed: set.completed,
      }))
    )
  );
  const { error } = await supabase
    .from("workout_set_logs")
    .upsert(rows, { onConflict: "client_id,exercise_id,set_id" });
  if (error) {
    throw new Error(`Failed to save workout sets to Supabase: ${error.message}`);
  }
}

export async function loadStreak(): Promise<number> {
  if (!isSupabaseConfigured || !supabase) {
    return loadStreakSync();
  }
  const clientId = getClientId();
  const { data, error } = await supabase
    .from("workout_streaks")
    .select("streak_count")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) {
    throw new Error(`Failed to load streak from Supabase: ${error.message}`);
  }
  return data?.streak_count ?? DEFAULT_STREAK;
}

export async function saveStreak(streak: number): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    localStorage.setItem(STREAK_KEY, streak.toString());
    return;
  }
  const clientId = getClientId();
  const { error } = await supabase
    .from("workout_streaks")
    .upsert({ client_id: clientId, streak_count: streak }, { onConflict: "client_id" });
  if (error) {
    throw new Error(`Failed to save streak to Supabase: ${error.message}`);
  }
}

/** Last calendar date (toDateString() format) a given workout day was fully completed, or null. */
export async function getDayLastCompleted(dayId: string): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return localStorage.getItem(`${DAY_COMPLETION_KEY_PREFIX}${dayId}`);
  }
  const clientId = getClientId();
  const { data, error } = await supabase
    .from("workout_day_completions")
    .select("last_completed_date")
    .eq("client_id", clientId)
    .eq("day_id", dayId)
    .maybeSingle();
  if (error) {
    throw new Error(`Failed to load day completion from Supabase: ${error.message}`);
  }
  return data?.last_completed_date ?? null;
}

export async function setDayLastCompleted(dayId: string, dateString: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    localStorage.setItem(`${DAY_COMPLETION_KEY_PREFIX}${dayId}`, dateString);
    return;
  }
  const clientId = getClientId();
  const { error } = await supabase
    .from("workout_day_completions")
    .upsert(
      { client_id: clientId, day_id: dayId, last_completed_date: dateString },
      { onConflict: "client_id,day_id" }
    );
  if (error) {
    throw new Error(`Failed to save day completion to Supabase: ${error.message}`);
  }
}
