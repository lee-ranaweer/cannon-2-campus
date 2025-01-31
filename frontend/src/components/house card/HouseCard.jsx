import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import "./HouseCard.css";

export default function HouseCard({ title, posted_date, price, image }) {
  //for testing setting image to a random pic
  image = "/house-test.jpg";
  return (
    <div className="house-card">
      {/* Image Section */}
      <div className="house-image-container">
        <img src={image} alt={title} className="house-image" />
        <span className="guest-favorite">Guest favourite</span>
        <FaHeart className="heart-icon" />
      </div>

      {/* Details Section */}
      <div className="house-details">
        <h3 className="house-title">{title}</h3>
        <p className="house-location">{"Guelph On"}</p>
        <p className="house-distance">{"10km"} away</p>
        <p className="house-date">{posted_date}</p>
        <p className="house-price">
          <strong>{price} CAD night</strong>
        </p>
        <div className="house-rating">
          <FaStar className="star-icon" />
          <span>{"5 star"}</span>
        </div>
      </div>
    </div>
  );
}
