// pages/products/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
import Head from "next/head";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Product not found.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error || !product) return <p style={{ padding: "2rem" }}>{error}</p>;

  return (
    <main className="container">
      <section className="product-detail">
        <Head>
          <title>{product.title} | City Attire</title>
        </Head>

        <div className="product-detail-grid">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="price">£{Number(product.price).toFixed(2)}</p>

            <a
              href={`/api/click?id=${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-now-btn"
            >
              Buy Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
