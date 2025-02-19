// src/components/houseCard/HouseCard.js
import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import "./HouseCard.css";

export default function HouseCard({
  id,
  title,
  posted_date,
  price,
  image_url,
}) {
  // Use the proxy to display the image
  const proxyUrl = `http://localhost:5000/image-proxy/?url=${encodeURIComponent(
    image_url
  )}`;

  return (
    <Link to={`/listings/${id}`} className="house-card-link">
      <div className="house-card">
        <div className="house-image-container">
          <img src={proxyUrl} alt={title} className="house-image" />
          <span className="guest-favorite">Guest favourite</span>
          <FaHeart className="heart-icon" />
        </div>
        <div className="house-details">
          <h3 className="house-title">{title}</h3>
          <p className="house-location">Guelph, ON</p>
          <p className="house-distance">10km away</p>
          <p className="house-date">{posted_date}</p>
          <p className="house-price">
            <strong>{price}/Month</strong>
          </p>
          <div className="house-rating">
            <FaStar className="star-icon" />
            <span>5 star</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
