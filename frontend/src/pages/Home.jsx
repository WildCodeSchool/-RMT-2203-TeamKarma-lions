import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import DailyPicture from "../components/DailyPicture/DailyPicture";
import FunFactList from "../components/FunFactList";
import WidgetList from "../components/WidgetList";

export default function Home() {
  return (
    <>
      <Titre titre="NASA X LIONS" />
      <DailyPicture />
      <FunFactList />
      <p className="intro-site">
        The Universe is infinitely large. Discover many anecdotes about all the
        materials that surround our planet.
      </p>
      <WidgetList />
    </>
  );
}
