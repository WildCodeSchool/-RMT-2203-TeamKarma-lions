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
      <p className="intro-site">intro-site</p>
      <CalendarOps />
      <EpicEvent />
      <EpicPictures />
    </>
  );
}
