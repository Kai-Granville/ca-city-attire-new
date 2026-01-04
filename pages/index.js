import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products?limit=10")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (!query) return;
    router.push(`/category/all?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="container">
      <section className="hero">
        <h1>City Attire</h1>
        <p>
          Premium workwear for men — shirts, suits, trousers and accessories
        </p>

        {/* Homepage Search */}
        <form onSubmit={handleSearch} className="hero-search">
          <input
            type="text"
            placeholder="Search shirts, suits, trousers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

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
