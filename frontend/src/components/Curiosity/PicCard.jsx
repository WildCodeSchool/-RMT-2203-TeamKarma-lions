import React from "react";

export default function PicCard({ pic }) {
  return (
    <div className="alonecard">
      <img src={pic.img_src} alt="planet" />
    </div>
  );
}
