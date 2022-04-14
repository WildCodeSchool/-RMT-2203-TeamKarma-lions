import React from "react";
import "../styles/Home.css";
import Titre from "../components/Titre";
import DailyPicture from "../components/DailyPicture/DailyPicture";
import FunFactList from "../components/FunFactList";
import WidgetList from "../components/WidgetList";

export default function Home() {
  return (
    <>
      <Titre titre="Titre" />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
        magnam illum laudantium fugit ullam itaque voluptates, repellat iure
        maxime modi iste vel odio, facilis earum quasi, enim dolores quis
        provident.
      </p>
      <DailyPicture />
      <FunFactList />
      <WidgetList />
    </>
  );
}
