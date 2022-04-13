import React from "react";
import "../styles/Home.css";
import Titre from "../components/Titre";
import DailyPicture from "../components/DailyPicture";
import FunFactList from "../components/FunFactList";
import WidgetList from "../components/WidgetList";

export default function Home() {
  return (
    <>
      <Titre titre="Titre" />
      <p> Bienvenue dans l'espace !</p>
      <DailyPicture />
      <FunFactList />
      <WidgetList />
    </>
  );
}
