import AppButton from "../common/AppButton.jsx";
import Form from 'react-bootstrap/Form';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { propertyTypeOptions } from "./ListingForm";
import { propertyTypeValue } from "../../utils/listingValidation";

function SearchBar({ onSearch, isSearching }) {
  // States that store the selected fields
  const [guests, setGuests] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ guestCapacity: guests, propertyType, province, city });
  };

  return (
    <section className="searchBarMain" aria-label="Search stays">
      <Form className="stay-search-form" onSubmit={handleSearchSubmit}>
            
            {/* Guest amount selection */}
            <Form.Select 
              aria-label="Number of guests"
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
              className='searchElements'
            >
                <option value="">Guests (All)</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
            </Form.Select>

            {/* Property type selection */}
            <Form.Select 
              aria-label="Property type"
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)}
              className='searchElements'
            >
                <option value="">Property (All)</option>
                {propertyTypeOptions.map((type) => <option key={type.name} value={propertyTypeValue(type.name)}>{type.name}</option>)}
            </Form.Select>

            {/* Province selection */}
            <Form.Select 
              aria-label="Province"
              value={province} 
              onChange={(e) => setProvince(e.target.value)}
              className='searchElements'
            >
                <option value="">Province (All)</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="Free State">Free State</option>
                <option value="Gauteng">Gauteng</option>
                <option value="KwaZulu-Natal">Kwazulu-Natal</option>
                <option value="Limpopo">Limpopo</option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="Northern Cape">Northern Cape</option>
                <option value="North West">North west</option>
                <option value="Western Cape">Western Cape</option>
            </Form.Select>

            {/* City Selection */}
            <Form.Select 
              aria-label="City"
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className='searchElements'
            >
                <option value="">City (All)</option>
                <option value="Johannesburg">Johannesburg</option>
                <option value="Cape Town">Cape Town</option>
                <option value="Durban">Durban</option>
                <option value="Pretoria">Pretoria</option>
                <option value="Soweto">Soweto</option>
                <option value="Bloemfontein">Bloemfontein</option>
                <option value="Gqeberha">Port Elizabeth (Gqeberha)</option>
            </Form.Select>

            <AppButton intent="primary" appearance="outline" onDark disabled={isSearching} type="submit" className="stay-search-submit">
              {isSearching ? "Applying…" : "Apply search"} <Search/>
            </AppButton>

      </Form>
    </section>
  );
}

export default SearchBar;
