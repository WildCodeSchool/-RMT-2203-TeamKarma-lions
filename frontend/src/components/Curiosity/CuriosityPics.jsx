import React, { useEffect } from "react";
import axios from "axios";
import "../../styles/CuriosityPics.scss";
import PicCard from "./PicCard";

export default function CuriosityPics() {
  const [positionIndex, setPositionIndex] = React.useState(0);
  const [picList, setPicList] = React.useState([]);

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

  const getPic = () => {
    axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2012-8-6&api_key=ld3yHUvzO7DyXL6lzXi5jSTRd4bGpdfKgBGpjNUg"
      )
      .then((response) => response.data)
      .then((data) => {
        setPicList(data.photos);
      });
  };

  useEffect(() => {
    getPic();
  }, []);

  return (
    <div className="containerPic">
      <div className="buttonContainer">
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick(0)}
        >
          ⏮
        </button>
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick("Previous")}
        >
          ⏪
        </button>
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick("Next")}
        >
          ⏩
        </button>
        <button
          type="button"
          className="picButton"
          onClick={() => handleButtonClick("Last")}
        >
          ⏭
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
