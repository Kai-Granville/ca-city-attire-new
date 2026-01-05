import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,       // same as before
  process.env.SUPABASE_SERVICE_ROLE_KEY       // ⚠ service role key
);


// import { createClient } from "@supabase/supabase-js";

// // These are the environment variables you added in Vercel
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// // Initialize the Supabase client
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
