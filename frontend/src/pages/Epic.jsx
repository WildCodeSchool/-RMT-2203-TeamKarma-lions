import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import EpicPictures from "../components/Epic/EpicPictures";

export default function Epic() {
  return (
    <div>
      <Titre titre="DSCOVR : EPIC" />
      <EpicPictures />
    </div>
  );
}
