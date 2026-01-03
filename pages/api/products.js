import { supabase } from "../../lib/supabase";

// Mock fetch placeholder (replace with AWIN later)
const mockAwinProducts = [
  // example placeholder; currently no real AWIN fetch
];

async function fetchAwinProductsByCategory(category) {
  console.log(`Mock AWIN fetch for category: ${category}`);
  // Currently returns empty array; later swap with real AWIN API
  return [];
}

// Auto-refresh threshold (ms) — 24 hours
const REFRESH_THRESHOLD = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category, refresh } = req.query;

  try {
    // ===== 1. Optional cache refresh =====
    if (refresh === "true") {
      console.log("Cache refresh requested");

      // Fetch mock AWIN products (replace with real AWIN API later)
      const awinProducts = await fetchAwinProductsByCategory(category || null);

      const now = new Date();

      for (const product of awinProducts) {
        const { error } = await supabase
          .from("products")
          .upsert({
            id: product.id,
            title: product.name,
            price: product.price,
            category: product.category,
            image: product.image_url,
            merchant: product.merchant,
            affiliate_link: product.affiliate_url,
            last_updated: now.toISOString()
          }, { onConflict: "id" });

        if (error) console.error("Upsert error:", error);
      }
    }

    // ===== 2. Build query =====
    let query = supabase.from("products").select("*").order("id", { ascending: false });

    if (id) {
      query = query.eq("id", id).single(); // single product
    }

    if (category) {
      // Case-insensitive category match
      query = query.ilike("category", category);
    }

    // ===== 3. Fetch data =====
    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    if (id && !data) return res.status(404).json({ error: "Product not found" });
    if (!id && !data) return res.status(200).json([]);

    // ===== 4. Return products =====
    res.status(200).json(data);

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}
