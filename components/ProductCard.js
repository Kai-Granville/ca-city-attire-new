import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div style={{ position: "relative" }}>
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.clicks >= 5 && (   /* Featured threshold */
          <span className="badge">Featured</span>
        )}
      </div>

      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Sold by {product.merchant}
      </p>

      <Link href={`/products/${product.id}`}>
        <a className="btn">View details</a>
      </Link>
    </div>
  );
}
