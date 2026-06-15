import DatePicker from "react-datepicker";
import { subDays } from "date-fns"; 

import "react-datepicker/dist/react-datepicker.css";

// States from checkout
function DatesPicker({ selectedDate, setSelectedDate }) {

  const excludeDates = [
    new Date(),               
    subDays(new Date(), 1)
  ];

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      excludeDates={excludeDates}
      placeholderText="Select a date other than today or yesterday"
    />
  );
}

export default DatesPicker;