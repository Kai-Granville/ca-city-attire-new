import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";

export default function SimilarProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    const fetchSimilar = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("category", category)
          .neq("id", currentProductId)
          .limit(6);

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Similar products fetch failed:", err);
      }
    };

    fetchSimilar();
  }, [category, currentProductId]);

  if (!products.length) return <p>No similar products found.</p>;

  return (
    <div className="similar-products-container">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
