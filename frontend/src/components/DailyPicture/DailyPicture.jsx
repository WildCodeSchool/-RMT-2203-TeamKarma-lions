import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/DailyPicture.scss";
import PicPicture from "./PicPicture";
import PicDescrition from "./PicDescrition";

const API_KEY = "bMqccA5lJ3eoRSDx90IuwirLCn5kikVqOxDymCp0";

export default function DailyPicture() {
  const [dailyPic, setDailyPic] = useState({});
  const [cropPic, setCropPic] = useState(true);
  const [showPic, setShowPic] = useState(0);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then((res) => res.data)
      .then((res) => setDailyPic(res)); // le chargement de l'image doit être une promesse !!
  }, []);

  const animation = (startTime, AnimationDuration) => {
    const now = new Date().getTime();
    if (now - startTime < AnimationDuration) {
      const showPicVal = ((now - startTime) / AnimationDuration) * 100;
      console.log(showPicVal);
      setShowPic(showPicVal);
      requestAnimationFrame(() => animation(startTime, AnimationDuration));
    } else setShowPic(100);
  };

  useEffect(() => {
    if (!cropPic) {
      // workaround à la con qui ne marche pas car le useEffect se lance direct
      console.log("useEffect cropPic");
      const startTime = new Date().getTime();
      const AnimationDuration = 2000;
      animation(startTime, AnimationDuration);
    }
  }, [cropPic]);

  const handleTogglePic = () => setCropPic(!cropPic);

  return (
    <div className="dailyPicContainer">
      <PicPicture
        url={dailyPic.url}
        handleTogglePic={handleTogglePic}
        showPic={showPic}
      />
      <PicDescrition dailyPic={dailyPic} />
    </div>
  );
}
