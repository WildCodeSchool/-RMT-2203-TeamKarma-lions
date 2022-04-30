import React, { useEffect, useState } from "react";
import "../styles/Funfactlist.scss";
import axios from "axios";
import FunFact from "./FunFact";

export default function FunFactList() {
  const [marsTemp, setMarsTemp] = useState([0, 0]);
  const [nbExo, setNbExo] = useState(0);
  const [fireBallImpact, setFireBallImpact] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://cab.inta-csic.es/rems/wp-content/plugins/marsweather-widget/api.php`
      )
      .then((response) => response.data)
      .then((data) => {
        setMarsTemp([
          parseInt(data.soles[0].min_temp, 10),
          parseInt(data.soles[0].max_temp, 10),
        ]);
      });
  }, []);

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
      text1: "Mars weather :",
      factData: marsTemp[0],
      factData2: marsTemp[1],
      text2: " / ",
      text3: " °C",
      start: 30,
      round: 0,
      icon: "sun.png",
    },

    {
      text1: "Exoplanets count :",
      factData: nbExo,
      factData2: null,
      text2: "",
      start: 0,
      round: 0,
      icon: "orbit.png",
    },

    {
      text1: "Last fireball impact :",
      factData: fireBallImpact,
      factData2: null,
      text2: " kt",
      start: 0,
      round: 2,
      icon: "meteor.png",
    },
  ];

  return (
    <div className="funfactlist">
      {funFacts.map((funFact) => (
        <FunFact
          key={`${funFact.text1}`}
          textFront={funFact.text1}
          factData={funFact.factData}
          factData2={funFact.factData2}
          textBack={funFact.text2}
          textBack2={funFact.text3}
          dataStart={funFact.start}
          dataRound={funFact.round}
          icon={funFact.icon}
        />
      ))}
    </div>
  );
}
