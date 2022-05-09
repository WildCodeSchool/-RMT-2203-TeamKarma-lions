import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import NaturalEventsPics from "../components/NaturalEvents/NaturalEventsPics";

export default function Home() {
  return (
    <div>
      <div>
        <Titre titre="Natural Events from space" />
      </div>
      <NaturalEventsPics />
    </div>
  );
}
