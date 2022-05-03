import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import EpicCard from "./EpicCard";
import "../../styles/CalendarOps.scss";
import "../../styles/EpicPictures.scss";

export default function EpicPictures() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [tableEpic, setTableEpic] = useState([]);
  const [eventDate, setEventDate] = useState("");

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

    useEffect(() => {
      if (eventDate) fetchEpicPictures(eventDate);
    }, [eventDate]);
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
  }, [calendarDate, eventDate]);

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

  const handleEpicChange = (elem) => {
    setEventDate(elem.target.value);
  };

  return (
    <div className="EpicPictures">
      <div className="introCalendar">
        <p className="intropage">
          <span className="police">EPIC</span> (Earth Polychromatic Imaging
          Camera) is a 10-channel spectroradiometer onboard NOAA’s DSCOVR (Deep
          Space Climate Observatory) spacecraft. EPIC provides 10 narrow band
          spectral images of{" "}
          <span className="police"> the entire sunlit face of Earth</span> using
          a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a
          30-cm aperture Cassegrain telescope.{" "}
          <span className="police">The DSCOVR spacecraft</span> is located at
          the Earth-Sun Lagrange-1 (L-1) point giving EPIC a unique angular
          perspective that will be used in science applications to measure
          ozone, aerosols, cloud reflectivity, cloud height, vegetation
          properties, and UV radiation estimates at{" "}
          <span className="police">the Earth&apos;s surface</span>.
        </p>
        <div className="Calendar">
          <p>
            Select a date to see an{" "}
            <span className="police">&quot;epic&quot;</span> slideshow !
          </p>
          <Calendar onChange={setCalendarDate} value={calendarDate} />
        </div>
      </div>

      <div className="epicEventSelector">
        <select value={eventDate} onChange={handleEpicChange}>
          <option value="">none </option>
          <option value="2021-02-11">
            Lunar Transit 2021 - February 11, 2021
          </option>
          <option value="2020-09-12">
            West Coast Wildfires - September 12, 2020
          </option>
          <option value="2020-06-21">
            Annular Solar Eclipse 2020 - June 21, 2020
          </option>
          <option value="2018-04-21">
            Examples of Sun Glints - April 21, 2018
          </option>
          <option value="2017-08-21">
            Total Solar Eclipse - August 21, 2017
          </option>
          <option value="2017-08-21">Lunar Transit 2016 - July 05, 2016</option>
          <option value="2016-07-05">
            Sunglints from Ice Crystals seen from Deep Space - May 15, 2017
          </option>
          <option value="2017-02-26">
            Annular Solar Eclipse 2017 - February 26, 2017
          </option>
          <option value="2016-03-09">
            Solar Eclipse 2016 - March 09, 2016
          </option>
        </select>
      </div>

      <div className="epicDiaporama">
        <div className="epicpics">
          {tableEpic.map((pic, index) =>
            index >= positionIndex && index < nbPerPage + positionIndex ? (
              <EpicCard pic={pic} key={pic} />
            ) : null
          )}
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
              onClick={() => handleButtonClick("Diapo")}
            >
              <img src="../src/assets/playpause.png" alt="play and stop" />
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
        </div>
      </div>
    </div>
  );
}
