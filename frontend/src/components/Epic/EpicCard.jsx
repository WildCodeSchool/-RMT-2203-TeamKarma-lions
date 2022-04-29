import React from "react";
import "../../styles/EpicPictures.scss";

export default function EpicCard({ pic }) {
  return (
    <div className="epicCard">
      <img className="epicimg" src={pic} alt={pic} />
    </div>
  );
}
