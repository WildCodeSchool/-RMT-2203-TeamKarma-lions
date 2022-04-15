import React from "react";
import "../styles/Widget.scss";
import "../styles/App.scss";

export default function Widget() {
  return (
    <div className="widget">
      <img src="../assets/satellite.png"
      alt="satellite picture" />
      <h1>Curiosity Persévérance</h1>
    </div>
  );
}
