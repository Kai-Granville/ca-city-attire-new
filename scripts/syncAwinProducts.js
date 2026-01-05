import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { mapAwinToProduct } from "../lib/awinMapper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncMockAwin() {
  console.log("Starting mock AWIN sync...");

  const filePath = path.join(process.cwd(), "data/mockAwinProducts.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const awinRaw = JSON.parse(raw);

  const mapped = awinRaw.map(mapAwinToProduct);

  // Deduplicate
  const seen = new Map();
  const deduped = mapped.filter(p => {
    const key = `${p.title.toLowerCase()}_${p.merchant.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.set(key, true);
    return true;
  });

  console.log(`Upserting ${deduped.length} mock AWIN products into Supabase...`);

  const { error } = await supabase
    .from("products")
    .upsert(deduped, { onConflict: ["id"] });

  if (error) throw error;

  console.log("Mock AWIN sync complete!");
}

syncMockAwin();
