import { createClient } from "@supabase/supabase-js";
import { fetchAwinProducts } from "../lib/awin";
import { mapAwinToProduct } from "../lib/awinMapper";

// Initialize Supabase service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncAwin() {
  console.log("Starting AWIN sync...");

  try {
    const limit = 50; // number of products per page
    let page = 1;
    let totalFetched = 0;
    let allProducts = [];

    // Loop through pages until less than limit returned
    while (true) {
      const awinRaw = await fetchAwinProducts({ limit, page });
      if (!awinRaw.length) break;

      const mapped = awinRaw.map(mapAwinToProduct);
      allProducts = allProducts.concat(mapped);
      totalFetched += mapped.length;

      if (awinRaw.length < limit) break; // last page
      page++;
    }

    console.log(`Fetched ${totalFetched} AWIN products.`);

    // Deduplicate by title + merchant
    const seen = new Map();
    const deduped = allProducts.filter(p => {
      const key = `${p.title.toLowerCase()}_${p.merchant.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.set(key, true);
      return true;
    });

    console.log(`Deduplicated to ${deduped.length} products.`);

    // Upsert into Supabase
    const { error } = await supabase
      .from("products")
      .upsert(deduped, { onConflict: ["id"] });

    if (error) throw error;

    console.log("AWIN products synced successfully!");
  } catch (err) {
    console.error("AWIN sync failed:", err);
  }
}

// Run script
syncAwin();
