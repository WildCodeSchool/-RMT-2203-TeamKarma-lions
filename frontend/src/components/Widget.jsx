import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Widget.scss";
import "../styles/App.scss";

export default function Widget({ logo, name, image, link }) {
  return (
    <div className="widget">
      <NavLink to={link}>
        <div className="textWidget">
          <div className="logoWidget">
            <img src={logo} alt={name} />
          </div>
          <h3>{name}</h3>
        </div>
        <div className="imageWidget">
          <img src={image} alt={name} className="image-widget" />
        </div>
      </NavLink>
    </div>
  );
}
