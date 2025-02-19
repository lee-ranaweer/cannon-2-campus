import requests
from bs4 import BeautifulSoup
import sqlite3

# Function to scrape the specified page
def scrape_page(url):
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to fetch {url}")
        return []
    
    soup = BeautifulSoup(response.content, "html.parser")
    listings = []
    
    # Loop through each housing item (li with class "housing-item")
    for item in soup.select("li.housing-item"):
        # Attempt to extract the image URL using the original selector
        img_tag = item.select_one("div.listing-photo img")
        if not img_tag:
            # If not found, try a simpler approach: grab the first <img> in the item
            img_tag = item.find("img")
        
        image_url = img_tag.get("src", "N/A") if img_tag else "N/A"
        print("Image URL extracted:", image_url)  # Debug print
        
        # Extract the details from the details div
        details = item.select_one("div.details")
        if not details:
            continue  # Skip if no details found

        title = details.select_one("h2 a").get_text(strip=True) if details.select_one("h2 a") else "N/A"
        link = details.select_one("h2 a")["href"] if details.select_one("h2 a") else "N/A"
        posted_date = details.select_one(".post-date dd").get_text(strip=True) if details.select_one(".post-date dd") else "N/A"
        listing_type = details.select_one(".type dd").get_text(strip=True) if details.select_one(".type dd") else "N/A"
        price = details.select_one(".price dd").get_text(strip=True) if details.select_one(".price dd") else "N/A"
        description = details.select_one(".description").get_text(strip=True) if details.select_one(".description") else "N/A"
        
        # Append extracted data as a dictionary
        listings.append({
            "title": title,
            "link": link,
            "posted_date": posted_date,
            "type": listing_type,
            "price": price,
            "description": description,
            "image_url": image_url,
        })
    
    return listings

# Function to save data to SQLite
def save_to_db(listings, db_name="housing_listings.db"):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    
    # Create a table if it doesn't exist (including an image_url column)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS listings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        link TEXT,
        posted_date TEXT,
        type TEXT,
        price TEXT,
        description TEXT,
        image_url TEXT
    )
    """)
    
    # Insert listings into the database
    for listing in listings:
        cursor.execute("""
        INSERT INTO listings (title, link, posted_date, type, price, description, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (listing["title"], listing["link"], listing["posted_date"], listing["type"], listing["price"], listing["description"], listing["image_url"]))
    
    conn.commit()
    conn.close()

def main():
    base_url = "https://thecannon.ca/housing/page/"
    page = 1  # Start from page 1
    all_listings = []

    while True:
        url = f"{base_url}{page}/"
        print(f"Scraping {url}")
        
        listings = scrape_page(url)
        if not listings:  # Stop if no listings are found (end of pages)
            print(f"No listings found on page {page}. Ending loop.")
            break
        
        all_listings.extend(listings)
        page += 1  # Move to the next page

    if all_listings:
        print(f"Scraped {len(all_listings)} total listings across {page - 1} pages.")
        save_to_db(all_listings)
        print("All listings saved to the database.")
    else:
        print("No listings found on any pages.")

if __name__ == "__main__":
    main()
