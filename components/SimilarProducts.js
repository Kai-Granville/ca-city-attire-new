// components/SimilarProducts.js
import ProductCard from "./ProductCard";
import { useRef } from "react";

export default function SimilarProducts({ products }) {
  const containerRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        You may also like
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <button
          onClick={scrollLeft}
          style={{
            background: "#eee",
            border: "none",
            padding: "0.25rem 0.5rem",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          ◀
        </button>

        <div
          ref={containerRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "0.5rem",
            paddingBottom: "0.25rem",
            scrollSnapType: "x mandatory",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                minWidth: "140px",
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          style={{
            background: "#eee",
            border: "none",
            padding: "0.25rem 0.5rem",
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
