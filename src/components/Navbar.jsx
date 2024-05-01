import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentDate(previousWeek);
    onDateChange(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
    onDateChange(nextWeek);
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "2-digit",
    year: "numeric",
    month: "short",
  });

  return (
    <div className="navbar fixed top-0 left-0 right-0 shadow-lg h-20 flex justify-between items-center px-10 bg-white z-50">
      <button
        onClick={goToPreviousWeek}
        className="flex items-center hover:text-blue-600 px-4 py-2"
      >
        <span className="material-symbols-outlined">arrow_left</span> Previous Week
      </button>
      <div className="text-black px-5 py-2 border rounded-md bg-slate-100 cursor-not-allowed">{formattedDate}</div>
      <button
        onClick={goToNextWeek}
        className="flex items-center hover:text-blue-600 px-4 py-2"
      >
        Next Week <span className="material-symbols-outlined">arrow_right</span>
      </button>
    </div>
  );
};

Navbar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

export default Navbar;
