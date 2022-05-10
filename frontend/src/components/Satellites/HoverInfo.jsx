import React, { useContext, useEffect, useState, useRef } from "react";
import ToolTipContext from "../../contexts/Tooltip";

const EARTH_RADIUS_KM = 6371; // km

export default function HoverInfo() {
  const tooltip = useContext(ToolTipContext);
  const [render, setRender] = useState(false);
  // const lastUpdateTime = useRef(new Date().getTime());

  // useEffect(() => {
  //   console.log("** render HoverInfo", tooltip);
  //   console.log("render HoverInfo", render);
  // });

  useEffect(() => {
    // const now = new Date().getTime();
    // console.log("HoverInfo try to render", now - lastUpdateTime.current);
    // if (now - lastUpdateTime.current > 500) {
    // console.log("HoverInfo should render", now - lastUpdateTime.current);
    setRender(!render);
    // lastUpdateTime.current = new Date().getTime();
    // }
  }, [{ tooltip }]);

  return (
    <div className="hoverContent">
      {tooltip && tooltip.satname && (
        <>
          <div>
            name : {tooltip.satname} launch date : {tooltip.satLaunchDate}
          </div>
          <div>
            tooltip date : {tooltip.satObsDate} altitude :{" "}
            {tooltip.satalt * EARTH_RADIUS_KM}km
          </div>
          <div>
            Categories :{" "}
            {tooltip.satcat.map((cat, catIndex) =>
              catIndex ? (
                <span key={cat}>, {cat}</span>
              ) : (
                <span key={cat}>{cat}</span>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
