import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";
import { mapAwinToProduct } from "../../../lib/awinMapper.js";

export default async function handler(req, res) {
  try {
    console.log("Starting mock AWIN sync...");

    // Hardcoded mock AWIN products
    const awinRaw = [
      {
        id: 101,
        product_name: "Mock Shirt",
        search_price: { amount: 49.99 },
        image_url: "/mock/shirt.jpg",
        advertiser_name: "Mock Merchant",
        aw_deep_link: "https://example.com/affiliate/101",
        category_name: "shirts"
      },
      {
        id: 102,
        product_name: "Mock Pants",
        search_price: { amount: 59.99 },
        image_url: "/mock/pants.jpg",
        advertiser_name: "Mock Merchant",
        aw_deep_link: "https://example.com/affiliate/102",
        category_name: "pants"
      }
    ];

    // Map to your Supabase schema
    const mapped = awinRaw.map(mapAwinToProduct);

    // Deduplicate and assign unique IDs
    const seen = new Map();
    const deduped = mapped.filter((p, index) => {
      const key = `${p.title.toLowerCase()}_${p.merchant.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.set(key, true);

      // Unique ID so we can insert multiple times for testing
      p.id = `awin_test_${Date.now()}_${index}`;
      return true;
    });

    // Upsert into Supabase
    const { data, error } = await supabaseAdmin
      .from("products")
      .upsert(deduped, { onConflict: ["id"] });

    if (error) {
      console.error("Upsert error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Upserted rows:", data.length);
    res.status(200).json({ inserted: data.length, products: data });
  } catch (err) {
    console.error("Sync failed:", err);
    res.status(500).json({ error: err.message });
  }
}
