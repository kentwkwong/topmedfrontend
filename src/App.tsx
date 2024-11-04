import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import ImagePath from "./assets/topmedical-transporation-logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leave } from "./pages/Leave";
import Timesheet from "./pages/Timesheet";
import { Info } from "./pages/Info";
function App() {
  let navItems = ["Info", "Timesheet", "Leave"];
  return (
    <>
      <Navbar
        brandName="Top Medical"
        imageSrcPath={ImagePath}
        navItems={navItems}
      />
      <Routes>
        <Route path="/Info" element={<Info />}></Route>
        <Route path="/Timesheet" element={<Timesheet />}></Route>
        <Route path="/Leave" element={<Leave />}></Route>
      </Routes>
    </>
  );
}

export default App;
