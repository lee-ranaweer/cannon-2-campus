import React from "react";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaSearch, FaGlobe, FaBars, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="navbar-logo">EasyNook</div>

      {/* Center - Nav Links */}
      <div className="navbar-links">
        <AnimatedLink href="#">Rentals</AnimatedLink>
        <AnimatedLink href="#">Schools</AnimatedLink>
      </div>

      {/* Right Side - User Controls */}
      <div className="navbar-right">
        <a href="#" className="navbar-host">
          <AnimatedLink href="#">Become a Host</AnimatedLink>
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

function AnimatedLink({ href, children }) {
  const controls = useAnimation();

  return (
    <a
      href={href}
      style={{
        position: "relative",
        textDecoration: "none",
        color: "black",
        fontSize: "14px",
        paddingBottom: "4px", // Space for the underline
        display: "inline-block",
      }}
      onMouseEnter={() => {
        controls.stop();
        // Always restart from the left (hidden)
        controls.set({ width: "0%", left: "0%" });
        // Animate to full underline from left to right
        controls.start({
          width: "100%",
          left: "0%",
          transition: { duration: 0.3, ease: "easeInOut" },
        });
      }}
      onMouseLeave={() => {
        controls.stop();
        // Regardless of current state, exit to the right
        controls.start({
          width: "0%",
          left: "100%",
          transition: { duration: 0.3, ease: "easeInOut" },
        });
      }}
    >
      {children}
      <motion.div
        animate={controls}
        initial={{ width: "0%", left: "0%" }}
        style={{
          position: "absolute",
          bottom: "-2px",
          height: "2px",
          backgroundColor: "black",
          display: "block",
        }}
      />
    </a>
  );
}
