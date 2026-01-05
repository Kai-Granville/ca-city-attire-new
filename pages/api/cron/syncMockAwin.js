import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";
import fs from "fs";
import path from "path";
import { mapAwinToProduct } from "../../../lib/awinMapper.js";

export default async function handler(req, res) {
  try {
    // Load mock AWIN data
    const filePath = path.join(process.cwd(), "data/mockAwinProducts.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const awinRaw = JSON.parse(raw);

    // Map to Supabase schema
    const mapped = awinRaw.map(mapAwinToProduct);

    // Deduplicate by title + merchant and force unique IDs for testing
    const seen = new Map();
    const deduped = mapped.filter((p, index) => {
      const key = `${p.title.toLowerCase()}_${p.merchant.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.set(key, true);

      p.id = `awin_test_${Date.now()}_${index}`; // ensures unique ID
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
