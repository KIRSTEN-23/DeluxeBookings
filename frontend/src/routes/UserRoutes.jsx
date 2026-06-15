import { Routes, Route } from "react-router-dom";

import Account from "../pages/userAccounts/AccountPage";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Account />} />
      <Route path="account" element={<AccountPage />} />
    </Routes>
  );
}

export default UserRoutes;