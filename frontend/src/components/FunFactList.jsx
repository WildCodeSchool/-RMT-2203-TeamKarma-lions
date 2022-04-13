import React from "react";
import FunFact from "./FunFact";

export default function FunFactList() {
  const funFacts = [
    {
      textFront: "la température sur Mars est de",
      textBack: "°C",
      factData: "666",
    },

    {
      textFront: "front B",
      textBack: "back B",
      factData: "Data B",
    },

    {
      textFront: "front C",
      textBack: "back C",
      factData: "Data C",
    },
  ];

  return (
    <>
      {funFacts.map((funFact) => (
        <FunFact
          key={`${funFact.factData}`}
          textFront={funFact.textFront}
          factData={funFact.factData}
          textBack={funFact.textBack}
        />
      ))}
    </>
  );
}
