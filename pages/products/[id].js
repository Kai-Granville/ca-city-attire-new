import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
import Head from "next/head";
import SimilarProducts from "../../components/SimilarProducts";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(
            `
            *,
            product_images (
              image_url,
              position
            )
          `
          )
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct(data);

        const galleryImages =
          data.product_images?.length > 0
            ? data.product_images
                .sort((a, b) => a.position - b.position)
                .map(i => i.image_url)
            : [data.image];

        setImages(galleryImages);
        setActiveIndex(0);
        setLoading(false);

        await supabase.rpc("increment_click", { product_id: id });
      } catch (err) {
        console.error(err);
        setError("Product not found.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const nextImage = () =>
    setActiveIndex(i => (i + 1) % images.length);

  const prevImage = () =>
    setActiveIndex(i => (i - 1 + images.length) % images.length);

  /* ---------- Mobile Swipe ---------- */
  const onTouchStart = e => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = e => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) nextImage();
    if (delta < -50) prevImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error || !product) return <p style={{ padding: "2rem" }}>{error}</p>;

  return (
    <main className="container">
      <Head>
        <title>{product.title} | City Attire</title>
      </Head>

      {/* PRODUCT DETAIL */}
      <section className="product-detail">
        <div className="product-detail-grid">
          {/* IMAGE GALLERY */}
          <div
            className="product-gallery"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[activeIndex]}
              alt={product.title}
              className="product-gallery-main zoomable"
              onClick={() => setIsModalOpen(true)}
            />

            {images.length > 1 && (
              <>
                <button className="gallery-arrow left" onClick={prevImage}>
                  ◀
                </button>
                <button className="gallery-arrow right" onClick={nextImage}>
                  ▶
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`gallery-thumb ${
                      i === activeIndex ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="price">£{Number(product.price).toFixed(2)}</p>

            <p><strong>Merchant:</strong> {product.merchant}</p>
            {product.color && <p><strong>Color:</strong> {product.color}</p>}
            {product.category && <p><strong>Category:</strong> {product.category}</p>}

            <a
              href={`/api/click?id=${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-now-btn"
            >
              Buy Now
            </a>
          </div>
        </div>
      </section>

      {/* SIMILAR PRODUCTS (RESTORED + CLEAR) */}
      <section style={{ marginTop: "4rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Similar Products</h2>
        <SimilarProducts
          category={product.category}
          currentProductId={product.id}
        />
      </section>

      {/* FULLSCREEN MODAL */}
      {isModalOpen && (
        <div className="image-modal" onClick={() => setIsModalOpen(false)}>
          <img src={images[activeIndex]} alt="" />
        </div>
      )}
    </main>
  );
}
