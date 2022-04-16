import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import DailyPicture from "../components/DailyPicture/DailyPicture";
import FunFactList from "../components/FunFactList";
import WidgetList from "../components/WidgetList";

export default function Home() {
  return (
    <>
      <div className="intro-align">
        <div className="intro-bloc">
          <Titre titre="NASA X LIONS" />
          <p className="intro-site">
            The Universe is infinitely large. If you want to know more about our
            exoplanets, about the meteorites that fall on Earth, or if you want
            to visit Mars without leaving your home, you have come to the right
            place. Good visit!
          </p>
        </div>
        <FunFactList />
      </div>
      <DailyPicture />
      <WidgetList />
    </>
  );
}
