import { supabase } from "../../lib/supabase";
import mockProducts from "../../data/mockProducts";
import { fetchAwinProducts } from "../../lib/awin";
import { mapAwinToProduct } from "../../lib/awinMapper";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

  const pageNum = parseInt(page);
  const pageLimit = parseInt(limit);

  const USE_AWIN = process.env.USE_AWIN === "true";
  const USE_MOCK = process.env.USE_MOCK === "true";

  /* ------------------------------------------------------------------
     1️⃣ AWIN MODE (NO DB, SAFE TESTING)
  ------------------------------------------------------------------ */
  if (USE_AWIN) {
    try {
      const awinRaw = await fetchAwinProducts({
        q,
        limit: pageLimit,
      });

      let products = awinRaw.map(mapAwinToProduct);

      // Lightweight filtering (optional)
      if (category) products = products.filter(p => p.category === category);
      if (merchant) products = products.filter(p => p.merchant === merchant);
      if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
      if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));

      return res.status(200).json({
        products,
        totalPages: 1,
        page: 1,
      });
    } catch (err) {
      console.error("AWIN failed, falling back:", err);
    }
  }

  /* ------------------------------------------------------------------
     2️⃣ MOCK MODE
  ------------------------------------------------------------------ */
  if (USE_MOCK) {
    let products = [...mockProducts];

    if (category) products = products.filter(p => p.category === category);
    if (merchant) products = products.filter(p => p.merchant === merchant);
    if (color) products = products.filter(p => p.color === color);
    if (q) products = products.filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );
    if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
    if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));

    if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") products.sort((a, b) => b.price - a.price);

    const from = (pageNum - 1) * pageLimit;
    const to = from + pageLimit;

    return res.status(200).json({
      products: products.slice(from, to),
      totalPages: Math.ceil(products.length / pageLimit),
      page: pageNum,
    });
  }

  /* ------------------------------------------------------------------
     3️⃣ DEFAULT: SUPABASE (PRODUCTION PATH)
  ------------------------------------------------------------------ */
  try {
    let query = supabase
      .from("products")
      .select("*", { count: "exact" });

    if (category) query = query.eq("category", category);
    if (color) query = query.eq("color", color);
    if (merchant) query = query.eq("merchant", merchant);
    if (minPrice) query = query.gte("price", parseFloat(minPrice));
    if (maxPrice) query = query.lte("price", parseFloat(maxPrice));
    if (q) query = query.ilike("title", `%${q}%`);

    if (sort === "popular") query = query.order("clicks", { ascending: false });
    else if (sort === "new") query = query.order("created_at", { ascending: false });
    else if (sort === "price_asc") query = query.order("price", { ascending: true });
    else if (sort === "price_desc") query = query.order("price", { ascending: false });

    const from = (pageNum - 1) * pageLimit;
    const to = from + pageLimit - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      products: data,
      totalPages: Math.ceil((count || 0) / pageLimit),
      page: pageNum,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
