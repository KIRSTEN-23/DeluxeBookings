import Form from 'react-bootstrap/Form';
import { Star } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import { X } from 'lucide-react';
import { Search } from 'lucide-react';

function FilterPanel() {
      // checked addons
  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAddons([...addons, value]);
    } else {
      setAddons(addons.filter((item) => item !== value));
    }
  };

  return (
    <Form className='filterBack col-2'>
        <h4 className='filterTitle'>Filter by</h4>
        <tr></tr>

        <Button variant="light">Clear</Button>

        <Button variant="light" className="primaryButton col-7 searchHeading">Search <Search/></Button>

    {/* First checkbox group */}
        <h5>Bedrooms</h5>

      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="1Bed" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>1</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="2Bed" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>2</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="3Bed" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>3</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="4Bed" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>4+</h6>
            </span>
        </label>

        </div>
      ))}

      {/* Second checkbox group */}
        <h5>Guest Rating</h5>

         {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="1Star" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>1</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="2Star" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>2</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="3Star" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>3</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="4Star" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>4</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="5Star" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>5</h6>
            </span>
        </label>

        </div>
      ))}
    
     {/* Third checkbox group */}
        <h5>Amenities</h5>

         {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="wifi" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>Wifi</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="pool" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>Pool</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="Gym" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>Gym</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="Sea" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>Sea view</h6>
            </span>
        </label>

        <label className="checkContainer">
            <input 
            type="checkbox" 
            id="park" 
            name="filter_select" 
            value="Break"
            onChange={handleAddonChange}
            />
            <span className="checkmark"></span>
            <span>
                <h6 className='checkBoxText'>Parking</h6>
            </span>
        </label>

        </div>
      ))}
    
    </Form>
  );
}

export default FilterPanel;