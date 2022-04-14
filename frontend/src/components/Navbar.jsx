import React from "react";
import "../styles/Navbar.scss";
import ItemNavbar from "./ItemNavbar";

export default function Navbar() {
  const icones = [
    { className: "logo", image: "src/assets/lion-logo.png", alt: "logo" },
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
    {
      className: "login",
      image: "src/assets/login.png",
      alt: "login",
    },
  ];

  return (
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
  );
}
