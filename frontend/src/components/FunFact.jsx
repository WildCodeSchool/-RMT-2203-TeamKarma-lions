import React from "react";

export default function FunFact({ textFront, factData, textBack }) {
  console.log(
    "textFront",
    textFront,
    "factData",
    factData,
    "textBack",
    textBack
  );
  return (
    <div className="funfact">
      <div>
        {textFront}
        <p>
          {factData}
          {textBack}
        </p>
      </div>
    </div>
  );
}
