import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Widget.scss";
import "../styles/App.scss";

export default function Widget({ logo, name, image, link }) {
  return (
    <div className="widget">
      <NavLink className="lien" to={link}>
        <div className="texteImgWidget">
          <div className="textWidget">
            <div className="textLogo">
              <div className="logoWidget">
                <img src={logo} alt={name} className="imglogo" />
              </div>
              <h3>{name}</h3>
            </div>
          </div>
          <div className="imageWidget">
            <img src={image} alt={name} className="image-widget" />
          </div>
        </div>
      </NavLink>
    </div>
  );
}
