import ContentState from "../components/common/ContentState.jsx";
import { ShieldAlert } from "lucide-react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(user.userRole)) {
    return <main className="container py-4"><ContentState error framed icon={ShieldAlert} heading="This workspace isn’t available to your account" description="Your account does not have access to this area. You can view your profile and activity from Account." actionLabel="View my profile" to="/account/profile" /></main>;
  }

  return children;
};

export default ProtectedRoute;