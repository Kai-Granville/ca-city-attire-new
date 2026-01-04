import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?limit=10&sort=popular")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero hero-home">
        <h1>City Attire</h1>
        <p>Discover premium work clothes for men — shirts, suits, trousers, and accessories</p>
      </section>

      {/* Top Picks */}
      <section className="product-grid-section">
        <h2>Top Picks</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
