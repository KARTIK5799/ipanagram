import  { useState } from 'react';
import Dropdown from './components/Dropdown';
import ListOfDays from './components/ListOfDays';
import Navbar from './components/Navbar';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      <Navbar onDateChange={handleDateChange} />
      <Dropdown />
      <ListOfDays selectedDate={selectedDate} />
    </>
  );
};

export default App;
