import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(user.userRole)) {
    return <p role="alert" className="container py-4">You do not have access to this workspace. <a href="/account">Go to your account</a>.</p>;
  }

  return children;
};

export default ProtectedRoute;