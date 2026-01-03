import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    // Fetch products for this category, limit 20
    fetch(`/api/products?category=${slug}&limit=20`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [slug]);

  if (!products) return <p>Loading...</p>;

  return (
    <main className="container">
      <section className="hero">
        <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
      </section>

      <section className="product-grid-section">
        <h2>{slug.charAt(0).toUpperCase() + slug.slice(1)} Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
