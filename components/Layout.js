import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      {/* Navbar */}
      <header style={{
        borderBottom: "1px solid #eee",
        padding: "1.5rem 2rem"
      }}>
        <nav style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Link href="/">
            <a style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              City Attire
            </a>
          </Link>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="#"><a>Suits</a></Link>
            <Link href="#"><a>Shirts</a></Link>
            <Link href="#"><a>Trousers</a></Link>
            <Link href="#"><a>Shoes</a></Link>
          </div>
        </nav>
      </header>

      {/* Page content */}
      {children}

      {/* Footer */}
      <footer style={{
        marginTop: "5rem",
        borderTop: "1px solid #eee",
        padding: "3rem 2rem",
        fontSize: "0.9rem",
        color: "#666"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p>© {new Date().getFullYear()} City Attire</p>

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <Link href="/about"><a>About</a></Link>
            <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
          </div>

          <p style={{ marginTop: "1.5rem", maxWidth: "600px" }}>
            City Attire may earn a commission from qualifying purchases made via affiliate links.
          </p>
        </div>
      </footer>
    </>
  );
}
