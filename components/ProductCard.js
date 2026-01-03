import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>
      <div style={{ background: "#f6f6f6", padding: "1rem" }}>
        <img
          src={product.image_url || product.image}
          alt={product.name || product.title}
          style={{ width: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>

      <h3 style={{ fontSize: "1rem", fontWeight: 500 }}>
        {product.name || product.title}
      </h3>

      <p style={{ fontWeight: 600 }}>
        {product.price}
      </p>

      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        {product.brand || product.merchant}
      </p>

      <Link href={`/products/${product.id}`}>
        <a style={{
          marginTop: "0.5rem",
          padding: "0.6rem",
          textAlign: "center",
          border: "1px solid #000",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.05em"
        }}>
          View Details
        </a>
      </Link>
    </div>
  );
}
