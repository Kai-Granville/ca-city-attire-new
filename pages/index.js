import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products?limit=10&sort=popular")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (!search) return;
    window.location.href = `/category/all?q=${encodeURIComponent(search)}`;
  };

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1>City Attire</h1>
        <p>Discover premium work clothes for men — shirts, suits, trousers, and accessories</p>

        {/* Search Bar */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
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
