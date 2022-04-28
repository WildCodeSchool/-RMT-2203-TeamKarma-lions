import React, { useEffect } from "react";
import "../styles/Home.scss";
import axios from "axios";
import Titre from "../components/Titre";
import Timeline from "../components/Curiosity/Timeline";
import CalendarCuriosity from "../components/Curiosity/CalendarCuriosity";
import CuriosityPics from "../components/Curiosity/CuriosityPics";

export default function Home() {
  const [picList, setPicList] = React.useState([]);

  const getPic = (date) => {
    let newDate = date;
    if (date === undefined) {
      newDate = new Date();
    }
    const dateString = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDay()}`;
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=ld3yHUvzO7DyXL6lzXi5jSTRd4bGpdfKgBGpjNUg`
      )
      .then((response) => response.data)
      .then((data) => {
        setPicList(data.photos);
      });
  };

  useEffect(() => {
    getPic();
  }, []);

  return (
    <>
      <Titre titre="Rover : CURIOSITY" />
      <Timeline />
      <div className="introAndCalendar">
        <p className="intro-curio">
          Curiosity is a rover created by JPL, one of NASAs research centers.
          Its purpose is to explore Mars, as part of the Mars Science Laboratory
          mission. This rover landed on Mars on August 5, 2012 and is still on
          the red planet.
        </p>
        <CalendarCuriosity getPic={getPic} />
      </div>
      <CuriosityPics picList={picList} />
    </>
  );
}
