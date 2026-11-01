import AppButton from "../common/AppButton.jsx";
import Joinbutton from '../../Assets/images/buttoniconjoin.png'
import circularText from '../../Assets/images/circularText.png'
import { ArrowUpRight } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import SearchBar from '../listings/searchBar';

function HeroHeader() {
  return (
  <div className='heroImage'>
    <br></br>
    <br></br>
    <div className='row container-fluid'>

      <div className='col-lg-6'>
      <h1 className='herotext marginBody'>Luxury Without <em className='headingAlt'>Compromise</em></h1>

      <br></br>

        <div className='herocard marginBody'>
            <p> Showcase your property to the world's most discerning travellers. We don't just list hotels; we curate experiences for a global audience that values quality over quantity.</p>
            <AppButton as={Link} to="/seller-onboarding" intent="primary" icon={ArrowUpRight}>List your property</AppButton>
            </div>
          </div>
      
      <div className='col-lg-6'>
            <img src={circularText} alt="plus icon" className='circularText'/>
      </div>
      
      </div>

    </div>
  )
}

export default HeroHeader;