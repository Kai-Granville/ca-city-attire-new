import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const categories = ["all", "shirts", "suits", "trousers", "shoes", "accessories"];

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/category/all?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const activeCategory = router.query.slug || "all";

  return (
    <header className="site-header">
      <div className="header-left">
        <div className="logo" onClick={() => router.push("/")}>
          City Attire
        </div>
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

      <div className="header-right">
        <form onSubmit={handleSearch} className="header-search">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat}`}>
              <a
                className={activeCategory === cat ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </a>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
