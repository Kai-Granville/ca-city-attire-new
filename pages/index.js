import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabase";
import mockProducts from "../data/mockProducts";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

      if (USE_MOCK) {
        // Sort mock data by clicks descending and take top 10
        const top = [...mockProducts]
          .sort((a, b) => b.clicks - a.clicks)
          .slice(0, 10);
        setProducts(top);
      } else {
        // Supabase: top 10 by clicks
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("clicks", { ascending: false })
          .limit(10);

        if (error) {
          console.error("Supabase error:", error);
          setProducts([]);
        } else {
          setProducts(data || []);
        }
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <h1>City Attire</h1>
        <p>Discover our most popular work clothing</p>
      </section>

      <section className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
