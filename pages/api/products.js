import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category } = req.query;

  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    // Filter by single product ID
    if (id) {
      query = query.eq("id", id).single();
    }

    // Filter by category
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    // If querying by ID and no product found
    if (id && !data) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If querying by category and no products found, return empty array
    if (!id && !data) {
      return res.status(200).json([]);
    }

    // Return the product(s)
    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
