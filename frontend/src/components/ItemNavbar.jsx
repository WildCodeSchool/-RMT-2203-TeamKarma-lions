import React from "react";
import "../styles/Navbar.scss";

export default function ItemNavbar({ className, image, alt }) {
  return (
    <div>
      <div className="ongletContainer">{/* <h3>{alt}</h3> */}</div>
      <img className={className} src={image} alt={alt} />
    </div>
  );
}
