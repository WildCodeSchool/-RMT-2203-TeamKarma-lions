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

  const getTooltip = (d) => `
  <div style="text-align: center">
    <div><b>${d.name}</b></div>
    <div>${d.description}</div>
    <div>Elevation: <em>${d.date}</em>m</div>
  </div>
`;

  const getPicEvent = () => {
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

            const date2 = lastGeo.date;
            const long = lastGeo.coordinates[0];
            const lati = lastGeo.coordinates[1];

            return {
              id: ev.id,
              name: ev.title,
              description: ev.description,
              type: ev.categories[0].id,
              date: date2,
              lon: long,
              lat: lati,
            };
          })
        );
      });
  };

  useEffect(() => {
    if (eventList.length > 0) {
      const myGlobe = Globe();
      myGlobe(document.getElementById("globeViz"))
        .globeImageUrl(
          "https://unpkg.com/three-globe@2.24.4/example/img/earth-night.jpg"
        )
        .pointLat("lat")
        .pointLng("lon")
        .pointAltitude(0.25)
        .pointRadius(0.12)
        .pointColor((ev) => catColor(ev.type))

        .labelLat("lat")
        .labelLng("lon")
        .labelAltitude(0.26)
        .labelDotRadius(0.12)
        .labelDotOrientation(() => "bottom")
        .labelColor((ev) => catColor(ev.type))
        .labelText("name")
        .labelSize(0.15)
        .labelResolution(1)
        .labelLabel(getTooltip)

        .pointsData(eventList)
        .labelsData(eventList);
    }
  }, [eventList]);

  useEffect(() => {
    getPicEvent();
  }, []);

  return (
    <div>
      <button type="button" onClick={getPicEvent}>
        <div id="globeViz" />
      </button>
    </div>
  );
}
