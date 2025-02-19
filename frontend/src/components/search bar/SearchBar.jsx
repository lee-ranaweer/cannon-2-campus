import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar() {
  // Get the current vertical scroll value
  const { scrollY } = useScroll();
  // Map the scroll value (0 to 200px) to a scale value (1 to 1.05)
  const scale = useTransform(scrollY, [0, 200], [1, 1.05]);

  return (
    // Wrap the search bar in a motion.div and bind the scale style
    <motion.div className="search-bar" style={{ scale }}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search destinations"
          className="search-input"
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
    </motion.div>
  );
}
