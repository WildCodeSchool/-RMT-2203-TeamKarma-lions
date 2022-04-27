import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";

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
        .get(`https://epic.gsfc.nasa.gov/api/natural/date/${date}`)
        .then((response) => response.data)
        .then((data) => {
          if (data.length === 0) {
            const subDay = moment(date, "YYYY-MM-DD").subtract(1, "days");
            fetchEpicPictures(subDay.format("YYYY-MM-DD"));
          } else {
            const data2 = data.map((element) => element.image);
            data2.unshift(moment(date, "YYYY-MM-DD").format("YYYY/MM/DD"));
          }
        });
    };

    useEffect(() => {
      fetchEpicPictures(picturesDate);
    }, [epicPicture]);
  }

  const picsdate = "2022/04/13";

  const data2 = [
    "epic_1b_20220413001751",
    "epic_1b_20220413020553",
    "epic_1b_20220413035355",
    "epic_1b_20220413054158",
    "epic_1b_20220413073000",
    "epic_1b_20220413091802",
    "epic_1b_20220413110605",
    "epic_1b_20220413125408",
    "epic_1b_20220413144210",
    "epic_1b_20220413163013",
    "epic_1b_20220413181814",
    "epic_1b_20220413200617",
    "epic_1b_20220413215419",
  ];

  return (
    <div>
      {data2.map((each) => (
        <img
          className="lazy"
          src={`https://epic.gsfc.nasa.gov/archive/natural/${picsdate}/png/${each}.png`}
          alt="sample"
        />
      ))}
    </div>
  );
}
