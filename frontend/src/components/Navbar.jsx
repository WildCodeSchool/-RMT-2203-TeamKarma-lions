import React from "react";
import "../styles/Navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <img className="logo" src="src/assets/lion-logo.png" alt="logo" />
      <div className="icones">
        <img
          className="planete-icone"
          src="src/assets/planete-icone.png"
          alt="icone"
        />
        <img
          className="planete-icone"
          src="src/assets/planete-icone.png"
          alt="icone"
        />
        <img
          className="planete-icone"
          src="src/assets/planete-icone.png"
          alt="icone"
        />
        <img
          className="planete-icone"
          src="src/assets/planete-icone.png"
          alt="icone"
        />
      </div>
      <img className="login" src="src/assets/login.png" alt="login" />
    </div>
  );
}
