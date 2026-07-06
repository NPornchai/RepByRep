import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase is optional scaffolding: no live project exists yet. When the env vars
// below are absent (the default state right now), `supabase` stays null and
// `src/services/workoutStorage.ts` transparently falls back to localStorage.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
