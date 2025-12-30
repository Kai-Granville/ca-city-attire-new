import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem" }}>
      <img
        src={product.image}
        alt={product.title}
        width="200"
        loading="lazy"
      />

      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Sold by {product.merchant}
      </p>

      <Link href={`/products/${product.id}`}>
        View details
      </Link>
    </div>
  );
}
