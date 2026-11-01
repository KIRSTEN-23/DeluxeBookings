import DatePicker from "react-datepicker";
import { addDays, startOfDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function DatesPicker({ selectedDate, setSelectedDate, minDate }) {
  return <DatePicker selected={selectedDate || null} onChange={setSelectedDate} minDate={minDate || addDays(startOfDay(new Date()), 1)} placeholderText="Select a future date" required />;
}
