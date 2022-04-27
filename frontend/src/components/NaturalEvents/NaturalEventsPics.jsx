import React from "react";
// import axios from "axios";

export default function NaturalEventsPics() {
  const getPicEvent = () => {
    // axios
    //   .get("https://eonet.gsfc.nasa.gov/api/v3/events")
    //   .then((response) => response.data)
    //   .then((data) => {});
  };
  return (
    <div>
      <button type="button" onClick={getPicEvent}>
        Natural Events
      </button>
    </div>
  );
}
