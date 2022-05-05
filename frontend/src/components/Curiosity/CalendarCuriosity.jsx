import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../styles/CalendarOps.scss";
import "../../styles/CalendarCuriosity.scss";

export default function CalendarCuriosity({ getPic }) {
  const [date, setDate] = useState(new Date());
  const handleChange = (dat) => {
    setDate(dat);
    getPic(dat);
  };
  const minDate = new Date(2012, 7, 5);

  return (
    <div className="calendar">
      <p className="pCal">
        Select a date and <span className="police">discover Mars</span> as if
        you were there :
      </p>
      <div className="calendar-container">
        <Calendar
          onChange={handleChange}
          value={date}
          minDate={minDate}
          maxDate={new Date()}
        />
      </div>
    </div>
  );
}
