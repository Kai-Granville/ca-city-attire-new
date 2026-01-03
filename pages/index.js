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
      <section className="hero">
        <h1>Modern Workwear for the City Professional</h1>
        <p>
          City Attire curates sharp, office-ready essentials from trusted menswear brands — so you can dress well without overthinking it.
        </p>
      </section>

      {/* Editor's Picks */}
      <section>
        <h2>Editor's Picks</h2>
        <div className="grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
