import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import ItemNavbar from "./ItemNavbar";
import LogoLoginNav from "./LogoLoginNav";

export default function Navbar() {
  const logoIcone = [
    {
      id: "home",
      className: "logo",
      image: "src/assets/lion-logo.png",
      alt: "logo",
    },
  ];
  const loginIcone = [
    {
      id: "login",
      className: "login",
      image: "src/assets/login.png",
      alt: "login",
    },
  ];
  const icones = [
    {
      id: "mars_weather",
      className: "planete-icone",
      image: "src/assets/planete-icone.png",
      alt: "Mars' weather",
      isActive: false,
    },
    {
      id: "Epic",
      className: "planete-icone",
      image: "src/assets/perseverance.png",
      alt: "Epic",
      isActive: false,
    },
    {
      id: "curiosity",
      className: "planete-icone",
      image: "src/assets/satellite.png",
      alt: "Curiosity",
      isActive: false,
    },
    {
      id: "meteorites",
      className: "planete-icone",
      image: "src/assets/comete.png",
      alt: "Meteorites",
      isActive: false,
    },
    {
      id: "natural_events",
      className: "planete-icone",
      image: "src/assets/tornade.png",
      alt: "Natural events",
      isActive: false,
    },
  ];

  return (
    <div className="navbarContainer">
      {logoIcone.map((props) => (
        <LogoLoginNav
          key={props.alt}
          className={props.className}
          image={props.image}
          alt={props.alt}
        />
      ))}
      <div className="navbar">
        {icones.map((icone) => {
          return (
            <Link to={icone}>
              <ItemNavbar
                key={icone.alt}
                image={icone.image}
                alt={icone.alt}
                isActive={icone.isActive}
              />
            </Link>
          );
        })}
      </div>
      {loginIcone.map((props) => (
        <LogoLoginNav
          key={props.alt}
          className={props.className}
          image={props.image}
          alt={props.alt}
        />
      ))}
    </div>
  );
}
