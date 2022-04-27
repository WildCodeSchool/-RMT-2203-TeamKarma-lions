import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [click, setClick] = useState(false);

  const handleMouseEnter = () => {
    setMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setMouseEnter(false);
  };
  const handleClick = () => {
    setClick(!click);
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
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
          tabIndex={0}
        >
          <NavLink to="/Epic">
            <img src="src/assets/perseverance.png" alt="Epic" />
          </NavLink>

          <div
            className={
              mouseEnter ? "onglet mouseEnter" : "onglet notMouseEnter"
            }
          >
            <h3 className="texteOnglet">Epic</h3>
          </div>
        </div>

        <div
          className="iconeContainer"
          role="button"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
          tabIndex={0}
        >
          <NavLink to="/NaturalEvents">
            <img src="src/assets/planete-icone.png" alt="Natural events" />
          </NavLink>
          <div
            className={
              mouseEnter ? "onglet mouseEnter" : "onglet notMouseEnter"
            }
          >
            <h3 className="texteOnglet">Natural Events</h3>
          </div>
        </div>
        <div
          className="iconeContainer"
          role="button"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
          tabIndex={0}
        >
          <NavLink to="/Curiosity">
            <img src="src/assets/satellite.png" alt="Curiosity" />
          </NavLink>
          <div
            className={
              mouseEnter ? "onglet mouseEnter" : "onglet notMouseEnter"
            }
          >
            <h3 className="texteOnglet">Curiosity</h3>
          </div>
        </div>
        <div
          className="iconeContainer"
          role="button"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
          tabIndex={0}
        >
          <img src="src/assets/comete.png" alt="Meteorites" />
          <div
            className={
              mouseEnter ? "onglet mouseEnter" : "onglet notMouseEnter"
            }
          >
            <h3 className="texteOnglet">Meteorites</h3>
          </div>
        </div>
      </div>
      <img src="src/assets/login.png" alt="Login" className="login" />
    </div>
  );
}
