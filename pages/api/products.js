import { supabase } from "../../lib/supabase";

// ===== Placeholder function for future AWIN fetch =====
async function fetchAwinProducts() {
  // TODO: replace this with real AWIN API call
  // Return an array of products like this:
  /*
  [
    {
      id: "sku_100",
      name: "AWIN Product Name",
      price: "£59.99",
      category: "Shirts",
      image_url: "https://awin.example.com/image.jpg",
      merchant: "Brand Name",
      affiliate_url: "https://awin.example.com/product-link"
    },
    ...
  ]
  */
  console.log("Fetching AWIN products (placeholder)");
  return [];
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category, refresh } = req.query;

  try {
    // ===== 1. Optional cache refresh =====
    if (refresh === "true") {
      console.log("Cache refresh requested");

      // Fetch AWIN products (currently placeholder)
      const awinProducts = await fetchAwinProducts();

      // Upsert products into Supabase
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
            last_updated: new Date().toISOString()
          }, { onConflict: "id" }); // update existing products if ID matches

        if (error) console.error("Upsert error:", error);
      }
    }

    // ===== 2. Build query =====
    let query = supabase.from("products").select("*").order("id", { ascending: false });

    if (id) query = query.eq("id", id).single();
    if (category) query = query.eq("category", category);

    // ===== 3. Fetch data =====
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });

    // ===== 4. Handle missing data =====
    if (id && !data) return res.status(404).json({ error: "Product not found" });
    if (!id && !data) return res.status(200).json([]);

    // ===== 5. Return products =====
    res.status(200).json(data);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}
