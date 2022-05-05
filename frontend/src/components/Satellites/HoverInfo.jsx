import React, { useState, useEffect } from "react";

const EARTH_RADIUS_KM = 6371; // km

export default function HoverInfo({ data }) {
  useEffect(() => {
    console.log("render HoverInfo Component");
  });

  return (
    <div className="hoverContent">
      {data.satname && (
        <>
          <div>
            name : {data.satname} launch date : {data.satLaunchDate}
          </div>
          <div>
            data date : {data.satObsDate} altitude :{" "}
            {data.satalt * EARTH_RADIUS_KM}km
          </div>
          <div>
            Categories :{" "}
            {data.satcat.map((cat, catIndex) =>
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
