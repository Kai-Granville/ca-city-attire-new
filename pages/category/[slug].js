import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!slug) return;

    // If slug = "all", do not filter by category
    const categoryParam = slug === "all" ? "" : `category=${slug}&`;

    fetch(
      `/api/products?${categoryParam}page=${page}&limit=20&sort=${sort}&q=${encodeURIComponent(search)}`
    )
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });
  }, [slug, page, sort, search]);

  if (!slug) return null;

  const title = slug === "all" ? "All Products" : slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="container">
      {/* Hero / Title */}
      <section className="hero">
        <h1>{title}</h1>
      </section>

      {/* Filters: search + sort */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page on search
          }}
        />

        <select
          value={sort}
          onChange={e => {
            setSort(e.target.value);
            setPage(1); // Reset to first page on sort
          }}
        >
          <option value="popular">Most Popular</option>
          <option value="new">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <section className="product-grid-section">
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            ← Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}
