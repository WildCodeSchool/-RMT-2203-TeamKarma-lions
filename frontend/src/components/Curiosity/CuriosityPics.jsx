import React, { useState } from "react";

import "../../styles/CuriosityPics.scss";
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
    <div>
      <div className="filterCam">
        <p>Choose a camera :</p>
        <select name="Camera">
          <option value="All">All</option>
          <option value="FHAZ">Front Hazard Avoidance Camera - FHAZ</option>
          <option value="RHAZ">Rear Hazard Avoidance Camera - RHAZ</option>
          <option value="MAST">Mast Camera - MAST</option>
          <option value="CHEMCAM">
            Chemistry and Camera Complex - CHEMCAM
          </option>
          <option value="MAHLI">Mars Hand Lens Imager - MAHLI</option>
          <option value="MARDI">Mars Descent Imager - MARDI</option>
          <option value="NAVCAM">Navigation Camer - NAVCAM</option>
        </select>
      </div>
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
    </div>
  );
}
