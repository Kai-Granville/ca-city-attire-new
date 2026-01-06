import { useState } from "react";
import { useRouter } from "next/router";

const categories = ["all", "shirts", "suits", "trousers", "shoes", "accessories"];

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/category/all?q=${encodeURIComponent(query)}`);
  };

  // Determine active category from route
  const activeCategory = router.query.slug || "all";

  return (
    <header className="site-header">
      <div className="logo" onClick={() => router.push("/")}>
        City Attire
      </div>

      <nav className="category-nav">
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/category/${cat}`}
            className={activeCategory === cat ? "active" : ""}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </a>
        ))}
      </nav>

      <form onSubmit={handleSearch} className="header-search">
        <input
          type="text"
          placeholder="Search shirts, suits, trousers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
