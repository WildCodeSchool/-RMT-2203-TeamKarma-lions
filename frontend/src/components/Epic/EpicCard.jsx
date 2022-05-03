import React from "react";
import "../../styles/EpicPictures.scss";

export default function EpicCard({ pic }) {
  return <img className="epicimg" src={pic} alt={pic} />;
}
