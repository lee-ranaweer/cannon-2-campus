import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/navbar/NavBar";
import SearchBar from "./components/search bar/SearchBar";
import Listings from "./components/house listings/Listings";

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

  console.log(listings);

  return (
    <div className="App">
      <NavBar></NavBar>
      <SearchBar></SearchBar>
      <Listings listings={listings}></Listings>
    </div>
  );
}
