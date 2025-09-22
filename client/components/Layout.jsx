import React from "react";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <img src="src/assets/logo.png" alt="" width={99.5} height={61} /> {/* 597 x 366 */}
      <h1>My Portfolio</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
        <Link to="/education">Education</Link>| <Link to="/project">Project</Link>|{" "}
        <Link to="/contact">Contact</Link>
      </nav>
      <br />
      <hr />
    </>
  );
}
