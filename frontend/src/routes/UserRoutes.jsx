import { Routes, Route } from "react-router-dom";

import AccountPage from "../pages/userAccounts/AccountPage";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AccountPage />} />
      <Route path="account" element={<AccountPage />} />
    </Routes>
  );
}

export default UserRoutes;