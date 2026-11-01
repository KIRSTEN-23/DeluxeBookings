import ContentState from "../../components/common/ContentState.jsx";
import { UserRound } from "lucide-react";
import AppButton from "../../components/common/AppButton.jsx";
import { errorMessage as getErrorMessage } from "../../utils/feedback";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/config";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useAuth } from '../../context/authContext';
import { Trash2 } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Save } from 'lucide-react';

function BuyerSavedListingsSection() {
  const { user, token, isAdmin, isSeller, login, logout } = useAuth();
  const navigate = useNavigate();

  // States for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('B'); 
  const [updateMessage, setUpdateMessage] = useState('');
  const [pending, setPending] = useState(false);
  const actionPending = useRef(false);

  useEffect(() => {
    const syncProfile = async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Makes sure the data is synced
        login(res.data, token);
        setName(res.data.name);
        setEmail(res.data.email || '');
        setUserRole(res.data.userRole || 'B');
      } catch (err) {
        setUpdateMessage("Could not load your latest profile. Displaying your last saved details.");
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
    if (actionPending.current) return;
    actionPending.current = true;
    setPending(true);
    setUpdateMessage("");
    try {
      const finalRole = isAdmin ? 'A' : userRole;

      const res = await api.put("/users/update", 
        { name, email, userRole: finalRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update user info
      login(res.data.user, token); 
      setUpdateMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setUpdateMessage(getErrorMessage(err, "Failed to update profile. Please try again."));
    } finally { actionPending.current = false; setPending(false); }
  };

  // makes sure the user wants to delete their account
  const handleDeleteAccount = async () => {
    if (actionPending.current) return;
    const confirmDelete = window.confirm("Are you absolutely sure you want to permanently delete your account? This action cannot be undone.");
    
    if (confirmDelete) {
      actionPending.current = true;
      setPending(true);
      setUpdateMessage("");
      try {
        await api.delete("/users/delete", {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Your account has been successfully deleted.");
        logout();
        navigate("/login");
      } catch (err) {
        setUpdateMessage(getErrorMessage(err, "Could not delete your account. Please try again."));
      } finally { actionPending.current = false; setPending(false); }
    }
  };

  if (!user) return <ContentState framed icon={UserRound} heading="Your profile is waiting" description="Sign in to view and update your account details." actionLabel="Sign in" to="/login" />;

  return (
    <section>
      <div className="Accountpage">
        <div className="Accountbox">
          <div className="profile-content">
            <h3 className="LogInText">Account Details</h3>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="LogInText profile-form">
                <div>
                  <label htmlFor="profile-name"><strong>Username:</strong></label>
                  <input id="profile-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="profile-email"><strong>Email:</strong></label>
                  <input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {!isAdmin && (
                  <div>
                    <p><strong>Account Type:</strong></p>
                    <ToggleButtonGroup type="radio" name="editOptions" value={userRole === 'S' ? 2 : 1} className="custom-toggle-group">
                      <ToggleButton id="edit-tbg-radio-1" value={1} onClick={() => setUserRole("B")} className="ToggleButton">I am a customer</ToggleButton>
                      <ToggleButton id="edit-tbg-radio-2" value={2} onClick={() => setUserRole("S")} className="ToggleButton">I am a seller</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                )}
                <div className="profile-actions">
                  <AppButton intent="primary" appearance="fill" disabled={pending} type="submit">Save Changes <Save /></AppButton>
                  <AppButton intent="secondary" appearance="outline" type="button" disabled={pending} onClick={() => setIsEditing(false)}>Cancel</AppButton>
                </div>
              </form>
            ) : (
              <div className="LogInText profile-details">
                <p><strong>Username:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email || "No email stored"}</p>
                <p><strong>Account Type:</strong> {isAdmin ? "Admin" : isSeller ? "Seller" : "Customer"}</p>
              </div>
            )}

            {pending && <p role="status">Saving account change…</p>}
            {updateMessage && <p role="status" className="LogInText">{updateMessage}</p>}

            <div className="profile-actions">
              {!isEditing && <AppButton intent="primary" appearance="fill" disabled={pending} onClick={() => setIsEditing(true)}>Edit profile <Pencil /></AppButton>}
              <AppButton intent="secondary" appearance="outline" disabled={pending} onClick={handleLogout}>Log Out <LogOut /></AppButton>
              <AppButton intent="danger" appearance="fill" disabled={pending} onClick={handleDeleteAccount}>Delete Account <Trash2 /></AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuyerSavedListingsSection;
