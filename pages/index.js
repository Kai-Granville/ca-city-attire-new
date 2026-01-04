import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      fetch(`/api/products?limit=20&q=${search}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setLoading(false);
        });
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <main className="container">
      <section className="hero">
        <h1>Office Attire for Professionals</h1>
        <p>
          Discover premium work clothes for men — shirts, suits, pants, and
          accessories
        </p>
      </section>

      {/* Search */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search workwear..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <section className="product-grid-section">
        <h2>{search ? "Search Results" : "Featured Products"}</h2>

        {loading && <p>Loading...</p>}

        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!loading && products.length === 0 && (
          <p>No products found.</p>
        )}
      </section>
    </main>
  );
}
