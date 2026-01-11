import React from "react";
import Link from "next/link";

export default function ProductCard({ product, compact, homepage }) {
  return (
    <div className={`product-card ${compact ? "compact" : ""}`}>
      {/* IMAGE */}
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          style={{ height: compact ? "120px" : "150px" }}
        />
      </div>

      {/* TITLE */}
      <h3
        className="product-title"
        style={{ fontSize: compact ? "0.85rem" : "1rem" }}
      >
        {product.title}
      </h3>

      {/* PRICE */}
      <p className="price" style={{ fontSize: compact ? "0.75rem" : "0.9rem" }}>
        £{Number(product.price).toFixed(2)}
      </p>

      {/* VIEW DETAILS LINK */}
      {(homepage || !compact) && (
        <Link href={`/products/${product.id}`}>
          <a className={`view-details-link ${homepage ? "homepage-link" : ""}`}>
            View Details →
          </a>
        </Link>
      )}
    </div>
  );
}
