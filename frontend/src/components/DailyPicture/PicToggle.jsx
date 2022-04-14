import React from "react";
import PropTypes from "prop-types";

export default function PicToggle({ handleTogglePic }) {
  return (
    <div className="picToggle" onClick={handleTogglePic}>
      PicToggle
    </div>
  );
}

PicToggle.propTypes = {
  handleTogglePic: PropTypes.func.isRequired,
};
