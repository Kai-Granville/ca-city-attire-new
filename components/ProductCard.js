import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {product.merchant && <p className="merchant">{product.merchant}</p>}
        {product.category && <p className="category">{product.category}</p>}

        <p className="price">£{Number(product.price).toFixed(2)}</p>

        <Link href={`/products/${product.id}`}>
          <a className="btn-view-details">View details</a>
        </Link>
      </div>
    </div>
  );
}
