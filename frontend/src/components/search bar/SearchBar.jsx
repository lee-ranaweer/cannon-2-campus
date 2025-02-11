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

        {/* Search Icon */}
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
