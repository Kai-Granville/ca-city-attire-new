import Link from "next/link";

const categories = ["Shirts", "Suits", "Pants", "Shoes", "Accessories"];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">City Attire</Link>
      </div>
      <div className="nav-links">
        {categories.map(cat => (
          <Link key={cat} href={`/category/${cat.toLowerCase()}`}>
            <a className="nav-btn">{cat}</a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
