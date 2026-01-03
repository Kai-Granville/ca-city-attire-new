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
    <>
      {/* Hero */}
      <section style={{ marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 500 }}>
          Modern Workwear for the City Professional
        </h1>
        <p style={{ maxWidth: "600px", marginTop: "1rem", color: "#555" }}>
          City Attire curates sharp, office-ready essentials from trusted menswear brands — so you can dress well without overthinking it.
        </p>
      </section>

      {/* Editor's Picks */}
      <section>
        <h2 style={{ marginBottom: "1.5rem", fontWeight: 500 }}>Editor's Picks</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
