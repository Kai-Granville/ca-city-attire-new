import React from "react";
import Link from "next/link";

export default function ProductCard({ product, compact }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          style={{ height: compact ? "100px" : "150px" }}
        />
      </div>

      <h3 className="product-title" style={{ fontSize: compact ? "0.85rem" : "1rem" }}>
        {product.title}
      </h3>

      <p className="price" style={{ fontSize: compact ? "0.75rem" : "0.9rem" }}>
        £{Number(product.price).toFixed(2)}
      </p>

      {/* VIEW DETAILS - subtle link */}
      {!compact && (
        <Link href={`/products/${product.id}`}>
          <a className="view-details-link">View Details →</a>
        </Link>
      )}
    </div>
  );
}
