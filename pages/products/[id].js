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
    <main className="container">
      <div className="product-detail">
        <img
          src={product.image}
          alt={product.title}
        />

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">£{product.price}</p>
          <p className="merchant">Sold by {product.merchant}</p>

          <a
            href={`/api/click?id=${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Buy now
          </a>
        </div>
      </div>
    </main>
  );
}
