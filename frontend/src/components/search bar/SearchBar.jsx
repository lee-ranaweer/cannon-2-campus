import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search destinations"
          className="search-input"
        />

        {/* Check-in */}
        <div className="search-section">
          <p className="search-label">Check in</p>
          <p className="search-value">Add dates</p>
        </div>

        {/* Check-out */}
        <div className="search-section">
          <p className="search-label">Check out</p>
          <p className="search-value">Add dates</p>
        </div>

        {/* Guests */}
        <div className="search-section">
          <p className="search-label">Who</p>
          <p className="search-value">Add guests</p>
        </div>

        {/* Search Icon */}
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
