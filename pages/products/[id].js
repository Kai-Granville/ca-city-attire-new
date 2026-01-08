// pages/products/[id].js
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard";
import Head from "next/head";

// Swipe-friendly similar products component
function SimilarProducts({ products }) {
  const containerRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section style={{ marginTop: "4rem" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
        You may also like
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          style={{
            background: "#eee",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          ◀
        </button>

        {/* Scrollable product container */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "1rem",
            paddingBottom: "0.5rem",
            scrollSnapType: "x mandatory",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                minWidth: "180px",
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          style={{
            background: "#eee",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          ▶
        </button>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        // Fetch main product
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);

        // Fetch similar products (same category)
        const res = await fetch(
          `/api/products?category=${encodeURIComponent(data.category)}&sort=popular&limit=12`
        );
        const similarData = await res.json();

        let similar = similarData.products.filter((p) => p.id !== id);

        // Fallback: if less than 4, fill with popular products
        if (similar.length < 4) {
          const res2 = await fetch(`/api/products?sort=popular&limit=6`);
          const extra = (await res2.json()).products.filter((p) => p.id !== id);
          similar = [...similar, ...extra].slice(0, 6);
        }

        setSimilarProducts(similar);
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
            <p><strong>Merchant:</strong> {product.merchant}</p>
            {product.color && <p><strong>Color:</strong> {product.color}</p>}
            {product.category && <p><strong>Category:</strong> {product.category}</p>}

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

      {/* Similar products carousel */}
      <SimilarProducts products={similarProducts} />
    </main>
  );
}
