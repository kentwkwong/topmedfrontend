import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { Typography } from "@mui/material";

interface NavbarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

function Navbar({ brandName, imageSrcPath, navItems }: NavbarProps) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white shadow">
      <div className="container-fluid">
        <Link to="/">
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
          <div className="d-flex" id="navbarNavDropdown">
            <Typography variant="body1" color="blue">
              Welcome, {user.username}!
            </Typography>
            <ul className="navbar-nav me-auto mb-2 mb-md-1">
              <li className="nav-item">
                <Link to="/timesheet">
                  <button type="button" className="btn btn-dark">
                    Timesheet
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="d-flex" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-md-1">
              <li className="nav-item">
                <Link to="/">
                  <button type="button" className="btn btn-dark">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* <a className="navbar-brand" href="#">
          <img
            src={imageSrcPath}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          <span className="fw-bolder fs-4">{brandName}</span>
        </a> 

        <div className="d-flex" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((items, index) => (
              <li
                key={items}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <a
                  className={
                    selectedIndex == index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  href={items}
                >
                  {items}
                </a>
              </li>
            ))}
          </ul>
        </div>*/}
      </div>
    </nav>
  );
}

export default Navbar;
