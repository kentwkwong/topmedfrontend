import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

function Navbar({ brandName, imageSrcPath, navItems }: NavbarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
        {/* <a className="navbar-brand" href="#">
          <img
            src={imageSrcPath}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          <span className="fw-bolder fs-4">{brandName}</span>
        </a> */}

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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
