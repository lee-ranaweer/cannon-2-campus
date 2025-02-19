import React, { useState } from "react";
import HouseCard from "../house card/HouseCard";
import "./Listings.css";

export default function Listings({ listings }) {
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 60;

  // Determine the indices for slicing the listings array.
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  // Calculate total number of pages.
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  // Handle page button click.
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="listings-container">
      <div className="house-listings">
        {currentListings.map((house, index) => (
          <HouseCard key={index} {...house} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`pagination-button ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
