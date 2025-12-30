import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch("/api/products")
      .then(res => res.json())
      .then(products => {
        const found = products.find(p => p.id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <img
        src={product.image}
        alt={product.title}
        width="300"
      />

      <h1>{product.title}</h1>
      <p>{product.price}</p>
      <p>Sold by {product.merchant}</p>

      <a
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: "1rem" }}
      >
        Buy from retailer
      </a>
    </main>
  );
}
