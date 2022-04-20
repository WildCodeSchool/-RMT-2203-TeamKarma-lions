import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import CalendarOps from "../components/Epic/CalendarOps";
import EpicEvent from "../components/Epic/EpicEvent";
import EpicPictures from "../components/Epic/EpicPictures";

export default function Home() {
  return (
    <>
      <Titre titre="DSCOVR : EPIC" />
      <p className="intro-site">
        Postremo ad id indignitatis est ventum, ut cum peregrini ob formidatam
        haut ita dudum alimentorum inopiam pellerentur ab urbe praecipites,
        sectatoribus disciplinarum liberalium inpendio paucis sine respiratione
        ulla extrusis, tenerentur minimarum adseclae veri, quique id simularunt
        ad tempus, et tria milia saltatricum ne interpellata quidem cum choris
        totidemque remanerent magistris.
      </p>
      <CalendarOps />
      <EpicEvent />
      <EpicPictures />
    </>
  );
}
