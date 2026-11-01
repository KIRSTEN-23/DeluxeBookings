import { useState } from "react";
import axios from "axios";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from '../../components/common/footer';

import Authentication from "../../components/auth/authentication";


function LogIn() {
  return (
    <div>
    <div className="logInBack">
        <div className="logInBox" style={{backgroundColor: "#EFEBEA"}}>
          <div type="col">

          <Authentication/>

              </div>
          </div>
      </div>
      <Footer></Footer>
      </div>
  );
}

export default LogIn;