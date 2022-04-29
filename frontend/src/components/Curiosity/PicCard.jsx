import React from "react";

export default function PicCard({ pic }) {
  return (
    <div className="alonecard">
      <a href={pic.img_src} target="_blank" rel="noreferrer">
        <img src={pic.img_src} alt="planet Mars" />
      </a>
      <p>Camera : {pic.camera.name}</p>
    </div>
  );
}
