import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Titre from "../components/Titre";
import "../styles/Satellites.scss";

const categories = [
  {
    id: 1,
    name: "Brightest",
  },
  {
    id: 2,
    name: "ISS",
  },
  {
    id: 3,
    name: "Weather",
  },
  {
    id: 4,
    name: "NOAA",
  },
  {
    id: 5,
    name: "GOES",
  },
  {
    id: 6,
    name: "Earth resources",
  },
  {
    id: 7,
    name: "Search & rescue",
  },
  {
    id: 8,
    name: "Disaster monitoring",
  },
  {
    id: 9,
    name: "Tracking and Data Relay Satellite System",
  },
  {
    id: 10,
    name: "Geostationary",
  },
  {
    id: 11,
    name: "Intelsat",
  },
  {
    id: 12,
    name: "Gorizont",
  },
  {
    id: 13,
    name: "Raduga",
  },
  {
    id: 14,
    name: "Molniya",
  },
  {
    id: 15,
    name: "Iridium",
  },
  {
    id: 16,
    name: "Orbcomm",
  },
  {
    id: 17,
    name: "Globalstar",
  },
  {
    id: 18,
    name: "Amateur radio",
  },
  {
    id: 19,
    name: "Experimental",
  },
  {
    id: 20,
    name: "Global Positioning System (GPS) Operational",
  },
  {
    id: 21,
    name: "Glonass Operational",
  },
  {
    id: 22,
    name: "Galileo",
  },
  {
    id: 23,
    name: "Satellite-Based Augmentation System",
  },
  {
    id: 24,
    name: "Navy Navigation Satellite System",
  },
  {
    id: 25,
    name: "Russian LEO Navigation",
  },
  {
    id: 26,
    name: "Space & Earth Science",
  },
  {
    id: 27,
    name: "Geodetic",
  },
  {
    id: 28,
    name: "Engineering",
  },
  {
    id: 29,
    name: "Education",
  },
  {
    id: 30,
    name: "Military",
  },
  {
    id: 31,
    name: "Radar Calibration",
  },
  {
    id: 32,
    name: "CubeSats",
  },
  {
    id: 33,
    name: "XM and Sirius",
  },
  {
    id: 34,
    name: "TV",
  },
  {
    id: 35,
    name: "Beidou Navigation System",
  },
  {
    id: 36,
    name: "Yaogan",
  },
  {
    id: 37,
    name: "Westford Needles",
  },
  {
    id: 38,
    name: "Parus",
  },
  {
    id: 39,
    name: "Strela",
  },
  {
    id: 40,
    name: "Gonets",
  },
  {
    id: 41,
    name: "Tsiklon",
  },
  {
    id: 42,
    name: "Tsikada",
  },
  {
    id: 43,
    name: "O3B Networks",
  },
  {
    id: 44,
    name: "Tselina",
  },
  {
    id: 45,
    name: "Celestis",
  },
  {
    id: 46,
    name: "IRNSS",
  },
  {
    id: 47,
    name: "QZSS",
  },
  {
    id: 48,
    name: "Flock",
  },
  {
    id: 49,
    name: "Lemur",
  },
  {
    id: 50,
    name: "Global Positioning System (GPS) Constellation",
  },
  {
    id: 51,
    name: "Glonass Constellation",
  },
  {
    id: 52,
    name: "Starlink",
  },
  {
    id: 53,
    name: "OneWeb",
  },
  {
    id: 54,
    name: "Chinese Space Station",
  },
];

export default function Satellites() {
  const [satList, setSatList] = useState([]);
  const [globeRadius, setGlobeRadius] = useState();
  const [hoverInfo, setHoverInfo] = useState({
    satname: "",
    satalt: "",
    satcat: [],
    satLaunchDate: "",
    satObsDate: "",
  });

  const keywords = useRef([]);
  const myGlobe = useRef();
  const [filteredSatList, setFilteredSatList] = useState([]);
  const baseHeight = useRef(window.innerHeight - 400);
  const baseWidth = useRef(window.innerWidth);
  const addFilter = useRef([]);
  const excludeFilter = useRef([]);

  const EARTH_RADIUS_KM = 6371; // km
  const SAT_SIZE = 100; // km

  const getTooltip = (d) => {
    if (d) {
      const tooltipDatas = {
        satname: d.satname,
        satalt: d.satalt,
        satcat: d.category_name,
        satLaunchDate: d.satLaunchDate,
        satObsDate: d.satObsDate,
      };
      setHoverInfo(tooltipDatas);
    }
  };

  const getColorFromCategory = (cat) => {
    let catId = "";
    for (let i = 0; i < categories.length && catId === ""; i++)
      if (categories[i].name === cat) catId = categories[i].id;

    return `rgb(${catId * 4},${255 - catId * 4},${Math.min(255, catId * 8)})`;
  };

  const drawGlobe = () => {
    if (satList.length > 0) {
      if (baseWidth.current > 768) baseWidth.current -= 164;
      else baseHeight.current -= 64;
      setGlobeRadius(myGlobe.current.getGlobeRadius());
    }
  };

  const updateGlobe = () => {
    console.log("updateGlobe");

    setFilteredSatList(
      satList.filter((sat) => {
        let isInList = false;
        sat.category_name.forEach((cat) => {
          // filtre + sur les catégories
          if (addFilter.current.includes(cat)) isInList = true;
        });
        if (!isInList)
          addFilter.current.forEach((str) => {
            // filtre + sur les noms
            if (sat.satname.toLowerCase().indexOf(str.toLowerCase()) !== -1)
              isInList = true;
          });

        if (!addFilter.current.length) isInList = true;

        if (isInList)
          sat.category_name.forEach((cat) => {
            // filtre - sur les catégories
            if (excludeFilter.current.includes(cat)) isInList = false;
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
    <div className="globalContainer">
      <Titre titre="Satellites 3D view" />
      <div className="globeHeader">
        {keywords.current.length && (
          <Typeahead
            id="filterAdd"
            labelKey="name"
            multiple
            options={keywords.current}
            placeholder="Add a keyword..."
            ref={refTypeAhead}
            onChange={handleAddFilter}
          />
        )}
        {keywords.current.length && (
          <Typeahead
            id="filterExclude"
            labelKey="name"
            multiple
            options={keywords.current}
            placeholder="Exclude a keyword..."
            ref={refTypeAhead}
            onChange={handleExcludeFilter}
          />
        )}
      </div>
      <div id="globeContainer">
        <Globe
          ref={myGlobe}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          height={baseHeight.current}
          width={baseWidth.current}
          customLayerData={filteredSatList}
          customThreeObject={customThreeObject}
          customThreeObjectUpdate={customThreeObjectUpdate}
          onCustomLayerHover={getTooltip}
          enablePointerInteraction
        />
      </div>
      <div className="hoverContent">
        {hoverInfo.satname && (
          <>
            <div>
              name : {hoverInfo.satname} launch date : {hoverInfo.satLaunchDate}
            </div>
            <div>
              data date : {hoverInfo.satObsDate} altitude :{" "}
              {hoverInfo.satalt * EARTH_RADIUS_KM}km
            </div>
            <div>
              Categories :{" "}
              {hoverInfo.satcat.map((cat, catIndex) =>
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
      <div className="nbRenderedItem">
        {filteredSatList.length} satellites rendered
      </div>
    </div>
  );
}
