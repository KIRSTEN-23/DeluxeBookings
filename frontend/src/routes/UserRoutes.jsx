import NotFound from "../pages/errors/NotFound";
import { Routes, Route } from "react-router-dom";

import AccountPage from "../pages/userAccounts/AccountPage";
import ProtectedRoute from "./ProtectedRoutes";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AccountPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="profile" element={<AccountPage />} />
      <Route path="activity" element={<ProtectedRoute><AccountPage view="activity" /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default UserRoutes;