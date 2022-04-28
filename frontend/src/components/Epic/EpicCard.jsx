import React from "react";

export default function EpicCard({ pic }) {
  return (
    <div className="alonecard">
      <img src={pic} alt={pic} />
    </div>
  );
}
