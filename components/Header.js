import { useState } from "react";
import { useRouter } from "next/router";

const categories = ["Shirts", "Suits", "Trousers", "Shoes", "Accessories"];

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const currentCategory = router.query.slug
    ? router.query.slug.toLowerCase()
    : "";

  const handleSearch = e => {
    e.preventDefault();
    if (!query) return;
    router.push(`/category/all?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = cat => {
    router.push(`/category/${cat.toLowerCase()}`);
  };

  return (
    <header className="site-header">
      <div className="logo" onClick={() => router.push("/")}>
        City Attire
      </div>

      <form onSubmit={handleSearch} className="header-search">
        <input
          type="text"
          placeholder="Search shirts, suits, trousers..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <nav className="category-nav">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${
              currentCategory === cat.toLowerCase() ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}
