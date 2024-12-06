import React from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import ImagePath from "./assets/topmedical-transporation-logo.png";
import ImagePath from "./assets/topmedical_logo_banner.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leave } from "./pages/Leave";
import Timesheet from "./pages/Timesheet";
import TopMedTimesheet from "./pages/TopMedTimesheet";
import Info from "./pages/Info";
import { Teeth } from "./pages/Teeth";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  let navItems = ["Info", "Timesheet", "Leave"];
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          brandName="Top Medical"
          imageSrcPath={ImagePath}
          navItems={navItems}
        />
        <span>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Info" element={<Info />}></Route>
            <Route path="/Timesheet" element={<Timesheet />}></Route>
            <Route
              path="/TopMedTimesheet"
              element={<TopMedTimesheet />}
            ></Route>
            <Route path="/Leave" element={<Leave />}></Route>
            <Route path="/Teeth" element={<Teeth />}></Route>
          </Routes>
        </span>
      </ThemeProvider>
    </>
  );
}

export default App;
