import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <h3>{product.title}</h3>
      <p className="price">£{product.price}</p>

      <Link href={`/products/${product.id}`} className="btn">
        View details
      </Link>
    </div>
  );
}
