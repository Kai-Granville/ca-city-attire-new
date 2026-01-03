import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products?id=${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem"
        }}
      >
        {/* Image */}
        <div style={{ background: "#f6f6f6", padding: "2rem" }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Info */}
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 500 }}>
            {product.name}
          </h1>

          <p style={{ color: "#666", marginTop: "0.5rem" }}>
            {product.brand}
          </p>

          <p style={{ fontSize: "1.5rem", margin: "1.5rem 0" }}>
            {product.price}
          </p>

          <a
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              background: "#000",
              color: "#fff",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              letterSpacing: "0.08em"
            }}
          >
            View on {product.merchant}
          </a>

          {/* Details */}
          <div style={{ marginTop: "3rem" }}>
            <h3>Product Details</h3>
            <p style={{ color: "#555", marginTop: "0.5rem" }}>
              {product.description || "Office-ready essential selected for fit, quality, and versatility."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function ProductPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     fetch("/api/products")
//       .then(res => res.json())
//       .then(products => {
//         const found = products.find(p => p.id === id);
//         setProduct(found);
//       });
//   }, [id]);

//   if (!product) {
//     return <p>Loading product...</p>;
//   }

//   return (
//     <main style={{ padding: "2rem" }}>
//       <img
//         src={product.image}
//         alt={product.title}
//         width="300"
//       />

//       <h1>{product.title}</h1>
//       <p>{product.price}</p>
//       <p>Sold by {product.merchant}</p>

//       <a
//         href={product.affiliateLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ display: "inline-block", marginTop: "1rem" }}
//       >
//         Buy from retailer
//       </a>
//     </main>
//   );
// }
