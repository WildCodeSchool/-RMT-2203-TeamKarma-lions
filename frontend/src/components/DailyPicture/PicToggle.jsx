import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function PicToggle({ handleTogglePic, showPic }) {
  const styleToggle = {};
  styleToggle.clipPath = `polygon(0 0,150px 0, 150px 150px)`;

  // baseHeight

  const [verticalClass, setVerticalClass] = useState("bar vertical");
  const [showPicDone, setShowPicDone] = useState(false);

  useEffect(() => {
    console.log(showPic, showPicDone, verticalClass);

    if (showPic > 0 && verticalClass === "bar vertical")
      setVerticalClass("bar vertical verticalToHorizontal");

    if (showPic === 1) setShowPicDone(true);

    if (showPic < 1 && showPicDone) setVerticalClass("bar vertical");

    if (showPic === 0 && !showPicDone) setShowPicDone(false);
  }, [showPic]);

  return (
    <div
      className="picToggle"
      onClick={handleTogglePic}
      onKeyPress={handleTogglePic}
      role="button"
      tabIndex={0}
      style={styleToggle}
    >
      <div className="picToggleCircleContainer">
        <div className="picToggleCircle">
          <div className="bar horizontal" />
          <div className={verticalClass} />
        </div>
      </div>
    </div>
  );
}

PicToggle.propTypes = {
  handleTogglePic: PropTypes.func.isRequired,
  showPic: PropTypes.number.isRequired,
};

// PicToggle.defaultProps = {
//   baseHeight: false,
// };
