import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category, limit } = req.query;

  let query = supabase
    .from("products")
    .select("*")
    .order("clicks", { ascending: false }); // Order by popularity

  if (id) {
    query = query.eq("id", id).single();
  }

  if (category) {
    query = query.ilike("category", category);
  }

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  try {
    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!data && id) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
