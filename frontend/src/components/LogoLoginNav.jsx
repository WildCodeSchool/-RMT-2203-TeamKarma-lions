import React from "react";
import "../styles/Navbar.scss";

export default function LogoLoginNav({ className, image, alt }) {
  return (
    <div>
      <img className={className} src={image} alt={alt} />
    </div>
  );
}
