// components/SimilarProducts.js
import ProductCard from "./ProductCard";
import { useState } from "react";

export default function SimilarProducts({ products }) {
  const [start, setStart] = useState(0);
  const visibleCount = 4; // number of products to show in carousel

  const end = start + visibleCount;
  const visibleProducts = products.slice(start, end);

  const handlePrev = () => {
    setStart(Math.max(start - visibleCount, 0));
  };

  const handleNext = () => {
    setStart(Math.min(start + visibleCount, products.length - visibleCount));
  };

  if (!products || products.length === 0) return null;

  return (
    <section style={{ marginTop: "4rem" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>You may also like</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={handlePrev}
          disabled={start === 0}
          style={{
            background: "#eee",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: start === 0 ? "not-allowed" : "pointer",
          }}
        >
          ◀
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${visibleProducts.length}, 1fr)`,
            gap: "1rem",
            flex: 1,
          }}
        >
          {visibleProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={end >= products.length}
          style={{
            background: "#eee",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: end >= products.length ? "not-allowed" : "pointer",
          }}
        >
          ▶
        </button>
      </div>
    </section>
  );
}
