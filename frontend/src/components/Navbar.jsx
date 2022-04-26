// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/Navbar.scss";
// import ItemNavbar from "./ItemNavbar";
// import LogoLoginNav from "./LogoLoginNav";

// export default function Navbar() {
//   const logoIcone = [
//     {
//       className: "logo",
//       image: "src/assets/lion-logo.png",
//       alt: "logo",
//     },
//   ];
//   const loginIcone = [
//     {
//       className: "login",
//       image: "src/assets/login.png",
//       alt: "login",
//     },
//   ];
//   const icones = [
//     {
//       className: "planete-icone",
//       image: "src/assets/planete-icone.png",
//       alt: "Mars' weather",
//       isActive: false,
//     },
//     {
//       className: "planete-icone",
//       image: "src/assets/perseverance.png",
//       alt: "Perseverance",
//       navlink: <NavLink to="/perseverance">Perseverance</NavLink>,
//       isActive: false,
//     },
//     {
//       className: "planete-icone",
//       image: "src/assets/satellite.png",
//       alt: "Curiosity",
//       isActive: false,
//     },
//     {
//       className: "planete-icone",
//       image: "src/assets/comete.png",
//       alt: "Meteorites",
//       isActive: false,
//     },
//     {
//       className: "planete-icone",
//       image: "src/assets/tornade.png",
//       alt: "Natural events",
//       isActive: false,
//     },
//   ];

//   return (
//     <div className="navbarContainer">
//       {logoIcone.map((props) => (
//         <LogoLoginNav
//           key={props.alt}
//           className={props.className}
//           image={props.image}
//           alt={props.alt}
//         />
//       ))}
//       <div className="navbar">
//         {icones.map((icone) => (
//           <ItemNavbar
//             key={icone.alt}
//             image={icone.image}
//             alt={icone.alt}
//             navlink={icone.navlink}
//             isActive={icone.isActive}
//           />
//         ))}
//       </div>
//       {loginIcone.map((props) => (
//         <LogoLoginNav
//           key={props.alt}
//           className={props.className}
//           image={props.image}
//           alt={props.alt}
//         />
//       ))}
//     </div>
//   );
// }
