import React from "react";
import "../styles/Home.scss";
import "../styles/NaturalEvents.scss";
import Titre from "../components/Titre";
import NaturalEventsPics from "../components/NaturalEvents/NaturalEventsPics";

export default function NaturalEvents() {
  return (
    <div>
      <div className="natTitle">
        <Titre titre="Natural Events from space" />
      </div>
      <NaturalEventsPics />
    </div>
  );
}
