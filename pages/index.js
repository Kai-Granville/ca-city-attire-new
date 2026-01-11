import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [topPicks, setTopPicks] = useState([]);
  const [secondSection, setSecondSection] = useState([]);

  useEffect(() => {
    // Fetch top 10 products by clicks
    fetch("/api/products?limit=10&sort=popular")
      .then((res) => res.json())
      .then((data) => setTopPicks(data.products));

    // Optional: second section e.g., trending or under £100
    fetch("/api/products?limit=8&sort=trending")
      .then((res) => res.json())
      .then((data) => setSecondSection(data.products));
  }, []);

  return (
    <main className="container">
      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>City Attire</h1>
        <p>Premium workwear for men — shirts, suits, trousers, and accessories</p>
        <p className="hero-subline">
          Curated menswear from trusted brands. Updated daily. No sponsored placements.
        </p>
        <a href="/category/all?sort=popular" className="hero-cta">
          Shop Best Sellers →
        </a>
      </section>

      {/* ================= CATEGORY TILES ================= */}
      <section className="category-tiles">
        {["Shirts", "Suits", "Trousers", "Shoes", "Accessories"].map((cat) => (
          <a
            key={cat}
            href={`/category/${cat.toLowerCase()}`}
            className="category-tile"
          >
            {cat}
          </a>
        ))}
      </section>

      {/* ================= TOP PICKS ================= */}
      <section className="section-alt">
        <span className="section-label">Editor’s Picks</span>
        <h2>Top Picks This Week</h2>
        <p className="section-subline">Most clicked workwear right now</p>
        <div className="product-grid">
          {topPicks.map((p) => (
            <ProductCard key={p.id} product={p} compact homepage />
          ))}
        </div>
      </section>

      {/* ================= BRAND STATEMENT ================= */}
      <section className="curation-block">
        <h3>Why City Attire</h3>
        <p>
          We filter thousands of menswear products to surface pieces that actually make
          sense for work, weather, and real life.
        </p>
      </section>

      {/* ================= SECOND PRODUCT SECTION ================= */}
      <section className="section-alt">
        <span className="section-label">Trending</span>
        <h2>Trending Right Now</h2>
        <p className="section-subline">Products our visitors are loving this week</p>
        <div className="product-grid">
          {secondSection.map((p) => (
            <ProductCard key={p.id} product={p} compact homepage />
          ))}
        </div>
      </section>
    </main>
  );
}
