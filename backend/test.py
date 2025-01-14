import sqlite3

def view_database(db_name="housing_listings.db"):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    # Query all data from the listings table
    cursor.execute("SELECT * FROM listings")
    rows = cursor.fetchall()

    # Print each row
    for row in rows:
        print(row)

    conn.close()

if __name__ == "__main__":
    view_database()
