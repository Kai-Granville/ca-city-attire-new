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
          className="product-card"
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: compact ? "0.5rem" : "1rem",
            textAlign: "center",
            backgroundColor: "#fff",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: "6px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: compact ? "100px" : "150px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              className="product-image"
            />
          </div>

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
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                color: "#000", // black
                fontWeight: "bold",
              }}
            >
              View Details →
            </div>
          )}
        </div>

        <style jsx>{`
          .product-card:hover {
            transform: scale(1.03);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }

          .product-card:hover .product-image {
            transform: scale(1.05);
          }
        `}</style>
      </a>
    </Link>
  );
}
