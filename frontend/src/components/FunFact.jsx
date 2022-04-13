import React from "react";

export default function FunFact({ textFront, factData, textBack }) {
  return (
    <>
      {textFront} {factData} {textBack}
    </>
  );
}
