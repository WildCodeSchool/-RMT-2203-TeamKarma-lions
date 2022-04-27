import React, { useState } from "react";

import "../../styles/CuriosityPics.scss";
// import CalendarCuriosity from "./CalendarCuriosity";
import PicCard from "./PicCard";

export default function CuriosityPics({ picList }) {
  const [positionIndex, setPositionIndex] = useState(0);

  const nbPerPage = 20;

  const handleButtonClick = (action) => {
    if (typeof action === "string") {
      if (action === "Previous") {
        if (positionIndex !== 0) {
          setPositionIndex(positionIndex - nbPerPage);
        }
      }
      if (action === "Next") {
        if (positionIndex + nbPerPage < picList.length) {
          setPositionIndex(positionIndex + nbPerPage);
        }
      }
      if (action === "Last") {
        if (picList.length > nbPerPage) {
          setPositionIndex((Math.ceil(picList.length / nbPerPage) - 1) * 20);
        }
      }
    } else {
      setPositionIndex(action * nbPerPage);
    }
  };

  return (
    <div className="containerPic">
      <div className="buttonContainer">
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick(0)}
        >
          <img src="../src/assets/firstfirst.png" alt="first arrow" />
        </button>
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick("Previous")}
        >
          <img src="../src/assets/dbl-arrow-left.png" alt="left arrow" />
        </button>
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick("Next")}
        >
          <img src="../src/assets/dbl-arrow-right.png" alt="right arrow" />
        </button>
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick("Last")}
        >
          <img src="../src/assets/lastlast.png" alt="last arrow" />
        </button>
      </div>
      <div className="gridpics">
        {picList.map((pic, index) =>
          index >= positionIndex && index < nbPerPage + positionIndex ? (
            <PicCard pic={pic} key={pic.id} />
          ) : null
        )}
      </div>
    </div>
  );
}
