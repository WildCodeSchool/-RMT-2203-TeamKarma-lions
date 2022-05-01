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

const latArray = [-45, 45];
const lonArray = [-90, 0, 90, 180];

const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
mysql
  .createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  })
  .then((connection) => {
    categoriesIndex = 0;
    latArrayIndex = 0;
    lonArrayIndex = 0;

    connection
      .query(
        `select category_name, obslat, obslng from n2yo order by request_date desc limit 1`
      )
      .then((res) => console.log(res));
  });

// const N2yoManager = require("../models/N2yoManager");

// console.log("N2yoManager", N2yoManager);

// faire un tableau des coordonnées à sonder
// rajouter dans table infos sur coordonnées sondées

function populateDatabase() {
  console.log(N2yoManager.findLatest());

  // récupérer dernier enregistrement dans la table

  console.log("interval");
}

module.exports = populateDatabase;
