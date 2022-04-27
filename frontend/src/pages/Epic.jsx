import React, { useState } from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import CalendarOps from "../components/Epic/CalendarOps";
import EpicEvent from "../components/Epic/EpicEvent";
import EpicPictures from "../components/Epic/EpicPictures";

export default function Home() {
  const [epicDate, setEpicDate] = useState();

  return (
    <>
      <Titre titre="DSCOVR : EPIC" />
      <p className="intro-site" />
      <CalendarOps setEpicPicture={setEpicDate} />
      <EpicEvent />
      <EpicPictures epicPicture={epicDate} />
    </>
  );
}
