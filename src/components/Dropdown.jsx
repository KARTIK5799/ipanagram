import { useState } from "react";
import timeZones from "../helper/timeZones";

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(
    "UTC+05:30 - Chennai, Kolkata, Mumbai, New Delhi"
  );
  const [optionVisible, setOptionVisible] = useState(false);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    setOptionVisible(false);
  };

  const toggleDropdown = () => {
    setOptionVisible(!optionVisible);
  };

  return (
    <div className="dropdown fixed top-20 left-0 right-0 h-20 flex flex-col w-full gap-1 justify-between items-center px-10 py-3 border bg-white z-50">
      <div className="w-full">
        <h2>Timezones:</h2>
      </div>
      <div className="w-full">
        <div
          onClick={toggleDropdown}
          className="w-full border-black-700 cursor-pointer bg-slate-200 h-8 px-5 flex items-center justify-between"
        >
          <h1>Selected Timezone ({selectedOption})</h1>
          <span className="material-symbols-outlined">
            {optionVisible ? "expand_less" : "expand_more"}
          </span>
        </div>
        {optionVisible && (
          <ul
            className="dropdown-options bg-white w-full border h-96 overflow-y-scroll px-20 py-5 shadow-lg"
            onChange={handleDropdownChange}
          >
            {timeZones.map((zone, index) => (
              <li
                key={index}
                onClick={() =>
                  setSelectedOption(`${zone.offset} - ${zone.location}`)
                }
                className="cursor-pointer py-3 border-b-2"
              >
                {zone.offset} - {zone.location}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
