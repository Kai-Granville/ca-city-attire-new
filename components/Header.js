import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const categories = ["shirts", "suits", "trousers", "shoes", "accessories"];

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/category/all?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const activeCategory = router.query.slug;

  return (
    <header className="site-header">
      <div className="logo" onClick={() => router.push("/")}>
        City Attire
      </div>

      <nav className="category-nav">
        {categories.map((cat) => (
          <Link key={cat} href={`/category/${cat}`}>
            <a className={activeCategory === cat ? "active" : ""}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </a>
          </Link>
        ))}
      </nav>

      <form onSubmit={handleSearch} className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
