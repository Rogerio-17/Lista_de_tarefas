import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Register from "../pages/registros";
import Admin from "../pages/admin";

import Privite from "./Privite";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <Privite>
            <Admin />
          </Privite>
        }
      />
    </Routes>
  );
}

export default RoutesApp;
