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
      <section className="hero" style={{ background: "#f4f4f4", borderRadius: "20px", padding: "5rem 2rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>City Attire</h1>
        <p style={{ fontSize: "1.3rem", color: "#555", maxWidth: "700px", margin: "0 auto 2rem" }}>
          Discover premium work clothes for men — shirts, suits, trousers, and accessories
        </p>

        {/* Search Bar */}
        <form className="header-search" onSubmit={handleSearch} style={{ maxWidth: "600px", margin: "0 auto" }}>
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
      <section className="product-grid-section" style={{ marginTop: "3rem" }}>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.8rem" }}>Top Picks</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
