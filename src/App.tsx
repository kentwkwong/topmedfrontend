import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import ImagePath from "./assets/topmedical-transporation-logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leave } from "./pages/Leave";
import Timesheet from "./pages/Timesheet";
import { Info } from "./pages/Info";
import { Teeth } from "./pages/Teeth";

function App() {
  let navItems = ["Info", "Timesheet", "Leave"];
  return (
    <>
      {/* <Navbar
        brandName="Top Medical"
        imageSrcPath={ImagePath}
        navItems={navItems}
      /> */}
      <span>
        <Routes>
          <Route path="/Info" element={<Info />}></Route>
          <Route path="/Timesheet" element={<Timesheet />}></Route>
          <Route path="/Leave" element={<Leave />}></Route>
          <Route path="/Teeth" element={<Teeth />}></Route>
        </Routes>
      </span>
    </>
  );
}

export default App;
