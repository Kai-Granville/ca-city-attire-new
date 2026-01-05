import fs from "fs";
import path from "path";
import { supabaseAdmin } from "../lib/supabaseAdmin.js";
import { mapAwinToProduct } from "../lib/awinMapper.js"; // make sure you have this

async function syncMockAwin() {
  try {
    console.log("Starting mock AWIN sync...");

    // Load mock AWIN data locally
    const filePath = path.join(process.cwd(), "data/mockAwinProducts.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const awinRaw = JSON.parse(raw);

    // Map to your DB schema
    const mapped = awinRaw.map(mapAwinToProduct);

    // Deduplicate by title + merchant
    const seen = new Map();
    const deduped = mapped.filter((p, index) => {
      const key = `${p.title.toLowerCase()}_${p.merchant.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.set(key, true);

      // Ensure unique ID for testing
      p.id = `awin_test_${Date.now()}_${index}`;
      return true;
    });

    console.log(`Upserting ${deduped.length} mock AWIN products into Supabase...`);

    // Upsert into Supabase
    const { data, error } = await supabaseAdmin
      .from("products")
      .upsert(deduped, { onConflict: ["id"] });

    if (error) {
      console.error("Upsert failed:", error);
    } else {
      console.log("Upsert succeeded. Rows inserted/updated:", data.length);
    }

    console.log("Mock AWIN sync complete!");
  } catch (err) {
    console.error("Sync script failed:", err);
  }
}

// Run the sync script
syncMockAwin();
