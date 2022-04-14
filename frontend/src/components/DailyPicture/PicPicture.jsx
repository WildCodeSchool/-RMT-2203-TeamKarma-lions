import React from "react";
import PropTypes from "prop-types";
import PicToggle from "./PicToggle";

export default function PicPicture({ url, handleTogglePic, showPic }) {
  const setBackgroundImage = (urlraw) => {
    const styleObj = {
      clipPath: `polygon(100% 0,
         ${50 - showPic / 2}% 0, 
         100% ${50 + showPic / 2}%, 
         100% 100%)`,
    };

    if (urlraw) styleObj.backgroundImage = `url(${urlraw})`;

    return styleObj;
  };

  return (
    <div className="picPicture" style={setBackgroundImage(url)}>
      <PicToggle handleTogglePic={handleTogglePic} />
    </div>
  );
}

PicPicture.propTypes = {
  url: PropTypes.string,
  handleTogglePic: PropTypes.func.isRequired,
  showPic: PropTypes.number.isRequired,
};

PicPicture.defaultProps = {
  url: false,
};
