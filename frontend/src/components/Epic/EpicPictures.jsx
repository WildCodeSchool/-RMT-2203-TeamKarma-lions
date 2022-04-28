import React, { useEffect, useState, useRef } from "react";
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

  const diapoOn = useRef(false);
  const interval = useRef(null);
  const nbPerPage = 1;

  const lauchdiapo = (position) => {
    let newPosition = position;
    interval.current = setInterval(() => {
      newPosition += 1;
      if (newPosition > tableEpic.length - 1) newPosition = 0;
      setPositionIndex(newPosition);
    }, 600);
  };

  const stopDiapo = () => {
    if (diapoOn.current) {
      diapoOn.current = false;
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  useEffect(() => {
    return stopDiapo();
  }, [calendarDate]);

  const handleButtonClick = (action) => {
    if (typeof action === "string") {
      if (action === "Diapo") {
        if (!diapoOn.current) {
          diapoOn.current = true;
          lauchdiapo(positionIndex);
        } else {
          diapoOn.current = false;
          clearInterval(interval.current);
          interval.current = null;
        }
      }

      if (action === "Previous") {
        if (positionIndex !== 0) {
          stopDiapo();
          setPositionIndex(positionIndex - nbPerPage);
        }
      }
      if (action === "Next") {
        if (positionIndex + nbPerPage < tableEpic.length) {
          stopDiapo();
          setPositionIndex(positionIndex + nbPerPage);
        }
      }
      if (action === "Last") {
        if (tableEpic.length > nbPerPage) {
          stopDiapo();
          setPositionIndex(
            (Math.ceil(tableEpic.length / nbPerPage) - 1) * nbPerPage
          );
        }
      }
    } else {
      stopDiapo();
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
              onClick={() => handleButtonClick("Diapo")}
            >
              ⏯️
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
                <EpicCard pic={pic} key={pic} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
