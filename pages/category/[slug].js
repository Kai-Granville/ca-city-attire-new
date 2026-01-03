import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query; // undefined on first render
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    // Fetch products for this category
    fetch(`/api/products?category=${slug}&limit=20`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [slug]);

  if (!slug) return null; // Wait for slug to exist
  if (!products) return <p>Loading...</p>;

  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="container">
      <section className="hero">
        <h1>{title}</h1>
      </section>

      <section className="product-grid-section">
        <h2>{title} Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
