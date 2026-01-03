import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div style={{ position: "relative" }}>
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.clicks >= 5 && <span className="badge">Featured</span>}
      </div>

      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>Sold by {product.merchant}</p>

      {/* Internal details page */}
      <Link href={`/products/${product.id}`}>
        <a className="btn">View details</a>
      </Link>

      {/* Affiliate click, increments clicks safely */}
      <a
        href={`/api/click?id=${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{ marginTop: "0.5rem", display: "inline-block" }}
      >
        Buy Now
      </a>
    </div>
  );
}
