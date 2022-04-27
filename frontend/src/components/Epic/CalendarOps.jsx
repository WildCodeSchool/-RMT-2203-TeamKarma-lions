import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/CalendarOps.scss";

export default function CalendarOps({ setEpicPicture }) {
  const [date, setDate] = useState(new Date());
  setEpicPicture(date);
  return (
    <div>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}
