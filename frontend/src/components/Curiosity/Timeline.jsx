import React from "react";
import "../../styles/Timeline.scss";
import timeLinePic from "../../assets/Timeline.png";

export default function Timeline() {
  return (
    <div className="timelineCuriosity">
      <img className="timelineImg" src={timeLinePic} alt="planet mars" />
    </div>
  );
}
