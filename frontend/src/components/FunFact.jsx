import React, { useState, useEffect } from "react";

export default function FunFact({
  textFront,
  factData,
  factData2,
  textBack,
  textBack2,
  dataStart,
  dataRound,
  icon,
}) {
  const [displayNumber1, setDisplayNumber1] = useState(0);
  const [displayNumber2, setDisplayNumber2] = useState(0);
  const timeoutLaunched = [false, false];

  const increaseNumber = (data, count, callback, timeoutIndex) => {
    timeoutLaunched[timeoutIndex] = true;
    callback(
      (data - (data - dataStart) * ((100 - count) / 100)).toFixed(dataRound)
    );
    if (count < 100)
      window.setTimeout(
        () => increaseNumber(data, count + 1, callback, timeoutIndex),
        20
      );
  };

  useEffect(() => {
    console.log("factData", factData, "factData2", factData2);

    if (factData !== 0 && factData !== null && !timeoutLaunched[0]) {
      console.log("increaseNumber factData", factData, 0);
      increaseNumber(factData, 0, setDisplayNumber1);
    }
    if (factData2 !== 0 && factData2 !== null && !timeoutLaunched[1]) {
      console.log("increaseNumber factData2", factData2, 1);
      increaseNumber(factData2, 0, setDisplayNumber2);
    }
  }, [factData, factData2]);

  return (
    <div className="funfact">
      <img src={`src/assets/${icon}`} alt={icon} />
      <div>
        {textFront}
        <p>
          {factData !== null && displayNumber1}
          {factData !== null && textBack}
          {factData2 !== null && displayNumber2}
          {textBack2 !== null && textBack2}
        </p>
      </div>
    </div>
  );
}
