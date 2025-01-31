import React from "react";
import { FaSearch, FaGlobe, FaBars, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="navbar-logo">EasyNook</div>

      {/* Center - Nav Links */}
      <div className="navbar-links">
        <a href="#">Homes</a>
        <a href="#">Experiences</a>
      </div>

      {/* Right Side - User Controls */}
      <div className="navbar-right">
        <a href="#" className="navbar-host">
          Airbnb your home
        </a>
        <FaGlobe className="navbar-icon" />

        {/* Profile and Menu */}
        <div className="navbar-menu">
          <FaBars className="navbar-menu-icon" />
          <FaUserCircle className="navbar-profile-icon" />
        </div>
      </div>
    </nav>
  );
}
