import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing product ID" });
  }

  try {
    // Fetch the product to get the affiliate link
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Optional: log the click by updating a counter
    await supabase
      .from("products")
      .update({ clicks: (product.clicks || 0) + 1 })
      .eq("id", id);

    // Redirect to the affiliate URL
    res.writeHead(302, { Location: product.affiliate_link || "#" });
    res.end();
  } catch (err) {
    console.error("Click tracking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
