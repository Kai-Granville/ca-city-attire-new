import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/products?category=${slug}&page=${page}&limit=20`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });
  }, [slug, page]);

  if (!slug) return null;

  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="container">
      <section className="hero">
        <h1>{title}</h1>
      </section>

      <section className="product-grid-section">
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
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
