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
import History from "./pages/History";
import TopMedTimesheet from "./pages/TopMedTimesheet";
import Info from "./pages/Info";
import Root from "./pages/Root";
import { Teeth } from "./pages/Teeth";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "./components/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <UserProvider>
          <CssBaseline />
          <Navbar
            brandName="Top Medical"
            imageSrcPath={ImagePath}
            navItems={navItems}
          />
          <span>
            <Routes>
              <Route path="/" element={<Root />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route
                path="/Info"
                element={
                  <ProtectedRoute>
                    <Info />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/Timesheet"
                element={
                  <ProtectedRoute>
                    <Timesheet />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/History"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/Registration" element={<Registration />}></Route>
              <Route
                path="/TopMedTimesheet"
                element={<TopMedTimesheet />}
              ></Route>
              <Route path="/Leave" element={<Leave />}></Route>
              <Route path="/Teeth" element={<Teeth />}></Route>
            </Routes>
          </span>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
