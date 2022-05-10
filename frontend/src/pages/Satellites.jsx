import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Titre from "../components/Titre";
import HoverInfo from "../components/Satellites/HoverInfo";
import Loader from "../components/Loader";
import "../styles/Satellites.scss";
import categories from "../components/Datas/categories";

export default function Satellites() {
  const [showLoader, setShowLoader] = useState(true);
  const [satList, setSatList] = useState([]);
  const [globeRadius, setGlobeRadius] = useState();
  let hoverInfo = {
    satname: "",
    satalt: "",
    satcat: [],
    satLaunchDate: "",
    satObsDate: "",
  };

  const keywords = useRef([]);
  const myGlobe = useRef();
  const [filteredSatList, setFilteredSatList] = useState([]);
  const baseHeight = useRef(window.innerHeight - 400);
  const baseWidth = useRef(window.innerWidth);
  if (baseWidth.current > 768) baseWidth.current = window.innerWidth - 164;
  else baseHeight.current = window.innerHeight - 464;
  const addFilter = useRef([]);
  const excludeFilter = useRef([]);

  const EARTH_RADIUS_KM = 6371; // km
  const SAT_SIZE = 100; // km

  const getTooltip = (d) => {
    // pas vraiment utilisé, en attente de débug
    if (d) {
      const tooltipDatas = {
        satname: d.satname,
        satalt: d.satalt,
        satcat: d.category_name,
        satLaunchDate: d.satLaunchDate,
        satObsDate: d.satObsDate,
      };
      hoverInfo = { ...tooltipDatas };
      console.warn(hoverInfo); // juste pour la démo !!
      return <div>{d.satname}</div>;
    }
    return null;
  };

  const getColorFromCategory = (cat) => {
    let catId = "";
    for (let i = 0; i < categories.length && catId === ""; i += 1)
      if (categories[i].name === cat) catId = categories[i].id;

    return `rgb(${catId * 4},${255 - catId * 4},${Math.min(255, catId * 8)})`;
  };

  const drawGlobe = () => {
    if (satList.length > 0) {
      setGlobeRadius(myGlobe.current.getGlobeRadius());

      setShowLoader(false);
    }
  };

  const updateGlobe = () => {
    setFilteredSatList(
      satList.filter((sat) => {
        let isInList = false;
        sat.category_name
          .map((cat) => cat.toLowerCase())
          .forEach((cat) => {
            // filtre + sur les catégories
            if (addFilter.current.map((add) => add.toLowerCase()).includes(cat))
              isInList = true;
          });
        if (!isInList)
          addFilter.current.forEach((str) => {
            // filtre + sur les noms
            if (sat.satname.toLowerCase().indexOf(str.toLowerCase()) !== -1)
              isInList = true;
          });

        if (!addFilter.current.length) isInList = true;

        if (isInList)
          sat.category_name
            .map((cat) => cat.toLowerCase())
            .forEach((cat) => {
              // filtre - sur les catégories
              if (
                excludeFilter.current
                  .map((exc) => exc.toLowerCase())
                  .includes(cat)
              )
                isInList = false;
            });
        if (isInList)
          excludeFilter.current.forEach((str) => {
            // filtre - sur les noms
            if (sat.satname.toLowerCase().indexOf(str.toLowerCase()) !== -1)
              isInList = false;
          });

        return isInList;
      })
    );
  };

  const handleAddFilter = (e) => {
    addFilter.current = e;
    updateGlobe();
  };

  const handleExcludeFilter = (e) => {
    excludeFilter.current = e;
    updateGlobe();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/n2yo/catbysatid`)
      .then((catById) => catById.data)
      .then((catById) => {
        const catBySatId = catById;

        axios
          .get(`http://localhost:5000/api/n2yo`)
          .then((res) => res.data)
          .then((res) =>
            setSatList(
              res.map((sat) => {
                return {
                  satlat: sat.satlat,
                  satlng: sat.satlng,
                  satalt: sat.satalt / EARTH_RADIUS_KM,
                  satname: sat.satname,
                  category_name: catBySatId
                    .filter((cat) => cat.satid === sat.satid)
                    .map((cat) => cat.category_name),
                  color: getColorFromCategory(sat.category_name),
                  satObsDate: sat.request_date,
                  satLaunchDate: sat.launch_date,
                };
              })
            )
          );
      });
  }, []);

  useEffect(() => {
    setFilteredSatList(satList);

    if (satList.length) {
      // création des mots clés
      keywords.current = [
        ...new Set(
          satList
            .map((sat) => [
              sat.satname
                // eslint-disable-next-line no-useless-escape
                .split(/[()-\s\./]+/)
                .filter(
                  (str) => str.length > 2 && Number.isNaN(parseInt(str, 10))
                ),
              sat.category_name,
            ])
            .flat(2)
            .map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase())
        ),
      ];
    }

    drawGlobe();
  }, [satList]);

  const customThreeObject = (d) => {
    // bottleneck !!!!
    if (!satList.length) return null;

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
    if (!satList.length) return null;

    return Object.assign(
      obj.position,
      myGlobe.current.getCoords(d.satlat, d.satlng, d.satalt)
    );
  };

  const refTypeAhead = useRef();

  return (
    <div className="globalContainerSat">
      <Titre titre="Satellites 3D view" />
      {showLoader && (
        <div className="loaderContainer">
          <Loader />
        </div>
      )}
      <div className="globeHeader">
        {keywords.current.length ? (
          <>
            <Typeahead
              id="filterAdd"
              labelKey="name"
              multiple
              options={keywords.current}
              placeholder="Add a keyword..."
              ref={refTypeAhead}
              onChange={handleAddFilter}
            />
            <Typeahead
              id="filterExclude"
              labelKey="name"
              multiple
              options={keywords.current}
              placeholder="Exclude a keyword..."
              ref={refTypeAhead}
              onChange={handleExcludeFilter}
            />
          </>
        ) : null}
      </div>
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
      <HoverInfo key={hoverInfo} data={hoverInfo} />
      <div className="nbRenderedItem">
        {filteredSatList.length} satellites rendered
      </div>
    </div>
  );
}
