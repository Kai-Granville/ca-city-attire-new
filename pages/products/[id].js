import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
import SimilarProducts from "../../components/SimilarProducts";
import Head from "next/head";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          product_images (
            image_url,
            position
          )
        `)
        .eq("id", id)
        .single();

      if (error) return;

      const imgs = (data.product_images || [])
        .sort((a, b) => a.position - b.position)
        .map(i => i.image_url);

      setProduct(data);
      setImages(imgs);
      setActiveImage(imgs[0] || data.image);

      // similar products
      const res = await fetch(
        `/api/products?category=${data.category}&limit=8`
      );
      const json = await res.json();
      setSimilarProducts(json.products.filter(p => p.id !== id));
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <main className="container">
      <Head>
        <title>{product.title}</title>
      </Head>

      <div className="product-detail-grid">
        {/* IMAGE GALLERY */}
        <div>
          <img
            src={activeImage}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: "8px",
              marginBottom: "0.5rem",
            }}
          />

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      img === activeImage
                        ? "2px solid black"
                        : "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <h1>{product.title}</h1>
          <p>£{product.price}</p>

          <a
            href={`/api/click?id=${product.id}`}
            className="buy-now-btn"
            target="_blank"
          >
            Buy Now
          </a>
        </div>
      </div>

      <SimilarProducts products={similarProducts} />
    </main>
  );
}
