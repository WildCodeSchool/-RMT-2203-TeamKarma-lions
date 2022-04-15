import React from "react";
import "../styles/Navbar.scss";
import ItemNavbar from "./ItemNavbar";
import LogoLoginNav from "./LogoLoginNav";

export default function Navbar() {
  const logoIcone = [
    { className: "logo", image: "src/assets/lion-logo.png", alt: "logo" },
  ];
  const loginIcone = [
    {
      className: "login",
      image: "src/assets/login.png",
      alt: "login",
    },
  ];
  const icones = [
    {
      className: "planete-icone",
      image: "src/assets/planete-icone.png",
      alt: "Mars' weather",
    },
    {
      className: "planete-icone",
      image: "src/assets/satellite.png",
      alt: "Perseverance/Curiosity",
    },
    {
      className: "planete-icone",
      image: "src/assets/comete.png",
      alt: "Meteorites",
    },
    {
      className: "planete-icone",
      image: "src/assets/tornade.png",
      alt: "Natural events",
    },
  ];

  return (
    <div className="navbarContainer">
      <div className="logoContainer">
        {logoIcone.map((props) => (
          <LogoLoginNav
            key={props.alt}
            className={props.className}
            image={props.image}
            alt={props.alt}
          />
        ))}
      </div>
      <div className="navbar">
        {icones.map((props) => (
          <ItemNavbar
            key={props.alt}
            className={props.className}
            image={props.image}
            alt={props.alt}
          />
        ))}
      </div>
      <div className="loginContainer">
        {loginIcone.map((props) => (
          <LogoLoginNav
            key={props.alt}
            className={props.className}
            image={props.image}
            alt={props.alt}
          />
        ))}
      </div>
    </div>
  );
}
