import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function PicDescrition({
  title,
  explanation,
  date,
  copyright,
  showDes,
}) {
  const [classList, setClassList] = useState("picDescription dNone");

  useEffect(() => {
    if (showDes) {
      setClassList("picDescription");
      setTimeout(() => {
        setClassList("picDescription picDescriptionAnimation");
      }, 50);
    } else {
      setClassList("picDescription");
      setTimeout(() => {
        setClassList("picDescription dNone");
      }, 400);
    }
  }, [showDes]);

  return (
    <div className={classList}>
      <h3>{title}</h3>
      <p>{explanation}</p>
      <p className="picDescriptionDate">
        {date} {copyright}
      </p>
    </div>
  );
}

PicDescrition.propTypes = {
  title: PropTypes.string,
  explanation: PropTypes.string,
  date: PropTypes.string,
  copyright: PropTypes.string,
  showDes: PropTypes.bool,
};

PicDescrition.defaultProps = {
  title: "",
  explanation: "",
  date: "",
  copyright: "",
  showDes: false,
};
