import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PicToggle from "./PicToggle";
import PicDescrition from "./PicDescrition";

export default function PicPicture({
  url,
  handleTogglePic,
  showPic,
  dailyPic,
  cropPic,
}) {
  const [imgState, setImgState] = useState("noImg");
  const [backgroundImage, setBackgroundImage] = useState({});

  const calcBackgroundImage = (urlraw, imgLoaded = false) => {
    const styleObj = {};

    if (document.getElementsByClassName("picPicture")[0]) {
      const baseHeight =
        document.getElementsByClassName("picPicture")[0].clientHeight;
      const baseWidth =
        document.getElementsByClassName("picPicture")[0].clientWidth;

      if (baseWidth > baseHeight) {
        const totalDistance = baseHeight / 2 + baseWidth;
        const currentDistance = totalDistance * showPic;

        const topDot =
          baseWidth -
          baseHeight / 2 -
          Math.min(currentDistance, baseWidth - baseHeight / 2);
        const leftDot =
          baseHeight / 2 + Math.min(currentDistance, baseHeight / 2);

        styleObj.clipPath = `polygon(${topDot}px ${
          topDot === 0 ? currentDistance - (baseWidth - baseHeight / 2) : 0
        }px,
      ${
        baseWidth -
        baseHeight / 2 -
        Math.min(currentDistance, baseWidth - baseHeight / 2)
      }px 0,
         100% 0, 
         100% ${leftDot}px,
         ${
           leftDot === baseHeight
             ? baseWidth - (currentDistance - baseHeight / 2)
             : baseWidth
         }px ${leftDot}px)`;
      } else {
        const totalDistance = baseWidth / 2 + baseHeight;
        const currentDistance = totalDistance * showPic;

        const topDot = baseWidth / 2 - Math.min(currentDistance, baseWidth / 2);
        const leftDot =
          baseWidth / 2 + Math.min(currentDistance, baseHeight - baseWidth / 2);

        styleObj.clipPath = `polygon(${topDot}px ${
          topDot === 0 ? currentDistance - baseWidth / 2 : 0
        }px,
         ${topDot}px 0,
         100% 0, 
         100% ${leftDot}px,
         ${
           leftDot === baseHeight
             ? baseWidth - (currentDistance - (baseHeight - baseWidth / 2))
             : baseWidth
         }px ${leftDot}px)`;
      }

      if (showPic) styleObj.zIndex = 100;
    }

    if (imgLoaded) styleObj.backgroundImage = `url(${urlraw})`;

    return styleObj;
  };

  useEffect(() => {
    if (imgState === "loaded")
      setBackgroundImage(calcBackgroundImage(url, true));

    if (url !== "" && imgState === "noImg") {
      const img = new Image();
      img.src = url;
      img.addEventListener("load", () => {
        setImgState("loaded");
      });

      window.addEventListener("resize", () => {
        setBackgroundImage(calcBackgroundImage(url, true));
      });
    }
  }, [url, imgState, showPic]);

  return (
    <div className="picPicture" style={backgroundImage}>
      <PicToggle handleTogglePic={handleTogglePic} showPic={showPic} />
      <PicDescrition
        title={dailyPic.title}
        explanation={dailyPic.explanation}
        date={dailyPic.date}
        copyright={dailyPic.copyright}
        showDes={!cropPic}
      />
    </div>
  );
}

PicPicture.propTypes = {
  url: PropTypes.string,
  handleTogglePic: PropTypes.func.isRequired,
  showPic: PropTypes.number.isRequired,
};

PicPicture.defaultProps = {
  url: "",
};
