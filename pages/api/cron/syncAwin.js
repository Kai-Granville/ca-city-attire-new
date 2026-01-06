import { createClient } from "@supabase/supabase-js";
import { fetchAwinProducts } from "../../../lib/awin";
import { mapAwinToProduct } from "../../../lib/awinMapper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Optional protection (recommended)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const limit = 50;
    let page = 1;
    let totalFetched = 0;
    let allProducts = [];

    while (true) {
      const awinRaw = await fetchAwinProducts({ limit, page });
      if (!awinRaw || awinRaw.length === 0) break;

      const mapped = awinRaw
        .map(mapAwinToProduct)
        .filter(Boolean); // safety

      allProducts.push(...mapped);
      totalFetched += mapped.length;

      if (awinRaw.length < limit) break;
      page++;
    }

    if (allProducts.length === 0) {
      return res.status(200).json({ message: "No products to sync" });
    }

    const { error } = await supabase
      .from("products")
      .upsert(allProducts, {
        onConflict: "id"
      });

    if (error) throw error;

    return res.status(200).json({
      message: "AWIN sync completed",
      products_synced: allProducts.length
    });

  } catch (err) {
    console.error("AWIN sync failed:", err);
    return res.status(500).json({ error: "AWIN sync failed" });
  }
}
