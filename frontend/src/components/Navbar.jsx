import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [click, setClick] = useState([false, false, false, false]);

  const handleClick = () => {
    setClick(!click); // sera à modifier pour que ça marche vraiment car on ne peut pas inverser un tableau
  };

  return (
    <div className="navbarContainer">
      <NavLink to="/">
        <img src="src/assets/lion-logo.png" alt="Logo" className="logo" />
      </NavLink>
      <div className="iconeList">
        <div
          className="iconeContainer"
          role="button"
          onClick={() => handleClick(0)}
          onKeyPress={() => handleClick(0)}
          tabIndex={0}
        >
          <NavLink to="/Epic">
            <img
              src="src/assets/perseverance.png"
              alt="Epic"
              className="imgIcone"
            />
          </NavLink>

          <div className="onglet">
            <h3 className="texteOnglet">Epic</h3>
          </div>
        </div>

        <div
          className="iconeContainer"
          role="button"
          onClick={() => handleClick(1)}
          onKeyPress={() => handleClick(1)}
          tabIndex={0}
        >
          <NavLink to="/NaturalEvents">
            <img
              src="src/assets/tornade.png"
              alt="Natural events"
              className="imgIcone"
            />
          </NavLink>
          <div className="ongletContainer">
            <div className="onglet">
              <h3 className="texteOnglet">Natural Events</h3>
            </div>
          </div>
        </div>
        <div
          className="iconeContainer"
          role="button"
          onClick={() => handleClick(2)}
          onKeyPress={() => handleClick(2)}
          tabIndex={0}
        >
          <NavLink to="/Curiosity">
            <img
              src="src/assets/satellite.png"
              alt="Curiosity"
              className="imgIcone"
            />
          </NavLink>
          <div className="onglet">
            <h3 className="texteOnglet">Curiosity</h3>
          </div>
        </div>
        <div
          className="iconeContainer"
          role="button"
          onClick={() => handleClick(3)}
          onKeyPress={() => handleClick(3)}
          tabIndex={0}
        >
          <NavLink to="/Satellites">
            <img
              src="src/assets/comete.png"
              alt="Meteorites"
              className="imgIcone"
            />
          </NavLink>

          <div className="onglet">
            <h3 className="texteOnglet">Satellites</h3>
          </div>
        </div>
      </div>
      <img src="src/assets/login.png" alt="Login" className="login" />
    </div>
  );
}
