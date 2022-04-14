import React from "react";

export default function FunFact({ textFront, factData, textBack }) {
  return (
    <>
      {textFront}
      <p>
        {factData}
        {textBack}
      </p>
    </>
  );
}
