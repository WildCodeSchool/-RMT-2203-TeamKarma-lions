import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Widget from "./Widget";
import "../styles/Widget.scss";

import epicLogo from "../assets/epic.png";
import tornadoLogo from "../assets/tornade.png";
import curiosityLogo from "../assets/curiosity.png";
import satelliteLogo from "../assets/satellite.png";
import satImg from "../assets/satellites-image.png";
import widgetEventPic from "../assets/image-widget-events.png";

export default function WidgetList() {
  const [curiosityPic, setCuriosityPic] = useState([]);
  const [epicPic, setEpicPic] = useState([]);

  const getCuriosityPic = (date) => {
    let newDate = date;
    if (date === undefined) {
      newDate = new Date();
    }
    const dateString = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDay()}`;
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=BRVlKgV3WbAF21CU0f7H8dnjzLyeKh5go7aQObNB`
      )
      .then((response) => response.data)
      .then((data) => {
        setCuriosityPic(data.photos[0].img_src);
      });
  };

  useEffect(() => {
    getCuriosityPic();
  }, []);

  const fetchEpicPictures = (date) => {
    axios
      .get(`https://epic.gsfc.nasa.gov/api/natural/date/${date}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.length === 0) {
          const subDay = moment(date, "YYYY-MM-DD").subtract(1, "days");
          fetchEpicPictures(subDay.format("YYYY-MM-DD"));
        } else {
          const data2 = data.map((element) => element.image);
          const data3 = data2.map(
            (elem) =>
              `https://epic.gsfc.nasa.gov/archive/natural/${moment(
                date,
                "YYYY-MM-DD"
              ).format("YYYY/MM/DD")}/png/${elem}.png`
          );
          setEpicPic(data3[0]);
        }
      });
  };

  useEffect(() => {
    fetchEpicPictures(moment().format("YYYY-MM-DD"));
  }, []);

  const contenuWidgetDynamique = [
    {
      name: "Curiosity",
      logo: curiosityLogo,
      link: "/Curiosity",
      image: curiosityPic,
    },
    {
      name: "Epic",
      logo: epicLogo,
      link: "/Epic",
      image: epicPic,
    },
  ];

  const contenuWidgetStatique = [
    {
      name: "Natural Events",
      logo: tornadoLogo,
      link: "/NaturalEvents",
      image: widgetEventPic,
    },
  ];

  const contenuWidgetVertical = [
    {
      name: "Satellites",
      logo: satelliteLogo,
      link: "/Satellites",
      image: satImg,
    },
  ];

  return (
    <div className="widgetsContainer">
      <div className="vertical">
        <div className="widgetVertical">
          {contenuWidgetVertical.map((widget) => (
            <article key={widget.name}>
              <Widget
                key={widget.name}
                name={widget.name}
                logo={widget.logo}
                link={widget.link}
                image={widget.image}
              />
            </article>
          ))}
        </div>
      </div>
      <div className="grille">
        <div className="widgetDynamique">
          {contenuWidgetDynamique.map((widget) => (
            <article key={widget.name}>
              <Widget
                key={widget.name}
                name={widget.name}
                logo={widget.logo}
                link={widget.link}
                image={widget.image}
              />
            </article>
          ))}
        </div>
        <div className="widgetStatique">
          {contenuWidgetStatique.map((widget) => (
            <article key={widget.name}>
              <Widget
                key={widget.name}
                name={widget.name}
                logo={widget.logo}
                link={widget.link}
                image={widget.image}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
