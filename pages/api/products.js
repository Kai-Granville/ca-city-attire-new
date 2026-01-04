import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      category,
      minPrice,
      maxPrice,
      color,
      merchant,
      sort,
      q,
      page = 1,
      limit = 20,
    } = req.query;

    let query = supabase.from("products").select("*");

    // Category / Type filter
    if (category) query = query.eq("category", category);

    // Price filter
    if (minPrice) query = query.gte("price", parseFloat(minPrice));
    if (maxPrice) query = query.lte("price", parseFloat(maxPrice));

    // Colour filter
    if (color) query = query.eq("color", color);

    // Merchant filter
    if (merchant) query = query.eq("merchant", merchant);

    // Search
    if (q) query = query.ilike("title", `%${q}%`);

    // Sorting
    if (sort === "popular") query = query.order("clicks", { ascending: false });
    else if (sort === "new") query = query.order("created_at", { ascending: false });
    else if (sort === "price_asc") query = query.order("price", { ascending: true });
    else if (sort === "price_desc") query = query.order("price", { ascending: false });

    // Pagination
    const pageNum = parseInt(page);
    const pageLimit = parseInt(limit);
    const from = (pageNum - 1) * pageLimit;
    const to = pageNum * pageLimit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    const totalPages = Math.ceil((count || 0) / pageLimit);

    res.status(200).json({
      products: data,
      totalPages,
      page: pageNum,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}
