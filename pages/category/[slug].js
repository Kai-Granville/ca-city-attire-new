import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [merchant, setMerchant] = useState("");
  const [type, setType] = useState(slug);

  const getPriceFilter = range => {
    if (!range) return {};
    const [min, max] = range.split("-").map(Number);
    return { minPrice: min, maxPrice: max || 100000 };
  };

  useEffect(() => {
    if (!slug) return;

    const categoryParam = type === "all" ? "" : `category=${type}&`;
    const { minPrice, maxPrice } = getPriceFilter(priceRange);

    const queryParams = new URLSearchParams({
      category: type !== "all" ? type : "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      color: color || "",
      merchant: merchant || "",
      sort,
      q: search || router.query.q || "",
      page,
      limit: 20
    });

    fetch(`/api/products?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages || 1);
      });
  }, [slug, type, page, sort, search, color, priceRange, merchant, router.query.q]);

  if (!slug) return null;

  const title = type === "all" ? "All Products" : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <main className="container">
      <section className="hero">
        <h1>{title}</h1>
      </section>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />

        <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
          <option value="popular">Most Popular</option>
          <option value="new">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>

        <select value={color} onChange={e => { setColor(e.target.value); setPage(1); }}>
          <option value="">All Colours</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
          <option value="Grey">Grey</option>
        </select>

        <select value={priceRange} onChange={e => { setPriceRange(e.target.value); setPage(1); }}>
          <option value="">All Prices</option>
          <option value="0-50">£0–50</option>
          <option value="50-100">£50–100</option>
          <option value="100-1000">£100+</option>
        </select>

        <select value={merchant} onChange={e => { setMerchant(e.target.value); setPage(1); }}>
          <option value="">All Merchants</option>
          <option value="Example Store">Example Store</option>
          <option value="Tech Shop">Tech Shop</option>
          <option value="Audio Zone">Audio Zone</option>
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
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      </section>
    </main>
  );
}
