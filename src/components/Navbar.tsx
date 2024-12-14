import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

interface NavbarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

function Navbar({ brandName, imageSrcPath, navItems }: NavbarProps) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handlelogin = () => {
    navigate("/");
  };
  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white shadow">
      <div className="container-fluid">
        <Link to="/Info">
          <img
            src={imageSrcPath}
            alt="Logo"
            width="200"
            height="60"
            className="d-inline-block align-text-top"
          />
        </Link>
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/pulsar-line/48/beta-button.png"
          alt="beta-button"
        />

        {user ? (
          <Toolbar>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h6" color="green" align="center">
                Welcome, {user.name}!
              </Typography>
            </Box>

            {/* Navbar Links */}
            <Box sx={{ display: "flex" }}>
              <IconButton onClick={handlelogout}>
                <img
                  src="https://img.icons8.com/?size=100&id=vGj0AluRnTSa&format=png&color=000000"
                  alt="logout"
                  style={{ width: "40px", height: "40px" }}
                />
              </IconButton>
            </Box>
          </Toolbar>
        ) : (
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={handlelogin}>
              <img
                src="https://img.icons8.com/?size=100&id=1tGwehGCdcr6&format=png&color=000000"
                alt="login"
                style={{ width: "40px", height: "40px" }}
              />
            </IconButton>
          </Box>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
