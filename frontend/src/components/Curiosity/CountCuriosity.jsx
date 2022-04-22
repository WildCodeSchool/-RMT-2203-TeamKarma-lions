import React from "react";
import moment from "moment";

export default function CountCuriosity() {
  moment.defaultFormat = "DD.MM.YYYY HH:mm";
  const compteur = moment("06.08.2012", moment.defaultFormat).fromNow(true);

  return (
    <div className="compteur">
      <p>Time passed on planet Mars : {compteur}.</p>
    </div>
  );
}
