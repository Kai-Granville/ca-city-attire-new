import crypto from "crypto";
import { supabase } from "../../lib/supabase";

const CLICK_TTL_MS = 5000; // 5 seconds

const clickCache = new Map();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { id } = req.query;
  if (!id) return res.status(400).end();

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  const ua = req.headers["user-agent"] || "unknown";
  const key = crypto
    .createHash("sha256")
    .update(`${id}:${ip}:${ua}`)
    .digest("hex");

  const now = Date.now();
  const last = clickCache.get(key);

  if (last && now - last < CLICK_TTL_MS) {
    return res.redirect(302, "/"); // ignore duplicate
  }

  clickCache.set(key, now);

  try {
    // Get affiliate link
    const { data, error } = await supabase
      .from("products")
      .select("affiliate_link")
      .eq("id", id)
      .single();

    if (error || !data?.affiliate_link) {
      return res.status(404).end();
    }

    // Atomic increment
    await supabase.rpc("increment_click", { product_id: id });

    return res.redirect(302, data.affiliate_link);
  } catch (err) {
    console.error("Click error:", err);
    return res.status(500).end();
  }
}
