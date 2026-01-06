import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {children}
      </main>

      <footer style={{
        marginTop: "4rem",
        borderTop: "1px solid #eee",
        padding: "2rem 1rem",
        fontSize: "0.85rem",
        color: "#666"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p>© {new Date().getFullYear()} City Attire</p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <a href="/about">About</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
          <p style={{ marginTop: "1.5rem", maxWidth: "600px" }}>
            City Attire may earn a commission from qualifying purchases made via affiliate links.
          </p>
        </div>
      </footer>
    </>
  );
}
