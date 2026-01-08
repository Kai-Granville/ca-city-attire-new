// components/SimilarProducts.js
import ProductCard from "./ProductCard";
import { useRef } from "react";

export default function SimilarProducts({ products }) {
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
