import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import EpicCard from "./EpicCard";
import "../../styles/CalendarOps.scss";

export default function EpicPictures() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [tableEpic, setTableEpic] = useState([]);

  if ({ calendarDate }.calendarDate) {
    let picturesDate = moment({ calendarDate }.calendarDate).format(
      "YYYY-MM-DD"
    );

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
            const data3 = data2.map(
              (elem) =>
                `https://epic.gsfc.nasa.gov/archive/natural/${moment(
                  date,
                  "YYYY-MM-DD"
                ).format("YYYY/MM/DD")}/png/${elem}.png`
            );
            setTableEpic(data3);
          }
        });
    };

    useEffect(() => {
      fetchEpicPictures(picturesDate);
    }, [calendarDate]);
  }

  const [positionIndex, setPositionIndex] = useState(0);

  const nbPerPage = 1;

  const handleButtonClick = (action) => {
    if (typeof action === "string") {
      if (action === "Previous") {
        if (positionIndex !== 0) {
          setPositionIndex(positionIndex - nbPerPage);
        }
      }
      if (action === "Next") {
        if (positionIndex + nbPerPage < tableEpic.length) {
          setPositionIndex(positionIndex + nbPerPage);
        }
      }
      if (action === "Last") {
        if (tableEpic.length > nbPerPage) {
          setPositionIndex((Math.ceil(tableEpic.length / nbPerPage) - 1) * 20);
        }
      }
    } else {
      setPositionIndex(action * nbPerPage);
    }
  };

  return (
    <div>
      <div>
        <Calendar onChange={setCalendarDate} value={calendarDate} />
      </div>
      <div>
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
            {tableEpic.map((pic, index) =>
              index >= positionIndex && index < nbPerPage + positionIndex ? (
                <EpicCard pic={pic} key={pic.id} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
