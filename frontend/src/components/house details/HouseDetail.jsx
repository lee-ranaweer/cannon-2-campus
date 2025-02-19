import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HouseDetail.css"; // Make sure to update this CSS file accordingly

export default function HouseDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [drivingTime, setDrivingTime] = useState(null);
  const [error, setError] = useState(null);

  // Coordinates for the University of Guelph (example values)
  const universityCoords = { lat: 43.5448, lng: -80.2482 };
  // Replace with your actual Google API key
  const googleApiKey = "YOUR_GOOGLE_API_KEY";

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

  // Once the listing is loaded and if lat/lng are available, fetch driving time
  useEffect(() => {
    if (listing && listing.lat && listing.lng) {
      axios
        .get("https://maps.googleapis.com/maps/api/directions/json", {
          params: {
            origin: `${listing.lat},${listing.lng}`,
            destination: `${universityCoords.lat},${universityCoords.lng}`,
            mode: "driving",
            key: googleApiKey,
          },
        })
        .then((response) => {
          if (response.data.routes.length > 0) {
            const duration = response.data.routes[0].legs[0].duration.text;
            setDrivingTime(duration);
          }
        })
        .catch((err) => {
          console.error("Error fetching directions", err);
        });
    }
  }, [listing, universityCoords.lat, universityCoords.lng, googleApiKey]);

  if (error) return <div>{error}</div>;
  if (!listing) return <div>Loading...</div>;

  // Use the image proxy from your Flask API to load the house image
  const proxyUrl = `http://localhost:5000/image-proxy/?url=${encodeURIComponent(
    listing.image_url
  )}`;

  // Create a Google Maps embed URL for directions from the house to the University
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${listing.lat},${listing.lng}&destination=${universityCoords.lat},${universityCoords.lng}&mode=driving`;

  return (
    <div className="detail-container">
      <div className="detail-top-section">
        {/* Left Column: House Image, Title, and Description */}
        <div className="detail-left-column">
          <img src={proxyUrl} alt={listing.title} className="detail-image" />
          <h2 className="detail-title">{listing.title}</h2>
          <p className="detail-description">{listing.description}</p>
        </div>

        {/* Right Column: Map and Driving Time */}
        <div className="detail-right-column">
          <iframe
            title="Route to University of Guelph"
            src={mapEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          {drivingTime && (
            <p className="detail-driving-time">
              Driving Time to University of Guelph: {drivingTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
