import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products?id=${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-page">
      <div className="product-grid">
        {/* Image */}
        <div className="product-image">
          <img src={product.image_url} alt={product.name} />
        </div>

        {/* Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="price">{product.price}</p>

          <a
            href={product.affiliate_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View on {product.merchant || "Merchant"}
          </a>

          <div className="details">
            <h3>Product Details</h3>
            <p>{product.description || "Office-ready essential selected for fit, quality, and versatility."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
