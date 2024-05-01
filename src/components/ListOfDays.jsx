import React, { useState } from "react";
import PropTypes from "prop-types";

const ListOfDays = ({ selectedDate }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = selectedDate;
  const currentDayIndex = currentDate.getDay();

  const getDate = (offset) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour > 12 ? hour - 12 : hour;
        const amPm = hour >= 12 ? "PM" : "AM";
        const time = `${formattedHour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${amPm}`;
        timeSlots.push(time);
      }
    }
    return timeSlots;
  };

  const isFutureDay = (dayIndex) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDay = new Date(currentDate);
    selectedDay.setDate(selectedDay.getDate() + (dayIndex - currentDayIndex));
    selectedDay.setHours(0, 0, 0, 0);
    return selectedDay >= today;
  };

  const [selectedTimeSpans, setSelectedTimeSpans] = useState([]);
  const [idCounter, setIdCounter] = useState(101);
  const [nameCounter, setNameCounter] = useState(1);

  const timeSlots = generateTimeSlots();

  const isSelected = (selectedDateTime) => {
    return selectedTimeSpans.some(
      (span) =>
        span.Date ===
          selectedDateTime.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) && 
        span.Time ===
          selectedDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
    );
  };

  const handleTimeSpanClick = (dayIndex, time) => {
    const selectedDateTime = new Date(currentDate);
    selectedDateTime.setDate(
      selectedDateTime.getDate() + (dayIndex - currentDayIndex)
    );
    selectedDateTime.setHours(
      parseInt(time.slice(0, 2)),
      parseInt(time.slice(3, 5)),
      0,
      0
    );

    if (!isSelected(selectedDateTime)) {
      setSelectedTimeSpans((prevState) => [
        ...prevState,
        {
          Id: idCounter,
          Name: `test ${nameCounter}`,
          Date: selectedDateTime.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }), 
          Time: selectedDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIdCounter(Math.floor(Math.random()*900)+100);
      setNameCounter((prevNameCounter) => prevNameCounter + 1);
    } else {
      setSelectedTimeSpans((prevState) =>
        prevState.filter(
          (span) =>
            !(
              span.Date ===
                selectedDateTime.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }) && 
              span.Time ===
                selectedDateTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
            )
        )
      );
      setIdCounter((prevIdCounter) => prevIdCounter - 1);
      setNameCounter((prevNameCounter) => prevNameCounter - 1);
    }
  };

  return (
    <div className="relative list-of-days scroll-none">
      {daysOfWeek.map((day, dayIndex) => (
        <div
          key={dayIndex}
          style={{ height: `calc(100vh / ${daysOfWeek.length})` }}
          className="px-10 h-full flex items-center border px"
        >
          <div className="w-[10%] border-r h-full flex flex-col items-center justify-center">
            <h2>{day}</h2>
            <p>{getDate(dayIndex - currentDayIndex)}</p>
          </div>
          <div className="w-[90%] h-full flex items-center flex-wrap gap-1 pr-72 px-5 py-5">
            {isFutureDay(dayIndex) ? (
              timeSlots.map((time, timeIndex) => (
                <React.Fragment key={timeIndex}>
                  <input
                  className="cursor-pointer"
                    type="checkbox"
                    id={`${day}-${time}`}
                    name={`${day}-${time}`}
                    value={`${day}-${time}`}
                    onClick={() => handleTimeSpanClick(dayIndex, time)}
                  />
                  <label  className="cursor-pointer" htmlFor={`${day}-${time}`}>{time}</label>
                  <br />
                </React.Fragment>
              ))
            ) : (
              <div className="text-red-500">Not Available !</div>
            )}
          </div>
        </div>
      ))}
      {selectedTimeSpans.length !== 0 ? (
        <div className="fixed w-64 border rounded-lg h-96 overflow-hidden right-5 bottom-6 bg-white shadow-xl text-sm">
          <div className="px-4 py-2 bg-gray-800 text-white sticky top-0">
            <h2 className="text-lg font-semibold">Selected Time Spans:</h2>
          </div>
          <div className="h-80 overflow-y-scroll">
            <div className="p-3">
              <ul>
                {selectedTimeSpans.map((span, index) => (
                  <li key={index} className="border-b py-2">
                    <span className="text-gray-700 font-semibold">Id:</span>{" "}
                    {span.Id}
                    <br />
                    <span className="text-gray-700 font-semibold">
                      Name:
                    </span>{" "}
                    {span.Name}
                    <br />
                    <span className="text-gray-700 font-semibold">
                      Date:
                    </span>{" "}
                    {span.Date}
                    <br />
                    <span className="text-gray-700 font-semibold">
                      Time:
                    </span>{" "}
                    {span.Time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

ListOfDays.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default ListOfDays;
