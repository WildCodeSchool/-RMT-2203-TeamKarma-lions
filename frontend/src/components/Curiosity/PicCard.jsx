import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PicCard({ pic }) {
  return (
    <div className="alonecard">
      <a href={pic.img_src} target="_blank" rel="noreferrer">
        <LazyLoadImage effect="blur" src={pic.img_src} alt="planet Mars" />
      </a>
      <p>Camera : {pic.camera.name}</p>
    </div>
  );
}
