import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(user.userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;


// import { Route } from "react-router-dom";

// import ProtectedRoutes from "./ProtectedRoutes";

// import AdminListings from "../pages/userAccounts/AdminDashboard";
// import SellerAdminListingDetails from "../pages/listings/SellerAdminListingDetails";

// export default function AdminRoutes() {
//   return (
//     <>
//       {/* <Route element={<ProtectedRoutes minLevel={3} />}> */}
//         <Route path="/admin/listings" element={<AdminListings />} />
//         <Route path="/admin/listings/:id" element={<SellerAdminListingDetails role="admin" />} />
//       {/* </Route> */}
//     </>
//   );
// }