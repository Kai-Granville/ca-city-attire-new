import { createClient } from "@supabase/supabase-js";

// Supabase URL (same as frontend)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Service role key (server-only)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Export admin client for server-side scripts
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
