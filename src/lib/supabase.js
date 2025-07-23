import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ekgglodyuzklcksztczl.supabase.co'; // <-- dein Projekt-Link
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZ2dsb2R5dXprbGNrc3p0Y3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTIwNjUsImV4cCI6MjA2ODc2ODA2NX0.gvot8q3SWeLA90nIwnjRsOLkfCRXsd2L8iSuYOMRe5s'; // <-- findest du unter Project Settings → API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
