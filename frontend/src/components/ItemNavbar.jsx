import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../styles/Navbar.scss";

export default function ItemNavbar({ className, image, alt }) {
  return (
    <div>
      <Link to="/">
        <img className={className} src={image} alt={alt} />
      </Link>
    </div>
  );
}
