import React, { useEffect, useState, useRef, memo, useContext } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import ToolTipContext from "../../contexts/Tooltip";

const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 100; // km

export default memo(function GlobeContainer({ filteredSatListAsProps }) {
  const [globeRadius, setGlobeRadius] = useState();
  const [filteredSatList, setFilteredSatList] = useState(
    filteredSatListAsProps
  );
  const tooltip = useContext(ToolTipContext);
  const myGlobe = useRef();

  const baseHeight = useRef(window.innerHeight - 400);
  const baseWidth = useRef(document.body.clientWidth);
  if (baseWidth.current > 768)
    baseWidth.current = document.body.clientWidth - 164;
  else baseHeight.current = window.innerHeight - 464;

  if (baseHeight.current > baseWidth.current * 1.5)
    baseHeight.current = baseWidth.current * 1.5;

  const getTooltip = (d) => {
    if (d) {
      tooltip.satname = d.satname;
      tooltip.satalt = d.satalt;
      tooltip.satcat = d.category_name;
      tooltip.satLaunchDate = d.satLaunchDate;
      tooltip.satObsDate = d.satObsDate;
    }
    return null;
  };

  const resizeGlobe = () => {
    baseHeight.current = window.innerHeight - 400;
    baseWidth.current = document.body.clientWidth;
    if (baseWidth.current > 768)
      baseWidth.current = document.body.clientWidth - 164;
    else baseHeight.current = window.innerHeight - 464;
  };

  const customThreeObject = (d) => {
    // bottleneck !!!!
    if (!filteredSatList.length) return null;

    return new THREE.Mesh(
      new THREE.OctahedronGeometry(
        ((SAT_SIZE * globeRadius) / EARTH_RADIUS_KM / 2) * (1 + d.satalt * 0.5),
        0
      ),
      new THREE.MeshLambertMaterial({
        color: d.color,
        transparent: true,
        opacity: 0.7,
      })
    );
  };

  const customThreeObjectUpdate = (obj, d) => {
    if (!filteredSatList.length) return null;

    return Object.assign(
      obj.position,
      myGlobe.current.getCoords(d.satlat, d.satlng, d.satalt)
    );
  };

  useEffect(() => {
    window.addEventListener("resize", resizeGlobe);

    return () => {
      window.removeEventListener("resize", resizeGlobe);
    };
  }, []);

  useEffect(() => {
    if (filteredSatListAsProps.length > 0) {
      setGlobeRadius(myGlobe.current.getGlobeRadius());
      setFilteredSatList(filteredSatListAsProps);
    }
  }, [filteredSatListAsProps]);

  return (
    <div id="globeContainerSat">
      <Globe
        ref={myGlobe}
        globeImageUrl="../src/assets/earth-blue-marble.jpg"
        bumpImageUrl="../src/assets/earth-topology.png"
        backgroundImageUrl="../src/assets/night-sky.png"
        height={baseHeight.current}
        width={baseWidth.current}
        customLayerData={filteredSatList}
        customThreeObject={customThreeObject}
        customThreeObjectUpdate={customThreeObjectUpdate}
        onCustomLayerHover={getTooltip}
        enablePointerInteraction
      />
    </div>
  );
});
