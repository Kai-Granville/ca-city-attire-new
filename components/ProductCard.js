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

      {/* VIEW DETAILS - plain black text */}
      {!compact && (
        <Link href={`/products/${product.id}`}>
          <a style={{ color: "#000", fontSize: "0.85rem" }}>View Details →</a>
        </Link>
      )}

      <style jsx>{`
        .product-card {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: ${compact ? "0.5rem" : "1rem"};
          text-align: center;
          background-color: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .product-card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        .product-image-wrapper {
          overflow: hidden;
          border-radius: 6px;
        }

        .product-image {
          width: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-title {
          color: #333;
          height: ${compact ? "2rem" : "2.5rem"};
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .price {
          color: #333;
          font-weight: bold;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
