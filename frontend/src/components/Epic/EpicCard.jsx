import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "../../styles/EpicPictures.scss";

export default function EpicCard({ pic }) {
  return (
    <LazyLoadImage className="epicimg" effect="opacity" src={pic} alt={pic} />
  );
}
