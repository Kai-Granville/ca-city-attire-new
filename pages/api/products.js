import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category, refresh } = req.query;

  try {
    // ===== 1. Optional cache refresh placeholder =====
    if (refresh === "true") {
      // This is where you would fetch from AWIN
      // For now, we just log it
      console.log("Cache refresh requested — placeholder for AWIN fetch");
      
      // Example: Update 'last_updated' timestamp for all products
      await supabase
        .from("products")
        .update({ last_updated: new Date().toISOString() });
    }

    // ===== 2. Build query =====
    let query = supabase.from("products").select("*").order("id", { ascending: false });

    if (id) query = query.eq("id", id).single();
    if (category) query = query.eq("category", category);

    // ===== 3. Fetch data =====
    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    // ===== 4. Handle missing data =====
    if (id && !data) return res.status(404).json({ error: "Product not found" });
    if (!id && !data) return res.status(200).json([]);

    // ===== 5. Return products =====
    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}
