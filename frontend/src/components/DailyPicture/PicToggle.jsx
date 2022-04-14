import React from "react";
import PropTypes from "prop-types";
import openImage from "../../assets/annuler.png";

export default function PicToggle({ handleTogglePic }) {
  const styleToggle = {};
  styleToggle.clipPath = `polygon(0 0,150px 0, 150px 150px)`;

  // baseHeight

  return (
    <div
      className="picToggle"
      onClick={handleTogglePic}
      onKeyPress={handleTogglePic}
      role="button"
      tabIndex={0}
      style={styleToggle}
    >
      <img className="picToggleImg" src={openImage} alt="more info" />
    </div>
  );
}

PicToggle.propTypes = {
  handleTogglePic: PropTypes.func.isRequired,
  // baseHeight: PropTypes.number,
};

// PicToggle.defaultProps = {
//   baseHeight: false,
// };
