import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import EpicPictures from "../components/Epic/EpicPictures";
import "../styles/EpicPictures.scss";

export default function Epic() {
  return (
    <div className="epicpage">
      <Titre className="epicTitle" titre="DSCOVR : EPIC" />
      <EpicPictures />
    </div>
  );
}
