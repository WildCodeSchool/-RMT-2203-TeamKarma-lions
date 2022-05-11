import React, { useContext, useEffect, useState } from "react";
import ToolTipContext from "../../contexts/Tooltip";

const EARTH_RADIUS_KM = 6371; // km

export default function HoverInfo() {
  const tooltip = useContext(ToolTipContext);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(!render);
  }, [{ tooltip }]);

  return (
    <div className="hoverContent">
      {tooltip && tooltip.satname && (
        <>
          <div>
            <div>
              Name : <span>{tooltip.satname}</span>
            </div>
            <div>
              Altitude :{" "}
              <span>{Math.round(tooltip.satalt * EARTH_RADIUS_KM)}km</span>
            </div>
          </div>
          <div>
            <div>
              Launch date : <span>{tooltip.satLaunchDate.split("T")[0]}</span>
            </div>
            <div>
              Observation date : <span>{tooltip.satObsDate.split("T")[0]}</span>
            </div>
          </div>
          <div className="hoverContentCategories">
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
