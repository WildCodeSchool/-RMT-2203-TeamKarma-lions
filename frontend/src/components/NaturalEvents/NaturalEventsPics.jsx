import React, { useEffect, useState } from "react";
import axios from "axios";
import Globe from "globe.gl";
import Loader from "../Loader";
import "../../styles/NaturalEvents.scss";

let controller;

const correspondance = [
  { id: "severeStorms", color: "#1dfb8f" },
  { id: "volcanoes", color: "#fbb11d" },
  { id: "seaLakeIce", color: "#1dbefb" },
  { id: "wildfires", color: "#fb441d" },
];
const correspondance2 = {
  severeStorms: "#1dfb8f",
  volcanoes: "#fbb11d",
  Iceberg: "#1dbefb",
  wildfires: "#fb441d",
};
export default function NaturalEventsPics() {
  const [uniqueCat, setUniqueCat] = useState([]);

  const [eventList, setEventList] = useState([]);

  const catColor = (evenement) => {
    let color = "";

    correspondance.forEach((corr) => {
      if (corr.id === evenement) color = corr.color;
    });

    if (color === "")
      // couleur par défaut si pas dans la liste correspondance
      color = "#e01dfb";

    return color;
  };

  const getTooltip = (d) => {
    let htmlReturn = `<div style="text-align: center"><div><b>${d.name}</b></div>`;

    if (d.description) htmlReturn += `<div>${d.description}</div>`;
    htmlReturn += `<div>Date : <em>${`${d.date.getFullYear()}/${
      d.date.getMonth() + 1
    }/${d.date.getDay()}`}</em></div></div>`;

    return htmlReturn;
  };

  const getPicEvent = () => {
    controller = new AbortController();
    const { signal } = controller;

    axios
      .get("https://eonet.gsfc.nasa.gov/api/v3/events", { signal })
      .then((response) => response.data)
      .then((data) => {
        const categories = [];

        data.events.forEach((ev) => categories.push(ev.categories[0].id));

        const uniqueCategories = [...new Set(categories)];
        setUniqueCat(
          uniqueCategories.map((cat) => {
            let catCount = 0;
            categories.forEach((c) => {
              if (c === cat) {
                catCount += 1;
              }
            });

            return {
              catName: cat === "seaLakeIce" ? "icebergs" : cat,
              catCount,
            };
          })
        );
        setEventList(
          data.events.map((ev) => {
            const { geometry } = ev;
            const geometryLength = ev.geometry.length;
            const lastGeo = geometry[geometryLength - 1];

            const firstDate = new Date(geometry[0].date);
            const lastDate = new Date(lastGeo.date);
            const today = new Date();

            let nbDayOld =
              (today.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);

            if (nbDayOld > 1000) nbDayOld = 1000;

            const sizeBar = (1000 - nbDayOld) / 3000 + 0.03;

            const long = lastGeo.coordinates[0];
            const lati = lastGeo.coordinates[1];

            return {
              id: ev.id,
              name: ev.title,
              description: ev.description,
              type: ev.categories[0].id,
              date: lastDate,
              lon: long,
              lat: lati,
              size: sizeBar,
            };
          })
        );
      });
  };

  const drawGlobe = () => {
    if (eventList.length > 0) {
      let baseHeight = window.innerHeight - 300;
      let baseWidth = window.innerWidth;

      if (baseWidth > 768) baseWidth -= 164;
      else baseHeight -= 64;

      const myGlobe = Globe();
      myGlobe(document.getElementById("globeViz"))
        .globeImageUrl(
          "https://unpkg.com/three-globe@2.24.4/example/img/earth-blue-marble.jpg"
        )
        .pointLat("lat")
        .pointLng("lon")
        .pointAltitude("size")
        .pointRadius(0.12)
        .pointColor((ev) => catColor(ev.type))
        .pointLabel(getTooltip)
        .height(baseHeight)
        .width(baseWidth)

        .pointsData(eventList);
    }
  };

  useEffect(() => {
    drawGlobe();
  }, [eventList]);

  useEffect(() => {
    getPicEvent();
    window.addEventListener("resize", drawGlobe);

    return () => {
      window.removeEventListener("resize", drawGlobe);
      controller.abort();
    };
  }, []);

  // afficher uniqueCategories dans une div en haut à droite de la div globeViz

  return (
    <div id="globeContainer1">
      {eventList.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div id="counter">
            <ul id="listEvents">
              {uniqueCat.map((cat) => (
                <li
                  style={{
                    color: correspondance2[`${cat.catName}`]
                      ? correspondance2[`${cat.catName}`]
                      : "#e01dfb",
                  }}
                  key={cat.catName}
                >
                  {cat.catName}: {cat.catCount}
                </li>
              ))}
            </ul>
          </div>
          <div id="globeViz" />
        </>
      )}
    </div>
  );
}
