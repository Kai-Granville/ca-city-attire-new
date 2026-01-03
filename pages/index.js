import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

const categories = ["Shirts", "Suits", "Pants", "Accessories", "Shoes"];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Office Attire for Professionals</h1>
        <p>Discover premium work clothes for men — shirts, suits, pants, and accessories</p>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          {categories.map(cat => (
            <Link key={cat} href={`/category/${cat.toLowerCase()}`}>
              <a className="category-btn">{cat}</a>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Grid */}
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
