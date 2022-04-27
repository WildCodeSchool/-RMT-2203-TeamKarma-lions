import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function EpicPictures({ epicPicture }) {
  if ({ epicPicture }.epicPicture) {
    let picturesDate = moment({ epicPicture }.epicPicture).format("YYYY-MM-DD");

    if (picturesDate > moment().format("YYYY-MM-DD")) {
      picturesDate = moment().format("YYYY-MM-DD");
    }

    if (picturesDate < "2015-09-01") {
      picturesDate = "2015-09-01";
    }

    const fetchEpicPictures = (date) => {
      axios
        .get(`https://epic.gsfc.nasa.gov/api/enhanced/date/${date}`)
        .then((response) => response.data)
        .then((data) => {
          if (data.length === 0) {
            const subDay = moment(date, "YYYY-MM-DD").subtract(1, "days");
            fetchEpicPictures(subDay.format("YYYY-MM-DD"));
          } else {
            const data2 = data.map((element) => element.image);
            data2.unshift(moment(date, "YYYY-MM-DD").format("YYYY/MM/DD"));
            return data2;
          }
        });
    };

    useEffect(() => {
      fetchEpicPictures(picturesDate);
    }, [epicPicture]);
  }
  return <div>test</div>;
}
