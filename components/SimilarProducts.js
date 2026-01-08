// components/SimilarProducts.js
import ProductCard from "./ProductCard";
import { useRef } from "react";

// Compact carousel with smaller cards and fonts
export default function SimilarProducts({ products }) {
  const containerRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section style={{ marginTop: "1.5rem" }}>
      <h2 style={{ fontSize: "1.3rem", marginBottom: "0.75rem" }}>
        You may also like
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {/* Left arrow */}
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

        {/* Scrollable container */}
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
                minWidth: "130px", // smaller card
              }}
            >
              <ProductCard
                product={p}
                compact // pass a flag to shrink inside ProductCard
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
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
