import { Routes, Route } from "react-router-dom";

import Login from "../pages/public/login";
// import Register from "../Pages/register";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />

      {/* <Route
        path="/register"
        element={<Register />}
      /> */}
    </Routes>
  );
}

export default AuthRoutes;