import React, { useState, useEffect } from "react";
import axios from "axios";
import Widget from "./Widget";

import "../styles/Widget.scss";

export default function WidgetList() {
  const [curiosityPic, setCuriosityPic] = useState([]);

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

  const contenuWidget = [
    {
      name: "Curiosity",
      logo: "../src/assets/perseverance.png",
      link: "/Curiosity",
      image: curiosityPic,
    },
    {
      name: "Natural Events",
      logo: "../src/assets/tornade.png",
      link: "/NaturalEvents",
      image: "../src/assets/image-widget-events.png",
    },
  ];

  return (
    <div className="widgetsContainer">
      {contenuWidget.map((widget) => (
        <article>
          <Widget
            key={widget.name}
            name={widget.name}
            logo={widget.logo}
            link={widget.link}
            image={widget.image}
          />
        </article>
      ))}
      {/* <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article> */}
    </div>
  );
}
