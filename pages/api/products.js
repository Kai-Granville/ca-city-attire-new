import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, category, limit = 20, page = 1 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const from = (pageNum - 1) * limitNum;
  const to = from + limitNum - 1;

  try {
    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("clicks", { ascending: false })
      .range(from, to);

    if (id) {
      query = supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
    }

    if (category) {
      query = query.ilike("category", category);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      products: data,
      total: count,
      page: pageNum,
      totalPages: Math.ceil(count / limitNum),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unexpected error" });
  }
}
