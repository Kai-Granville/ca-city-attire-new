import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ maxWidth: "400px" }} />
      <p>{product.price}</p>
      <p>Sold by {product.merchant}</p>

      <a
        href={`/api/click?id=${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Buy Now
      </a>
    </main>
  );
}
