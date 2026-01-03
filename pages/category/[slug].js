import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/products?category=${slug}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [slug]);

  return (
    <main style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textTransform: "capitalize", fontWeight: 500 }}>
        {slug}
      </h1>

      <p style={{ margin: "1rem 0 2rem", color: "#555" }}>
        Curated {slug} selected for modern office wear.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "2rem"
        }}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
