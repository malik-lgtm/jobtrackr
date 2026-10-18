import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(url && key);
// Placeholders keep the app from crashing before .env is filled in;
// <App /> shows a setup screen when the keys are missing.
export const supabase = createClient(url ?? "http://localhost:54321", key ?? "public-anon-key-placeholder");
