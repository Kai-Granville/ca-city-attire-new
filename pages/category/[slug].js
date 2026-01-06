import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [allColors, setAllColors] = useState([]);
  const [allMerchants, setAllMerchants] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [merchant, setMerchant] = useState("");
  const [type, setType] = useState("all");

  // Sync type when slug changes
  useEffect(() => {
    if (!slug) return;
    setType(slug);
    setPage(1);
  }, [slug]);

  const getPriceFilter = (range) => {
    if (!range) return {};
    const [min, max] = range.split("-").map(Number);
    return { minPrice: min, maxPrice: max || 100000 };
  };

  // Fetch products
  useEffect(() => {
    if (!slug) return;

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
      limit: 20,
    });

    fetch(`/api/products?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (page === 1) setProducts(data.products);
        else setProducts((prev) => [...prev, ...data.products]);

        setTotalPages(data.totalPages || 1);

        // Populate filter options dynamically
        const colors = Array.from(new Set(data.products.map(p => p.color).filter(Boolean)));
        const merchants = Array.from(new Set(data.products.map(p => p.merchant).filter(Boolean)));
        const types = Array.from(new Set(data.products.map(p => p.category).filter(Boolean)));

        setAllColors(colors);
        setAllMerchants(merchants);
        setAllTypes(types);
      });
  }, [slug, type, page, sort, search, color, priceRange, merchant, router.query.q]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages]);

  if (!slug) return null;

  const title = type === "all" ? "All Products" : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <main className="container">
      <section className="hero" style={{ padding: "3rem 2rem", marginBottom: "2rem" }}>
        <h1>{title}</h1>
        <p>Browse our collection of premium work clothes</p>
      </section>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="popular">Most Popular</option>
          <option value="new">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
          <option value="all">All Types</option>
          {allTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={color} onChange={(e) => { setColor(e.target.value); setPage(1); }}>
          <option value="">All Colours</option>
          {allColors.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={priceRange} onChange={(e) => { setPriceRange(e.target.value); setPage(1); }}>
          <option value="">All Prices</option>
          <option value="0-50">£0–50</option>
          <option value="50-100">£50–100</option>
          <option value="100-1000">£100+</option>
        </select>
        <select value={merchant} onChange={(e) => { setMerchant(e.target.value); setPage(1); }}>
          <option value="">All Merchants</option>
          {allMerchants.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Products */}
      <div className="product-grid">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
