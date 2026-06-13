import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Footer from '../Components/footer';
import { useAuth } from '../context/authContext';
import { ArrowRight } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import { Trash2 } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Save } from 'lucide-react';

function Account() {
  const { user, token, isAdmin, isSeller, login, logout } = useAuth();
  const navigate = useNavigate();

  // States for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('B'); 
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const syncProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Makes sure the data is synced
        login(res.data, token);
        setName(res.data.name);
        setEmail(res.data.email || '');
        setUserRole(res.data.userRole || 'B');
      } catch (err) {
        console.error("Safety check: Profile sync failed.", err);
      }
    };

    if (token && user) {
      syncProfile();
    }
  }, [token]);

  // Set default form values
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email || '');
      setUserRole(user.userRole || 'B');
    }
  }, [user]);

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  // Update user info
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const finalRole = isAdmin ? 'A' : userRole;

      const res = await axios.put("http://localhost:5000/auth/update", 
        { name, email, userRole: finalRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update user info
      login(res.data.user, token); 
      setUpdateMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setUpdateMessage(err.response?.data || "Failed to update profile.");
    }
  };

  // makes sure the user wants to delete their account
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you absolutely sure you want to permanently delete your account? This action cannot be undone.");
    
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:5000/auth/delete", {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Your account has been successfully deleted.");
        logout();
        navigate("/login");
      } catch (err) {
        alert(err.response?.data || "Failed to delete account.");
      }
    }
  };

  if (!user) {
    return (
      <section>
      <div className='Accountpage'>
        <div className='Accountbox'>
          <div>
            <h3 className="LogInText">You are not logged in</h3>
            <p className="LogInText">Please log in to view your account details.</p>

            <Button variant="light" className="primaryButton" onClick={() => navigate("/login")}>Go to Login <ArrowRight className="iconStyle"/></Button>

          </div>
        </div>
      </div>
      <Footer></Footer>
      </section>
    );
  }

  return (
    <section>
    <div className='Accountpage'>
      <div className='Accountbox'>
        <div>
          <h1 className="LogInText">Account Details:</h1>
          
          {/* Show edit form or standard user info */}
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="LogInText">
              <div>
                <label><strong>Username:</strong></label>
                <br></br>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <br />
              <div>
                <label><strong>Email:</strong></label>
                <br></br>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <br />
              
              {/* Only allow user to change role if they aren't an admin */}
              {!isAdmin && (
                <div>
                  <label><strong>Account Type:</strong></label>
                  <br />
                  <br />
                  <ToggleButtonGroup 
                    type="radio" 
                    name="editOptions" 
                    value={userRole === 'S' ? 2 : 1} 
                    className="custom-toggle-group"
                  >
                    <ToggleButton id="edit-tbg-radio-1" value={1} onClick={() => setUserRole("B")} className="ToggleButton">
                      I am a customer
                    </ToggleButton>
                    <ToggleButton id="edit-tbg-radio-2" value={2} onClick={() => setUserRole("S")} className="ToggleButton">
                      I am a seller
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <br /><br />
                </div>
              )}

              <Button type="submit" variant="light" className="heroButton" style={{ marginRight: "2%"}}>Save Changes<Save style={{ marginLeft: "2%"}}/></Button>
              <Button type="button" className="primaryButton buttontext" onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          ) : (
            <div className="LogInText">
              <p><strong>Username:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email || "No email stored"}</p>
              <p>
                <strong>Account Type:</strong> {isAdmin ? "Admin" : isSeller ? "Seller" : "Customer"}
              </p>

              <Button variant="light" className="heroButton" onClick={() => setIsEditing(true)}>Edit profile <Pencil/></Button>
            </div>
          )}

          {updateMessage && <p className="LogInText">{updateMessage}</p>}

          <br />

          <div className='row'>
            {(isSeller || isAdmin) && (
              <h3 className="LogInText" >Go to:</h3>
            )}
            
            {isAdmin && (
              <Button 
                className="primaryButton buttontext MarginBtn" 
                onClick={() => navigate("/adminDashboard")}
              >
                Admin Dashboard
              </Button>
            )}
            
            {(isSeller || isAdmin) && (
              <Button 
                className="primaryButton buttontext" 
                onClick={() => navigate("/sellerLoggedIn")}
              >
                Seller Dashboard
              </Button>
            )}
          </div>

          <br />

          <Button variant="light" className="primaryButton" onClick={handleLogout} style={{ marginRight: "2%"}}>Log Out <LogOut/></Button>

          <Button variant="light" className="primaryButton deleteButton" onClick={handleDeleteAccount}>Delete Account <Trash2/></Button>

        </div>
      </div>
      
    </div>
    <Footer></Footer>
    </section>
  );
}

export default Account;