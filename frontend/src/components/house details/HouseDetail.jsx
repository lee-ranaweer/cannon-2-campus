import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HouseDetail.css"; // Make sure this file uses the updated class names below

export default function HouseDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [drivingTime, setDrivingTime] = useState(null);
  const [error, setError] = useState(null);

  const universityAddress = "50 Stone Rd E, Guelph, ON N1G 2W1";
  const googleApiKey = "APIKEYHERE";

  // Fetch listing details from your Flask API
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/listings/${id}/`)
      .then((response) => {
        setListing(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch listing details");
        console.error(err);
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!listing) return <div>Loading...</div>;

  // Use the image proxy from your Flask API to load the house image
  const proxyUrl = `http://localhost:5000/image-proxy/?url=${encodeURIComponent(
    listing.image_url
  )}`;

  // Create a Google Maps embed URL for directions from the house (using listing.title as the origin)
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${encodeURIComponent(
    listing.title
  )}&destination=${encodeURIComponent(universityAddress)}&mode=driving`;

  return (
    <div className="detail-container">
      <div className="detail-top-section">
        {/* Left Column: House Image, Title, and Description */}
        <div className="detail-left-column">
          <img src={proxyUrl} alt={listing.title} className="detail-image" />
        </div>

        {/* Right Column: Map*/}
        <div className="detail-right-column">
          <iframe
            title="Route to University of Guelph"
            src={mapEmbedUrl}
            className="detail-map"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="detail-bottom-section">
        <h2 className="detail-title">{listing.title}</h2>
        <p className="detail-description">{listing.description}</p>
      </div>
    </div>
  );
}
