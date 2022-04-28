import React, { useEffect, useState } from "react";
import axios from "axios";
import Globe from "globe.gl";
// import * as d3 from "d3";
// import polished from "polished"
// ['severeStorms', 'volcanoes', 'seaLakeIce', 'wildfires']

const correspondance = [
  { id: "severeStorms", color: "#1dfb8f" },
  { id: "volcanoes", color: "#fbb11d" },
  { id: "seaLakeIce", color: "#1dbefb" },
  { id: "wildfires", color: "#fb441d" },
];

export default function NaturalEventsPics() {
  const [eventList, setEventList] = useState([]);

  const catColor = (evenement) => {
    // console.log(evenement);

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
    console.log("API REQUEST");

    axios
      .get("https://eonet.gsfc.nasa.gov/api/v3/events")
      .then((response) => response.data)
      .then((data) => {
        // const categories = [];

        // data.events.forEach((ev) => categories.push(ev.categories[0].id));

        // console.log(categories);
        // const uniqueCategories = [...new Set(categories)];
        // console.log(uniqueCategories);

        setEventList(
          data.events.map((ev) => {
            // console.log(ev)
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

  useEffect(() => {
    if (eventList.length > 0) {
      console.log("new globe");

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

        // .labelLat("lat")
        // .labelLng("lon")
        // .labelAltitude(0.26)
        // .labelDotRadius(0.12)
        // .labelDotOrientation(() => "bottom")
        // .labelColor((ev) => catColor(ev.type))
        // .labelText("name")
        // .labelSize(0.15)
        // .labelResolution(1)
        .pointLabel(getTooltip)

        .pointsData(eventList)
        .labelsData(eventList);
    }
  }, [eventList]);

  useEffect(() => {
    getPicEvent();
  }, []);

  useEffect(() => {
    console.log("render");
  });

  return (
    <div>
      <div id="globeViz" />
    </div>
  );
}
