import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Search } from 'lucide-react';
import Button from 'react-bootstrap/Button';

function SearchBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary searchBarMain">
      <Container>
        <Navbar.Brand className='col-3 searchHeading'>Search our catalog of listings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Form.Select aria-label="Default select example" className='searchElements'>
                <option>Guest capacity</option>
                <option value="1">All</option>
                <option value="2">1</option>
                <option value="3">2</option>
                <option value="4">3</option>
                <option value="5">4</option>
                <option value="6">5+</option>
            </Form.Select>

            <Form.Select aria-label="Default select example" className='searchElements'>
                <option>Property type</option>
                <option value="1">All</option>
                <option value="2">Apartment</option>
                <option value="3">Hotel</option>
            </Form.Select>

            <Form.Select aria-label="Default select example" className='searchElements'>
                <option>Province</option>
                <option value="1">All</option>
                <option value="2">Eastern Cape</option>
                <option value="3">Free State</option>
                <option value="4">Gauteng</option>
                <option value="5">Kwazulu-Natal</option>
                <option value="6">Limpopo</option>
                <option value="7">Mpumalanga</option>
                <option value="8">Northern Cape</option>
                <option value="9">North west</option>
                <option value="3">Western Cape</option>
            </Form.Select>

            <Form.Select aria-label="Default select example" className='searchElements'>
                <option>City</option>
                <option value="1">All</option>
                <option value="2">Johannesburg</option>
                <option value="3">Cape Town</option>
                <option value="4">Durban</option>
                <option value="5">Pretoria</option>
                <option value="6">Soweto</option>
                <option value="7">Bloemfontein</option>
                <option value="8">Port Elizabeth (Gqeberha)</option>
            </Form.Select>

            <Button variant="light" className="primaryButton col-2 searchHeading">Search <Search/></Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SearchBar;