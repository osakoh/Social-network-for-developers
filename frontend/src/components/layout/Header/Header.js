import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Header/Navigation";
import logo from "../../img/logo.png";

const Header = () => {
  return (
    <header className='navbar navbar-expand-lg bg-dark navbar-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt={"logo"} style={NavBrand} />
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/developers'>
                Developers
              </Link>
            </li>
          </ul>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

// style for the navbar-brand(logo)
const NavBrand = {
  // backgroundColor: "white",
  height: "38px",
  width: "50px",
  border: "1px solid gray",
  borderRadius: "10px",
};
export default Header;
