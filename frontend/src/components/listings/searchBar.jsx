import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Search } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  // States that store the selected fields
  const [guests, setGuests] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // These are the parameters
      const params = {};
      if (guests) params.guestCapacity = guests;
      if (propertyType) params.propertyType = propertyType;
      if (province) params.province = province;
      if (city) params.city = city;

      // Using the parameters in the API request
      const res = await axios.get("http://localhost:5001/api/listings/search", { params });
      
      // Sends filtered data
      if (onSearch) {
        onSearch(res.data);
      }
    } catch (err) {
      console.error("Filtering error:", err);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary searchBarMain">
      <Container>
        <Navbar.Brand className='col-3 searchHeading'>Search our catalog of listings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" as="form" onSubmit={handleSearchSubmit}>
            
            {/* Guest amount selection */}
            <Form.Select 
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
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)}
              className='searchElements'
            >
                <option value="">Property (All)</option>
                <option value="Apartment">Apartment</option>
                <option value="Hotel">Hotel</option>
            </Form.Select>

            {/* Province selection */}
            <Form.Select 
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

            <Button type="submit" variant="light" className="primaryButton col-2 searchHeading">
              Search <Search/>
            </Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SearchBar;