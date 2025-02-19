import React, { useState } from "react";
import HouseCard from "../house card/HouseCard";
import "./Listings.css";

export default function Listings({ listings }) {
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 30;
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  // Determine the listings to display on the current page.
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  // Generate pagination buttons with ellipsis when there are too many pages.
  const getPaginationItems = () => {
    const pages = [];

    // If 13 or fewer pages, show all.
    if (totalPages <= 13) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More than 13 pages—let's create a sliding window.
      if (currentPage <= 7) {
        // Near the beginning: show pages 1 to 10, ellipsis, and last page.
        for (let i = 1; i <= 10; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 6) {
        // Near the end: show first page, ellipsis, then last 10 pages.
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 9; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Somewhere in the middle: show first page, ellipsis,
        // a window of 7 pages, ellipsis, then the last page.
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="listings-container">
      <div className="house-listings">
        {currentListings.map((house, index) => (
          <HouseCard key={index} {...house} />
        ))}
      </div>
      <div className="pagination">
        {paginationItems.map((item, idx) => {
          if (item === "ellipsis") {
            return (
              <span key={idx} className="pagination-ellipsis">
                &hellip;
              </span>
            );
          }
          return (
            <button
              key={idx}
              className={`pagination-button ${
                currentPage === item ? "active" : ""
              }`}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
