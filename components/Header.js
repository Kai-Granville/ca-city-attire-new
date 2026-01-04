import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    if (!query) return;
    router.push(`/category/all?q=${encodeURIComponent(query)}`);
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
    </header>
  );
}
