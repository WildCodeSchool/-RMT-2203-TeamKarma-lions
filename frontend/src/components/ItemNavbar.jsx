import React, { useState } from "react";
import "../styles/Navbar.scss";

export default function ItemNavbar({ image, alt, isActive }) {
  const [active, setActive] = useState({ isActive });
  const handleActive = () => {
    setActive(!active);
    // ajout d'une classe active quand on passe la souris sur l'élément
  };
  return (
    <div className={active ? "isActive" : "notActive"}>
      <img
        onMouseOver={() => handleActive()}
        onFocus={() => handleActive()}
        onMouseOut={() => handleActive()}
        onBlur={() => handleActive()}
        src={image}
        alt={alt}
      />
      <div>
        <h3 className="texteOnglet">{alt}</h3>
      </div>
    </div>
  );
}
