import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (id) {
    query = query.eq("id", id).single(); // Fetch single product if `id` is provided
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);  // Return the fetched data
}
