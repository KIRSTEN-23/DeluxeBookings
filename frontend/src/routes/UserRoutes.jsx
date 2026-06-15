import { Routes, Route } from "react-router-dom";

import Account from "../pages/userAccounts/account";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Account />} />
      <Route path="account" element={<Account />} />
    </Routes>
  );
}

export default UserRoutes;