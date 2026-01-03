import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/products?category=${slug}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [slug]);

  return (
    <>
      <h1 className="category-title">{slug}</h1>
      <p className="category-desc">
        Curated {slug} selected for modern office wear.
      </p>

      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
