import React from "react";
import HouseCard from "../house card/HouseCard";
import "./Listings.css";

export default function Listings({ listings }) {
  return (
    <div className="house-listings">
      {listings.map((house, index) => (
        <HouseCard key={index} {...house} />
      ))}
    </div>
  );
}
