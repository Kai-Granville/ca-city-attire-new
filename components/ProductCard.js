// components/ProductCard.js
import React from "react";
import Link from "next/link";

export default function ProductCard({ product, compact }) {
  return (
    <Link href={`/products/${product.id}`}>
      <a
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: compact ? "0.5rem" : "1rem",
            textAlign: "center",
            backgroundColor: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
          }}
          className="product-card"
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: compact ? "100px" : "150px",
              objectFit: "cover",
              borderRadius: "6px",
              marginBottom: compact ? "0.25rem" : "0.5rem",
            }}
          />

          <h3
            style={{
              fontSize: compact ? "0.85rem" : "1rem",
              margin: compact ? "0.25rem 0" : "0.5rem 0 0.25rem",
              color: "#333",
              height: compact ? "2rem" : "2.5rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </h3>

          <p
            style={{
              fontSize: compact ? "0.75rem" : "0.9rem",
              color: "#333",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            £{Number(product.price).toFixed(2)}
          </p>

          {!compact && (
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                color: "#0070f3",
              }}
            >
              View Details →
            </p>
          )}
        </div>
      </a>
    </Link>
  );
}
