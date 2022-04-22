import React, { useEffect } from "react";
import axios from "axios";
import "../../styles/CuriosityPics.scss";
import PicCard from "./PicCard";

export default function CuriosityPics() {
  const [picList, setPicList] = React.useState([]);

  const getPic = () => {
    axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-4-10&api_key=ld3yHUvzO7DyXL6lzXi5jSTRd4bGpdfKgBGpjNUg"
      )
      .then((response) => response.data)
      .then((data) => {
        // console.log(data.photos);
        setPicList(data.photos);
      });
  };

  useEffect(() => {
    getPic();
  }, []);

  return (
    <div className="containerPic">
      <button type="button" onClick={getPic}>
        Click to see random photo
      </button>
      <div className="gridpics">
        {picList.map((pic, index) =>
          index < 20 ? <PicCard pic={pic} key={pic.id} /> : null
        )}
      </div>
    </div>
  );
}
