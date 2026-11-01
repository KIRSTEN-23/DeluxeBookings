import NotFound from "../pages/errors/NotFound";
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AuthRoutes;