// import React from "react";
// import axios from "axios";

// export default function CuriosityPics() {
//   const [picList, setPicList] = React.useState();

//   const getPic = () => {
//     axios
//       .get(
//         "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-4-10&api_key=DEMO_KEY"
//       )
//       .then((response) => response.data)
//       .then((data) => {
//         setPicList(data);
//       });
//   };

//   return (
//     <div className="CuriosityPics">
//       <button type="button" onClick={getPic}>
//         Click to see random photo
//       </button>
//     </div>
//   );
// }
