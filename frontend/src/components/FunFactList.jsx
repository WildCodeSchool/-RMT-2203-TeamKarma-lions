import React, { useEffect, useState } from "react";
import axios from "axios";
import FunFact from "./FunFact";

export default function FunFactList() {
  const [marsTemp, setMarsTemp] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://cab.inta-csic.es/rems/wp-content/plugins/marsweather-widget/api.php`
      )
      .then((response) => response.data)
      .then((data) => {
        setMarsTemp(data.soles[0].max_temp);
      });
  }, []);

  const [nbExo, setNbExo] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+count(releasedate)+from+ps+where+default_flag=1&format=json`
      )
      .then((response) => response.data)
      .then((data) => {
        setNbExo(data[0]["count(releasedate)"]);
      });
  }, []);

  const funFacts = [
    {
      text: "la température maximum sur Mars aujourdhui est de",
      factData: `${marsTemp} C°`,
    },

    {
      text: "Nombre d'exoplanètes découvertes:",
      factData: nbExo,
    },

    {
      text: "la température sur Saturne est de",
      factData: 666,
    },
  ];

  return (
    <>
      {funFacts.map((funFact) => (
        <FunFact
          key={`${funFact.factData}`}
          textFront={funFact.text}
          factData={funFact.factData}
        />
      ))}
    </>
  );
}
