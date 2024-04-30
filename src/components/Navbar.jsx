import  { useState } from "react";

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "2-digit",
    year: "numeric",
    month: "short",
  });

  return (
    <div className="shadow-lg h-20 flex justify-between items-center px-10">
      <button
        onClick={goToPreviousWeek}
        className="flex items-center  hover:text-blue-600 px-4 py-2"
      >
        <span className="material-symbols-outlined">arrow_left</span> Previous Week
      </button>
      <div className="text-black px-5 py-2 border rounded-md bg-slate-100 cursor-not-allowed">{formattedDate}</div>
      <button
        onClick={goToNextWeek}
        className="flex items-center  hover:text-blue-600 px-4 py-2"
      >
        Next Week <span className="material-symbols-outlined">arrow_right</span>
      </button>
    </div>
  );
};

export default Navbar;
