import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <main style={{ padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Hero */}
      <section style={{ marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 500 }}>
          Modern Workwear for the City Professional
        </h1>
        <p style={{ maxWidth: "600px", marginTop: "1rem", color: "#555" }}>
          City Attire curates sharp, office-ready essentials from trusted menswear brands — so you can dress well without overthinking it.
        </p>
      </section>

      {/* Product grid */}
      <section>
        <h2 style={{ marginBottom: "1.5rem", fontWeight: 500 }}>
          Editor’s Picks
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "2rem"
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </main>
  );
}
