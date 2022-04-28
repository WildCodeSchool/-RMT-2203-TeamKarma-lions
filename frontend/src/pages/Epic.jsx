import React from "react";
import "../styles/Home.scss";
import Titre from "../components/Titre";
import EpicPictures from "../components/Epic/EpicPictures";

export default function Epic() {
  return (
    <div>
      <Titre titre="DSCOVR : EPIC" />
      <p className="intro-site">
        EPIC (Earth Polychromatic Imaging Camera) is a 10-channel
        spectroradiometer onboard NOAA’s DSCOVR (Deep Space Climate Observatory)
        spacecraft. EPIC provides 10 narrow band spectral images of the entire
        sunlit face of Earth using a 2048x2048 pixel CCD (Charge Coupled Device)
        detector coupled to a 30-cm aperture Cassegrain telescope. The DSCOVR
        spacecraft is located at the Earth-Sun Lagrange-1 (L-1) point giving
        EPIC a unique angular perspective that will be used in science
        applications to measure ozone, aerosols, cloud reflectivity, cloud
        height, vegetation properties, and UV radiation estimates at Earth.
      </p>
      <EpicPictures />
    </div>
  );
}
