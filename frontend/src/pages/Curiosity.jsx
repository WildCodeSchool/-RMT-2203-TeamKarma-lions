import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import Timeline from "../components/Curiosity/Timeline";
import CountCuriosity from "../components/Curiosity/CountCuriosity";
import CuriosityPics from "../components/Curiosity/CuriosityPics";

export default function Curiosity() {
  return (
    <>
      <Titre titre="Rover : CURIOSITY" />
      <p className="intro-site">
        Curiosity is a rover created by JPL, one of NASAs research centers. Its
        purpose is to explore Mars, as part of the Mars Science Laboratory
        mission. This rover landed on Mars on August 6, 2012 and is still on the
        red planet.
      </p>
      <Timeline />
      <CountCuriosity />
      <CuriosityPics />
    </>
  );
}
