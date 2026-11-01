import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Search } from 'lucide-react';
import { useState } from 'react';


function FilterPanel({ onFilter, isSearching }) {
  // Checkbox selections arrays
  const [bedrooms, setBedrooms] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleCheckboxChange = (e, state, setState) => {
    const { value, checked } = e.target;
    const stringValue = String(value);

    if (checked) {
      setState([...state, stringValue]);
    } else {
      setState(state.filter((item) => item !== stringValue));
    }
  };

  // Clears all choices
  const handleClearAll = () => {
    setBedrooms([]);
    setAmenities([]);
    onFilter({ bedrooms: "", amenities: "" });
  };

  // Sends choices to backend
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilter({ bedrooms: bedrooms.join(","), amenities: amenities.join(",") });
  };

  return (
    <Form className='filterBack' onSubmit={handleFilterSubmit}>
      <h4 className='filterTitle'>Filter by</h4>

      <div className="filter-actions">
      <Button variant="light" onClick={handleClearAll} type="button">Clear</Button>
      <Button disabled={isSearching} variant="light" type="submit" className="primaryButton">
        Search <Search/>
      </Button>
      </div>

      {/* Bedrooms */}
      <fieldset className="filter-group"><legend>Bedrooms</legend>
      <div className="filter-options">
        {[1, 2, 3, 4].map((num) => (
          <label className="checkContainer" key={`bed-${num}`}>
            <input 
              type="checkbox" 
              value={num}
              checked={bedrooms.includes(String(num))}
              onChange={(e) => handleCheckboxChange(e, bedrooms, setBedrooms)}
            />
            <span className="checkmark"></span>
            <span>{num === 4 ? "4+" : num}</span>
          </label>
        ))}
      </div></fieldset>

      {/* Amenities */}
      <fieldset className="filter-group"><legend>Amenities</legend>
      <div className="filter-options">
        {["WiFi", "Pool", "Kitchen", "Sea view", "Parking"].map((amenity) => (
          <label className="checkContainer" key={amenity}>
            <input 
              type="checkbox" 
              value={amenity}
              checked={amenities.includes(amenity)}
              onChange={(e) => handleCheckboxChange(e, amenities, setAmenities)}
            />
            <span className="checkmark"></span>
            <span>{amenity}</span>
          </label>
        ))}
      </div></fieldset>
    </Form>
  );
}

export default FilterPanel;