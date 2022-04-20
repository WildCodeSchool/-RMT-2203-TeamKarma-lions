import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/DailyPicture.scss";
import PicPicture from "./PicPicture";

const API_KEY = "bMqccA5lJ3eoRSDx90IuwirLCn5kikVqOxDymCp0";

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - 2 ** (-5 * x);
}

export default function DailyPicture() {
  const [dailyPic, setDailyPic] = useState({});
  const [cropPic, setCropPic] = useState(true);
  const [showPic, setShowPic] = useState(0);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then((res) => res.data)
      .then((res) => setDailyPic(res)); // le chargement de l'image doit être une promesse !!

    // rajouter ici récupération liste des élements auquel ajouter les classes fadeIn / fadeOut lors du clic sur toggleDailyPicture
  }, []);

  const animation = (startTime, AnimationDuration, reverse = false) => {
    const now = new Date().getTime();
    if (!reverse) {
      if (now - startTime < AnimationDuration) {
        const showPicVal = easeOutExpo((now - startTime) / AnimationDuration);
        // console.log(showPicVal);
        setShowPic(showPicVal);
        requestAnimationFrame(() => animation(startTime, AnimationDuration));
      } else setShowPic(1);
    }
    if (reverse) {
      if (now - startTime < AnimationDuration) {
        const showPicVal = 1 - (now - startTime) / AnimationDuration;
        // console.log(showPicVal);
        setShowPic(showPicVal);
        requestAnimationFrame(() =>
          animation(startTime, AnimationDuration, true)
        );
      } else setShowPic(0);
    }
  };

  useEffect(() => {
    const startTime = new Date().getTime();

    if (!cropPic) {
      const AnimationDuration = 1000;
      animation(startTime, AnimationDuration);
    } else if (showPic > 0.5) {
      const AnimationDuration = 1000;
      animation(startTime, AnimationDuration, true);
    }
  }, [cropPic]);

  const handleTogglePic = () => setCropPic(!cropPic);

  return (
    <div className="dailyPicContainer">
      <PicPicture
        url={dailyPic.url}
        handleTogglePic={handleTogglePic}
        showPic={showPic}
        dailyPic={dailyPic}
        cropPic={cropPic}
      />
    </div>
  );
}
