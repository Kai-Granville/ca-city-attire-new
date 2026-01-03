import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      {/* Image */}
      <div className="card-image">
        <img
          src={product.image || product.image_url}
          alt={product.title || product.name}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <h3>{product.title || product.name}</h3>
      <p className="price">{product.price}</p>
      <p className="brand">{product.merchant || product.brand}</p>

      {/* CTA: click tracking */}
      <Link href={`/api/click?id=${product.id}`}>
        <a className="btn">View on {product.merchant || product.brand}</a>
      </Link>
    </div>
  );
}
