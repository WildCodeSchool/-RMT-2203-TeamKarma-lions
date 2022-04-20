import React, { useState } from "react";
import "../styles/Navbar.scss";

export default function ItemNavbar({ image, alt, isActive }) {
  const [active, setActive] = useState({ isActive });
  const [mouseEnter, setMouseEnter] = useState(false);
  const [mouseLeave, setMouseLeave] = useState(true);
  const [click, setClick] = useState(false);

  // const handleActive = () => {
  //   setActive(!active);
  // };
  const handleMouseEnter = () => {
    setMouseEnter(!mouseEnter);
  };
  const handleMouseLeave = () => {
    setMouseLeave(!mouseLeave);
  };
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => handleClick()}
      onKeyPress={() => handleClick()}
      role="button"
      tabIndex={0}
      className="iconeContainer"
    >
      <img src={image} alt={alt} />
      <div
        className={mouseEnter ? "onglet mouseEnter" : "onglet notMouseEnter"}
      >
        <h3>{alt}</h3>
      </div>
    </div>
  );
}
