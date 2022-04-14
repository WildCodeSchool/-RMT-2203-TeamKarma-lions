import React from "react";
import Widget from "./Widget";

import "../styles/Widget.css";

export default function WidgetList() {
  return (
    <div className="widgetsContainer">
      <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article>
      <article>
        <Widget />
      </article>
    </div>
  );
}
