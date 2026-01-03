import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch top 20 products by clicks
    fetch("/api/products?limit=20")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Office Attire for Professionals</h1>
        <p>
          Discover premium work clothes for men — shirts, suits, pants, and accessories
        </p>
      </section>

      {/* Featured Products */}
      <section className="product-grid-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
