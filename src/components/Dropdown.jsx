import { useState } from "react";
import timeZones from "../helper/timeZones";


const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
      };
  return (
    <div className='h-20 flex justify-between items-center px-10 border'>
    <select value={selectedOption} onChange={handleDropdownChange}>
    {timeZones.map((zone, index) => (
          <option key={index} value={zone.offset}>
            {zone.offset} - {zone.location}
          </option>
        ))}
    </select>
    </div>
  )
}

export default Dropdown
