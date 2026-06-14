import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

function FilterPanel({ onFilter }) {
  // Checkbox selections arrays
  const [bedrooms, setBedrooms] = useState([]);
  const [ratings, setRatings] = useState([]);
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
    setRatings([]);
    setAmenities([]);
  };

  // Sends choices to backend
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = {};
      
      if (bedrooms.length > 0) params.bedrooms = bedrooms.join(',');
      if (ratings.length > 0) params.ratingAverage = ratings.join(',');
      if (amenities.length > 0) params.amenities = amenities.join(',');

      const res = await axios.get("http://localhost:5000/api/listings/search", { params });
      
      if (onFilter) {
        onFilter(res.data);
      }
    } catch (err) {
      console.error("Filter panel error:", err);
    }
  };

  return (
    <Form className='filterBack col-2' onSubmit={handleFilterSubmit}>
      <h4 className='filterTitle'>Filter by</h4>

      <Button variant="light" onClick={handleClearAll} type="button">Clear</Button>
      <Button variant="light" type="submit" className="primaryButton col-7 searchHeading">
        Search <Search/>
      </Button>

      {/* Bedrooms */}
      <h5>Bedrooms</h5>
      <div className="mb-3">
        {[1, 2, 3, 4].map((num) => (
          <label className="checkContainer" key={`bed-${num}`}>
            <input 
              type="checkbox" 
              value={num}
              checked={bedrooms.includes(String(num))}
              onChange={(e) => handleCheckboxChange(e, bedrooms, setBedrooms)}
            />
            <span className="checkmark"></span>
            <h6>{num === 4 ? "4+" : num}</h6>
          </label>
        ))}
      </div>

      {/* Ratings */}
      <h5>Guest Rating</h5>
      <div className="mb-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <label className="checkContainer" key={`rate-${num}`}>
            <input 
              type="checkbox" 
              value={num}
              checked={ratings.includes(String(num))}
              onChange={(e) => handleCheckboxChange(e, ratings, setRatings)}
            />
            <span className="checkmark"></span>
            <h6>{num} Star(s)</h6>
          </label>
        ))}
      </div>

      {/* Amenities */}
      <h5>Amenities</h5>
      <div className="mb-3">
        {["Wifi", "Pool", "Gym", "Sea view", "Parking"].map((amenity) => (
          <label className="checkContainer" key={amenity}>
            <input 
              type="checkbox" 
              value={amenity}
              checked={amenities.includes(amenity)}
              onChange={(e) => handleCheckboxChange(e, amenities, setAmenities)}
            />
            <span className="checkmark"></span>
            <h6>{amenity}</h6>
          </label>
        ))}
      </div>
    </Form>
  );
}

export default FilterPanel;