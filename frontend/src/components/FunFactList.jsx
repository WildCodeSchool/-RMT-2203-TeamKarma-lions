import React, { useEffect, useState } from "react";
import "../styles/Funfactlist.scss";
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

  const [fireBallImpact, setFireBallImpact] = useState(0);

  useEffect(() => {
    axios
      .get(`https://ssd-api.jpl.nasa.gov/fireball.api?limit=1`)
      .then((response) => response.data)
      .then((data) => {
        setFireBallImpact(data.data["0"][2]);
      });
  }, []);

  const funFacts = [
    {
      text1: "Max Temp for Curiosity :",
      factData: marsTemp,
      text2: " C°",
    },

    {
      text1: "Exoplanets discovered:",
      factData: nbExo,
      text2: "",
    },

    {
      text1: "Impact of the last Fireball:",
      factData: fireBallImpact,
      text2: " kt",
    },
  ];

  return (
    <div className="funfactlist">
      {funFacts.map((funFact) => (
        <FunFact
          key={`${funFact.text1}`}
          textFront={funFact.text1}
          factData={funFact.factData}
          textBack={funFact.text2}
        />
      ))}
    </div>
  );
}
