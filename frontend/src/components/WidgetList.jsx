import React from "react";
import Widget from "./Widget";

import "../styles/Widget.scss";

export default function WidgetList() {
  const contenuWidget = [
    {
      name: "Epic",
      logo: "../src/assets/perseverance.png",
      link: "/Epic",
      image: "../src/assets/lion-logo.png",
    },
  ];

  return (
    <div className="widgetsContainer">
      <article>
        {contenuWidget.map((widget) => (
          <Widget
            key={widget.name}
            name={widget.name}
            logo={widget.logo}
            link={widget.link}
            image={widget.image}
          />
        ))}
      </article>
      {/* <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article> */}
    </div>
  );
}
