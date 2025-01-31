import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
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
    <div className="App">
      <h1>Housing Listings</h1>

      {/* Display error message if there is an error */}
      {error && <div className="error">{error}</div>}

      <div className="listings">
        {listings.length === 0 ? (
          <p>No listings available</p>
        ) : (
          listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p>
                <strong>Price:</strong> ${listing.price}
              </p>
              <p>
                <strong>Type:</strong> {listing.type}
              </p>
              <p>
                <strong>Posted on:</strong> {listing.posted_date}
              </p>
              <a href={listing.link} target="_blank" rel="noopener noreferrer">
                View Listing
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
