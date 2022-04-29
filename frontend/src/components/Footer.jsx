import React from "react";

export default function Footer() {
  return (
    <div className="lionsfooter">
      <ul>
        <li>
          <p className="introFooter">2022 © Wild Code School x Team Lion :</p>
        </li>
        <li>
          <a href="https://github.com/gnos28">
            {" "}
            <img src="./src/assets/GitHubPic.png" alt="logo Github" />
          </a>

          <p>Julien Vigneron,</p>
        </li>
        <li>
          <a href="https://github.com/ClemDSC">
            {" "}
            <img src="./src/assets/GitHubPic.png" alt="logo Github" />
          </a>
          <p>Clémence Pham,</p>
        </li>
        <li>
          <a href="https://github.com/Lora048">
            {" "}
            <img src="./src/assets/GitHubPic.png" alt="logo Github" />
          </a>
          <p>Lora Perrichon,</p>
        </li>
        <li>
          <a href="https://github.com/FrederiqueDemas">
            {" "}
            <img src="./src/assets/GitHubPic.png" alt="logo Github" />
          </a>
          <p>Frédérique Demas,</p>
        </li>
        <li>
          <a href="https://github.com/PaulKip44">
            {" "}
            <img src="./src/assets/GitHubPic.png" alt="logo Github" />
          </a>
          <p>Paul Sanchez.</p>
        </li>
      </ul>
      {/* <p>
        2022 © Wild Code School x Team Lion : Julien Vigneron, Clémence Pham,
        Lora Perrichon, Frédérique Demas, Paul Sanchez.
      </p> */}
    </div>
  );
}
