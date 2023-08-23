
import {Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
const Routers = () => {
  return (
     <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<App/>} />
      </Routes>
  )
}

export default Routers
