import { supabase } from "../../lib/supabase";

// Mock fetch (replace with AWIN later)
async function fetchAwinProductsByCategory(category) {
  console.log(`Fetching AWIN products for category "${category}" (mock)`);

  // Return mock products
  return [
    {
      id: `sku_mock_${category}_01`,
      name: `${category} Mock Product`,
      price: "£49.99",
      category,
      image_url: "https://via.placeholder.com/400x400",
      merchant: "Brand Mock",
      affiliate_url: "#"
    }
  ];
}

// Auto-refresh threshold in milliseconds (24 hours)
const REFRESH_THRESHOLD = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category, refresh } = req.query;

  try {
    // ===== 1. Check for stale products =====
    if (refresh === "true" || category) {
      const { data: productsInCategory, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category || "")
        .order("id", { ascending: false });

      if (error) console.error("Supabase error fetching category:", error);

      const now = new Date();

      // Check which products are stale
      const staleProducts = (productsInCategory || []).filter(p => {
        if (!p.last_updated) return true;
        return now - new Date(p.last_updated) > REFRESH_THRESHOLD;
      });

      if (staleProducts.length > 0) {
        console.log(`Refreshing ${staleProducts.length} stale product(s)`);

        // Fetch mock AWIN products (replace with real API later)
        const awinProducts = await fetchAwinProductsByCategory(category || "General");

        for (const product of awinProducts) {
          const { error: upsertError } = await supabase
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

          if (upsertError) console.error("Upsert error:", upsertError);
        }
      }
    }

    // ===== 2. Build query for frontend =====
    let query = supabase.from("products").select("*").order("id", { ascending: false });
    if (id) query = query.eq("id", id).single();
    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });

    if (id && !data) return res.status(404).json({ error: "Product not found" });
    if (!id && !data) return res.status(200).json([]);

    res.status(200).json(data);

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}
