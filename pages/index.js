import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <main>
      <h1>Our Products</h1>

      {products.map(p => (
        <div key={p.id}>
          <img src={p.image} alt={p.title} width="200" />
          <h2>{p.title}</h2>
          <p>{p.price}</p>
          <a href={p.link} target="_blank" rel="noopener noreferrer">
            View product
          </a>
        </div>
      ))}
    </main>
  );
}
