import React from "react";
import "../styles/Navbar.scss";
import ItemNavbar from "./ItemNavbar";

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
      alt: "firstIcone",
    },
    {
      className: "planete-icone",
      image: "src/assets/satellite.png",
      alt: "secondIcone",
    },
    {
      className: "planete-icone",
      image: "src/assets/comete.png",
      alt: "thirdIcone",
    },
    {
      className: "planete-icone",
      image: "src/assets/tornade.png",
      alt: "fourthIcone",
    },
  ];

  return (
    <div className="navbarContainer">
      <div className="logoContainer">
        {logoIcone.map((props) => (
          <ItemNavbar
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
          <ItemNavbar
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
