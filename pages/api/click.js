import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing product id" });
  }

  try {
    // Fetch current clicks + affiliate link
    const { data, error } = await supabase
      .from("products")
      .select("id, clicks, affiliate_link")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Increment clicks safely
    await supabase
      .from("products")
      .update({ clicks: (data.clicks || 0) + 1 })
      .eq("id", id);

    // Redirect to affiliate link
    if (!data.affiliate_link) {
      return res.status(400).json({ error: "Missing affiliate link" });
    }

    return res.redirect(data.affiliate_link);
  } catch (err) {
    console.error("Click handler error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
