import React from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ImagePath from "./assets/topmedical-transporation-logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leave } from "./pages/Leave";
import Timesheet from "./pages/Timesheet";
import Timesheetsample from "./pages/Timesheetsample";
import Info from "./pages/Info";
import { Teeth } from "./pages/Teeth";
import Registration from "./pages/Registration";

function App() {
  let navItems = ["Info", "Timesheet", "Leave"];
  return (
    <>
      <Navbar
        brandName="Top Medical"
        imageSrcPath={ImagePath}
        navItems={navItems}
      />
      <span>
        <Routes>
          <Route path="/Registration" element={<Registration />}></Route>
          <Route path="/Info" element={<Info />}></Route>
          <Route path="/Timesheet" element={<Timesheet />}></Route>
          <Route path="/Timesheetsample" element={<Timesheetsample />}></Route>
          <Route path="/Leave" element={<Leave />}></Route>
          <Route path="/Teeth" element={<Teeth />}></Route>
        </Routes>
      </span>
    </>
  );
}

export default App;
