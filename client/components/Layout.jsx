import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";
export default function Layout() {
  return (
    <>
      <header>
        <div className="brand">
          <img src="src/assets/logo.png" alt="Logo" />
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

      {/*  <img src="src/assets/logo.png" alt="" width={99.5} height={61} /> {// 597 x 366 
      }
      <h1>My Portfolio</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/services">Services</Link>| <Link to="/project">Project</Link>|{" "}
        <Link to="/contact">Contact</Link>
      </nav>
      <br />
      <hr />
      <hr /> */}
    </>
  );
}
