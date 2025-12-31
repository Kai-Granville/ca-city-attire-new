import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  // Ensure it's a GET request
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" }); // 405 - Method Not Allowed
  }

  const { id } = req.query;

  // Create the initial query to fetch products
  let query = supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false }); // Order by `id` instead of `created_at`

  // If `id` is provided, modify query to return a single product
  if (id) {
    query = query.eq("id", id).single(); // Fetch single product if `id` is provided
  }

  try {
    const { data, error } = await query;

    // Handle any Supabase errors
    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    // If no data found, return a 404 error for a missing product
    if (!data && id) {
      return res.status(404).json({ error: "Product not found" }); // 404 - Not Found
    }

    // Return the fetched data
    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
