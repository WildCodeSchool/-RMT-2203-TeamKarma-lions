import React from "react";
import PropTypes from "prop-types";

export default function PicDescrition({ dailyPic }) {
  console.log(dailyPic);
  return (
    <div className="picDescription">
      <h3>{dailyPic.title}</h3>
      <p>{dailyPic.explanation}</p>
      <p>
        {dailyPic.date} {dailyPic.copyright}
      </p>
    </div>
  );
}

PicDescrition.propTypes = {
  dailyPic: PropTypes.exact({
    title: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    copyright: PropTypes.string.isRequired,
  }),
};

PicDescrition.defaultProps = {
  dailyPic: {
    title: "",
    explanation: "",
    date: "",
    copyright: "",
  },
};
