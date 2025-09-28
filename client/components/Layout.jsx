import { Link } from "react-router-dom";
import "./layout.css";
export default function Layout() {
  return (
    <>
      <header>
        <div className="brand">
          <img src="/assets/logo.png" alt="Logo" />
          <h1>My Portfolio</h1>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/project">Project</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}
