from flask import Flask, jsonify, request, abort, redirect
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

# Updated CORS configuration
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:5173/",
                "http://127.0.0.1:5173/"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
            "expose_headers": ["Content-Type"]
        }
    }
)

@app.before_request
def enforce_trailing_slash():
    if request.path[-1] != "/" and request.path.startswith("/listings"):
        return redirect(request.path + "/", code=308)



def get_db_connection():
    """Helper function to connect to the SQLite database."""
    conn = sqlite3.connect("housing_listings.db")
    conn.row_factory = sqlite3.Row 
    return conn


@app.route("/listings/", methods=["GET"])
def get_listings():
    """Endpoint to retrieve all listings."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM listings")
    listings = cursor.fetchall()
    conn.close()

    result = [dict(row) for row in listings]
    return jsonify(result)


@app.route("/listings/<int:listing_id>/", methods=["GET"])
def get_listing(listing_id):
    """Endpoint to retrieve a single listing by its ID."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM listings WHERE id = ?", (listing_id,))
    listing = cursor.fetchone()
    conn.close()

    if listing is None:
        abort(404, description="Listing not found")

    return jsonify(dict(listing))


@app.route("/listings/", methods=["POST"])
def create_listing():
    """Endpoint to add a new listing."""
    if not request.json or not all(key in request.json for key in ("title", "link", "posted_date", "type", "price", "description")):
        abort(400, description="Invalid input")

    new_listing = (
        request.json["title"],
        request.json["link"],
        request.json["posted_date"],
        request.json["type"],
        request.json["price"],
        request.json["description"]
    )

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO listings (title, link, posted_date, type, price, description)
        VALUES (?, ?, ?, ?, ?, ?)
    """, new_listing)
    conn.commit()
    listing_id = cursor.lastrowid  # Get the ID of the newly inserted row
    conn.close()

    return jsonify({"id": listing_id}), 201


@app.route("/listings/<int:listing_id>/", methods=["PUT"])
def update_listing(listing_id):
    """Endpoint to update an existing listing."""
    if not request.json:
        abort(400, description="Invalid input")

    update_fields = {key: request.json[key] for key in ("title", "link", "posted_date", "type", "price", "description") if key in request.json}
    if not update_fields:
        abort(400, description="No valid fields to update")

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "UPDATE listings SET " + ", ".join(f"{key} = ?" for key in update_fields.keys()) + " WHERE id = ?"
    values = list(update_fields.values()) + [listing_id]

    cursor.execute(query, values)
    conn.commit()
    conn.close()

    return jsonify({"message": "Listing updated successfully"})


@app.route("/listings/<int:listing_id>/", methods=["DELETE"])
def delete_listing(listing_id):
    """Endpoint to delete a listing."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM listings WHERE id = ?", (listing_id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        abort(404, description="Listing not found")

    return jsonify({"message": "Listing deleted successfully"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # Changed line