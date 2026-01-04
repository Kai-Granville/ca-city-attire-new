import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    id,
    category,
    limit = 20,
    page = 1,
    sort = "popular",
    q
  } = req.query;

  // ✅ SINGLE PRODUCT (early return)
  if (id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const from = (pageNum - 1) * limitNum;
  const to = from + limitNum - 1;

  // Sorting logic
  let orderBy = "clicks";
  let ascending = false;

  if (sort === "new") {
    orderBy = "created_at";
    ascending = false;
  }

  if (sort === "price_asc") {
    orderBy = "price";
    ascending = true;
  }

  if (sort === "price_desc") {
    orderBy = "price";
    ascending = false;
  }

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order(orderBy, { ascending })
    .range(from, to);

  if (category) {
    query = query.ilike("category", category);
  }

  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({
    products: data,
    page: pageNum,
    totalPages: Math.ceil(count / limitNum),
    total: count
  });
}
