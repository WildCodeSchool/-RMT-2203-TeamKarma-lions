import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import EpicEvent from "../components/Epic/EpicEvent";
import EpicPictures from "../components/Epic/EpicPictures";

export default function Home() {
  return (
    <div>
      <Titre titre="DSCOVR : EPIC" />
      <p className="intro-site" />

      <EpicEvent />
      <EpicPictures />
    </div>
  );
}
