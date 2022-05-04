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

const latArray = [-90, -45, 0, 45, 90];
const lonArray = [-120, -60, 0, 60, 120, 180];
const axios = require("axios").default;

function fetchN2yo(catIndex, latIndex, lonIndex, apiKey) {
  return axios
    .get(
      `https://api.n2yo.com/rest/v1/satellite/above/${latArray[latIndex]}/${lonArray[lonIndex]}/0/90/${categories[catIndex].id}/&apiKey=${apiKey}`
    )
    .then((res) => res);
}

const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, N2YO_API_KEY } = process.env;
mysql
  .createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  })
  .then((connection) => {
    let categoriesIndex = 0;
    let latArrayIndex = 0;
    let lonArrayIndex = 0;

    connection
      .query(
        `select category_name, obslat, obslng from n2yo order by request_date desc limit 1`
      )
      .then((res) => {
        // console.log(res);
        if (res.length > 0) {
          categories.forEach((cat, catIndex) => {
            if (cat.name === res[0].category_name) categoriesIndex = catIndex;
          });

          latArray.forEach((lat, latIndex) => {
            if (lat === res[0].obslat) latArrayIndex = latIndex;
          });

          lonArray.forEach((lon, lonIndex) => {
            if (lon.name === res[0].obslng) lonArrayIndex = lonIndex;
          });
        }

        // retraiter res pour savoir ou démarrer
        setInterval(() => {
          if (categoriesIndex === categories.length - 1) {
            categoriesIndex = 0;
            if (latArrayIndex === latArray.length - 1) {
              latArrayIndex = 0;
              if (lonArrayIndex === lonArray.length - 1) lonArrayIndex = 0;
              else lonArrayIndex++;
            } else latArrayIndex++;
          } else categoriesIndex++;

          const currentDate = new Date();

          fetchN2yo(
            categoriesIndex,
            latArrayIndex,
            lonArrayIndex,
            N2YO_API_KEY
          ).then((resFetch) => {
            // console.log(resFetch.data);
            if (resFetch.data)
              resFetch.data.above.forEach((sat) => {
                // console.log("sat.launchdate", sat.launchDate);

                connection.query(
                  `insert into n2yo (request_date, category_name, obslat, obslng, satid, satname, int_designator, launch_date, satlat, satlng, satalt) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    currentDate,
                    categories[categoriesIndex].name,
                    latArray[latArrayIndex],
                    lonArray[lonArrayIndex],
                    sat.satid,
                    sat.satname,
                    sat.intDesignator,
                    new Date(
                      parseInt(sat.launchDate.split("-")[0], 10),
                      parseInt(sat.launchDate.split("-")[1], 10) - 1,
                      parseInt(sat.launchDate.split("-")[2], 10)
                    ),
                    sat.satlat,
                    sat.satlng,
                    sat.satalt,
                  ]
                );
              });
          });
        }, 5000);
      });
  });

// module.exports = populateDatabase;
