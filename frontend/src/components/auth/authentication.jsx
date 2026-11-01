import AppButton from "../common/AppButton.jsx";
import { useRef, useState } from "react";
import api from "../../api/config";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import { useNavigate } from "react-router-dom"; // 1. Imported useNavigate
import { useAuth } from "../../context/authContext"; // 2. Imported useAuth global context

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { ArrowRight } from 'lucide-react';

//first password imports
import ruby from "../../Assets/images/login/ruby1.png"
import copper from "../../Assets/images/login/copper1.png"
import emerald from "../../Assets/images/login/emerald1.png"
import gold from "../../Assets/images/login/Gold.png"
import violet from "../../Assets/images/login/Indigo.png"
import pink from "../../Assets/images/login/pink.png"

//second password imports
import golf from "../../Assets/images/login/golf2.png"
import bar from "../../Assets/images/login/bar2.png"
import marina from "../../Assets/images/login/marina2.png"
import theatre from "../../Assets/images/login/Theatre.png"

//third password imports
import wine from "../../Assets/images/login/wine3.png"
import whiskey from "../../Assets/images/login/whiskey3.png"
import drinks from "../../Assets/images/login/drink3.png"
import IcedCoffe from "../../Assets/images/login/Iced coffee.png"

function Authentication() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageR, setMessageR] = useState("");
  const [userRole, setUserRole] = useState("B");

  //toggle seller user role
   const useSelectS = async () => {
    setUserRole("S");
  };

   //toggle buyer user role
  const useSelectB = async () => {
    setUserRole("B");
  };

  //messages for log in when a picture is chosen
  const [messagePass1, setMessagePass1] = useState("");
  const [messagePass2, setMessagePass2] = useState("");
  const [messagePass3, setMessagePass3] = useState("");

  //messages for sign up when a picture is chosen
  const [messagePass11, setMessagePass11] = useState("");
  const [messagePass12, setMessagePass12] = useState("");
  const [messagePass13, setMessagePass13] = useState("");

  //passwords for each tab section
  var [password1, setPassword1] = useState("");
  var [password2, setPassword2] = useState("");
  var [password3, setPassword3] = useState("");

  //passwords for each tab section
  var [password11, setPassword11] = useState("");
  var [password12, setPassword12] = useState("");
  var [password13, setPassword13] = useState("");

  const passSelect = async () => {
    setMessagePass1("Selection saved");
  };

  const passSelect2 = async () => {
    setMessagePass2("Selection saved");
  };

  const passSelect3 = async () => {
    setMessagePass3("Selection saved");
  };

    const passSelect11 = async () => {
    setMessagePass11("Selection saved");
  };

  const passSelect12 = async () => {
    setMessagePass12("Selection saved");
  };

  const passSelect13 = async () => {
    setMessagePass13("Selection saved");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);

const register = async () => {
    if (submitting.current) return;
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password11 || !password12 || !password13) {
      setMessageR("Enter your name, a valid email and one picture from each of the three groups."); return;
    }
    submitting.current = true;
    setIsSubmitting(true);
    setMessageR("");
    const finalPassword = `${password11}${password12}${password13}`;
    
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password: finalPassword,
        userRole
      });
      setMessageR(`${res.data}. Open the Log in tab to sign in.`);
      setPassword(finalPassword); 
    } catch (error) {
      console.error("Backend Error Response:", error.response?.data);
      setMessageR(getErrorMessage(error, "Could not register. Please check your connection and try again."));
    } finally { submitting.current = false; setIsSubmitting(false); }
};

const login = async () => {
    if (submitting.current) return;
    if (!email || !password1 || !password2 || !password3) { setMessage("Enter your email and select one picture from each group."); return; }
    submitting.current = true;
    setIsSubmitting(true);
    setMessage("");
    // Adds the passwords from each picture
    const finalPassword = `${password1}${password2}${password3}`;

    try {
      const res = await api.post("/auth/login", {
        email,
        password: finalPassword,
        name
      });

      const { token, user, message: successMessage } = res.data;

      loginContext(user, token);

      setMessage("Login successful!");
      setPassword(finalPassword);

      setTimeout(() => {
        if (user?.userRole === 'A') {
          navigate("/admin"); 
        } else if (user?.userRole === 'S') {
          navigate("/account/activity");
        } else {
          navigate("/"); 
        }
      }, 1000);

    }  catch (error) {
      setMessage(getErrorMessage(error, "Could not sign in. Please check your connection and try again."));
    } finally { submitting.current = false; setIsSubmitting(false); }
  };

  return (
    <Tabs
      defaultActiveKey="home"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      {/* Sign up tab left */}
      <Tab eventKey="home" title="Sign up">
        <div>
          <h1 className="LogInText">Welcome to Deluxe Bookings</h1>
          <h3 className="LogInSubHeading LogInText">Make an account to gain access to our exclusive platform</h3>

          <div className="formGroup">
            <label htmlFor="signup-username" className="formFieldLabel">Create your username</label>
            <br></br>
            <input
              id="signup-username"
              className="customFormInput"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <br /><br />

          <div className="formGroup">
            <label htmlFor="signup-email" className="formFieldLabel">Enter your email address</label>
            <br></br>
            <input
              id="signup-email"
              className="customFormInput"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br /><br />

          <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="custom-toggle-group">
            <ToggleButton id="tbg-radio-1" className="ToggleButton" value={1} onClick={useSelectB}>
              I am a customer
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" className="ToggleButton" value={2} onClick={useSelectS}>
              I am a seller
            </ToggleButton>
          </ToggleButtonGroup>

          <br /><br />

          <div>
            <h2 className="passwordText LogInText">Create a custom password:</h2>          
            <h4 className="LogInText">Choose your favourite colour</h4>

            <div className="picture-options">
              <button disabled={isSubmitting} aria-pressed={String(password11) === "1"} variant="outline-dark" className="logInButton" onClick={() => { setPassword11(1); passSelect11(); }}>
                <img src={ruby} alt="ruby red" className="logInButtonImg"/>
                <p>Ruby Red</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password11) === "2"} variant="outline-dark" className="logInButton" onClick={() => { setPassword11(2); passSelect11(); }}>
                <img src={copper} alt="copper brown" className="logInButtonImg"/>
                <p>Copper Brown</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password11) === "3"} variant="outline-dark" className="logInButton" onClick={() => { setPassword11(3); passSelect11(); }}>
                <img src={emerald} alt="emerald green" className="logInButtonImg"/>
                <p>Emerald Green</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password11) === "4"} variant="outline-dark" className="logInButton" onClick={() => { setPassword11(4); passSelect11(); }}>
                <img src={gold} alt="gold coins" className="logInButtonImg"/>
                <p>Gold</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password11) === "5"} variant="outline-dark" className="logInButton" onClick={() => { setPassword11(5); passSelect11(); }}>
                <img src={violet} alt="purple gems" className="logInButtonImg"/>
                <p>Violet</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password11) === "6"} variant="outline-dark" className="logInButton" onClick={() => { setPassword11(6); passSelect11(); }}>
                <img src={pink} alt="pink crystals" className="logInButtonImg"/>
                <p>Pink</p>
              </button>
            </div>
            <h5 className="LogInText">{messagePass11}</h5>
          </div>

          <br />

          <div>
            <h4 className="LogInText">Choose the best place to relax</h4>

            <div className="picture-options">
              <button disabled={isSubmitting} aria-pressed={String(password12) === "1"} variant="outline-dark" className="logInButton" onClick={() => { setPassword12(1); passSelect12(); }}>
                <img src={golf} alt="golf course" className="logInButtonImg"/>
                <p>The golf course</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password12) === "2"} variant="outline-dark" className="logInButton" onClick={() => { setPassword12(2); passSelect12(); }}>
                <img src={bar} alt="a bar" className="logInButtonImg"/>
                <p>The bar</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password12) === "3"} variant="outline-dark" className="logInButton" onClick={() => { setPassword12(3); passSelect12(); }}>
                <img src={marina} alt="a marina" className="logInButtonImg"/>
                <p>The marina</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password12) === "4"} variant="outline-dark" className="logInButton" onClick={() => { setPassword12(4); passSelect12(); }}>
                <img src={theatre} alt="a theatre" className="logInButtonImg"/>
                <p>The theatre</p>
              </button>
            </div>
            <h5 className="LogInText">{messagePass12}</h5>
          </div>

          <br />
          
          <div>
            <h4 className="LogInText">Choose your favourite drink</h4>

            <div className="picture-options">
              <button disabled={isSubmitting} aria-pressed={String(password13) === "1"} variant="outline-dark" className="logInButton" onClick={() => { setPassword13(1); passSelect13(); }}>
                <img src={wine} alt="wine glasses" className="logInButtonImg"/>
                <p>Wine</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password13) === "2"} variant="outline-dark" className="logInButton" onClick={() => { setPassword13(2); passSelect13(); }}>
                <img src={whiskey} alt="whiskey in a glass" className="logInButtonImg"/>
                <p>Whiskey</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password13) === "3"} variant="outline-dark" className="logInButton" onClick={() => { setPassword13(3); passSelect13(); }}>
                <img src={drinks} alt="cocktails" className="logInButtonImg"/>
                <p>Cocktails</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password13) === "4"} variant="outline-dark" className="logInButton" onClick={() => { setPassword13(4); passSelect13(); }}>
                <img src={IcedCoffe} alt="iced coffee" className="logInButtonImg"/>
                <p>Iced coffee</p>
              </button>
            </div>

            <h5 className="LogInText">{messagePass13}</h5>

            <AppButton intent="primary" appearance="fill" disabled={isSubmitting} onClick={register}>{isSubmitting ? "Creating account…" : "Sign Up"} <ArrowRight className="iconStyle"/></AppButton>

            <br /><br />

            <p role="status" aria-live="polite" className="LogInText">{messageR}</p>
          </div>
        </div>
      </Tab>

      {/* Log In tab right */}
      <Tab eventKey="profile" title="Log in">
        <div>
          <h1 className="LogInText">Welcome back</h1>
          <h2 className="LogInSubHeading LogInText">Fill in your details to access your account</h2>

          <div className="formGroup">
            <label htmlFor="login-username" className="formFieldLabel">Enter your username</label>
            <br></br>
            <input
              id="login-username"
              className="customFormInput"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <br /><br />

          <div className="formGroup">
            <label htmlFor="login-email" className="formFieldLabel">Enter your email address</label>
            <br></br>
            <input
              id="login-email"
              className="customFormInput"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br /><br />

          <div>
            <h2 className="passwordText LogInText">Select your picture password:</h2>            
            <h3 className="LogInText">Choose your favourite colour</h3>

            <div className="picture-options">
              <button disabled={isSubmitting} aria-pressed={String(password1) === "1"} variant="outline-dark" className="logInButton" onClick={() => { setPassword1(1); passSelect(); }}>
                <img src={ruby} alt="ruby red" className="logInButtonImg"/>
                <p>Ruby Red</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password1) === "2"} variant="outline-dark" className="logInButton" onClick={() => { setPassword1(2); passSelect(); }}>
                <img src={copper} alt="copper brown" className="logInButtonImg"/>
                <p>Copper Brown</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password1) === "3"} variant="outline-dark" className="logInButton" onClick={() => { setPassword1(3); passSelect(); }}>
                <img src={emerald} alt="emerald green" className="logInButtonImg"/>
                <p>Emerald Green</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password1) === "4"} variant="outline-dark" className="logInButton" onClick={() => { setPassword1(4); passSelect(); }}>
                <img src={gold} alt="emerald green" className="logInButtonImg"/>
                <p>Gold</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password1) === "5"} variant="outline-dark" className="logInButton" onClick={() => { setPassword1(5); passSelect(); }}>
                <img src={violet} alt="emerald green" className="logInButtonImg"/>
                <p>Violet</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password1) === "6"} variant="outline-dark" className="logInButton" onClick={() => { setPassword1(6); passSelect(); }}>
                <img src={pink} alt="emerald green" className="logInButtonImg"/>
                <p>Pink</p>
              </button>
            </div>
            <h5 className="LogInText">{messagePass1}</h5>
          </div>

          <br />

          <div>
            <h4 className="LogInText">Choose the best place to relax</h4>

            <div className="picture-options">
              <button disabled={isSubmitting} aria-pressed={String(password2) === "1"} variant="outline-dark" className="logInButton" onClick={() => { setPassword2(1); passSelect2(); }}>
                <img src={golf} alt="golf course" className="logInButtonImg"/>
                <p>The golf course</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password2) === "2"} variant="outline-dark" className="logInButton" onClick={() => { setPassword2(2); passSelect2(); }}>
                <img src={bar} alt="a bar" className="logInButtonImg"/>
                <p>The bar</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password2) === "3"} variant="outline-dark" className="logInButton" onClick={() => { setPassword2(3); passSelect2(); }}>
                <img src={marina} alt="a marina" className="logInButtonImg"/>
                <p>The marina</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password2) === "4"} variant="outline-dark" className="logInButton" onClick={() => { setPassword2(4); passSelect2(); }}>
                <img src={theatre} alt="a marina" className="logInButtonImg"/>
                <p>The theatre</p>
              </button>
            </div>
            <h5 className="LogInText">{messagePass2}</h5>
          </div>

          <br />
          
          <div>
            <h4 className="LogInText">Choose your favourite drink</h4>

            <div className="picture-options">
              <button disabled={isSubmitting} aria-pressed={String(password3) === "1"} variant="outline-dark" className="logInButton" onClick={() => { setPassword3(1); passSelect3(); }}>
                <img src={wine} alt="wine glasses" className="logInButtonImg"/>
                <p>Wine</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password3) === "2"} variant="outline-dark" className="logInButton" onClick={() => { setPassword3(2); passSelect3(); }}>
                <img src={whiskey} alt="whiskey in a glass" className="logInButtonImg"/>
                <p>Whiskey</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password3) === "3"} variant="outline-dark" className="logInButton" onClick={() => { setPassword3(3); passSelect3(); }}>
                <img src={drinks} alt="cocktails" className="logInButtonImg"/>
                <p>Cocktails</p>
              </button>
              <button disabled={isSubmitting} aria-pressed={String(password3) === "4"} variant="outline-dark" className="logInButton" onClick={() => { setPassword3(4); passSelect3(); }}>
                <img src={IcedCoffe} alt="cocktails" className="logInButtonImg"/>
                <p>Iced coffee</p>
              </button>
            </div>

            <h5 className="LogInText">{messagePass3}</h5>

            <AppButton intent="primary" appearance="fill" disabled={isSubmitting} onClick={login}>{isSubmitting ? "Signing in…" : "Log In"} <ArrowRight className="iconStyle"/></AppButton>

            <br /><br />

            <p role="status" aria-live="polite" className="LogInText">{message}</p>

          </div>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Authentication;
