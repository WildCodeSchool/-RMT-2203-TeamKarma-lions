import React from "react";
import "../styles/Home.scss";
import "../styles/NaturalEvents.scss";
import Titre from "../components/Titre";
import NaturalEventsPics from "../components/NaturalEvents/NaturalEventsPics";

export default function Home() {
  return (
    <div>
      <Titre className="natTitle" titre="Natural Events from space" />
      <NaturalEventsPics />
    </div>
  );
}
