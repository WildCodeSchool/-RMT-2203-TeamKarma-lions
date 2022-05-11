import React from "react";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../styles/Widget.scss";
import "../styles/App.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

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
            <LazyLoadImage
              effect="blur"
              src={image}
              alt={name}
              className="image-widget"
            />
          </div>
        </div>
      </NavLink>
    </div>
  );
}
