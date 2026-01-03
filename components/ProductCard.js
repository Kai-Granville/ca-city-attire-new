import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      {/* Image */}
      <div className="card-image">
        <img
          src={product.image_url || product.image}
          alt={product.name || product.title}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <h3>{product.name || product.title}</h3>
      <p className="price">{product.price}</p>
      <p className="brand">{product.brand || product.merchant}</p>

      {/* CTA */}
      <Link href={`/products/${product.id}`}>
        <a className="btn">View Details</a>
      </Link>
    </div>
  );
}
