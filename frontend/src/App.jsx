// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import SearchBar from "./components/search bar/SearchBar";
import Listings from "./components/house listings/Listings";
import HouseDetail from "./components/house details/HouseDetail";

import "./App.css";

export default function App() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  // Fetch listings from Flask API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/listings/")
      .then((response) => {
        setListings(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch listings");
        console.error(err);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Listings listings={listings} />} />
          <Route path="/listings/:id" element={<HouseDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
