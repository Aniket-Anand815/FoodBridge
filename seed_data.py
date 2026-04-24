import sys
import os
import random
import bcrypt

# Add project root to sys.path
sys.path.append(os.getcwd())

from app.database.db import engine, SessionLocal, Base
from app.models.organization import Organization
from app.models.user import User
from app.models.donation import Donation
from app.models.location import Location

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Major Indian Cities and their coordinates
CITIES = {
    "Delhi": (28.6139, 77.2090),
    "Mumbai": (19.0760, 72.8777),
    "Bangalore": (12.9716, 77.5946),
    "Chennai": (13.0827, 80.2707),
    "Kolkata": (22.5726, 88.3639),
    "Hyderabad": (17.3850, 78.4867),
    "Pune": (18.5204, 73.8567),
    "Ahmedabad": (23.0225, 72.5714),
    "Lucknow": (26.8467, 80.9462),
    "Jaipur": (26.9124, 75.7873)
}

ORG_TYPES = ["NGO", "Orphanage", "Animal Shelter", "Old Age Home", "Biogas Plant"]
ORG_NAMES = {
    "NGO": ["Food for All", "Seva Foundation", "Goonj", "Feeding India", "HelpAge"],
    "Orphanage": ["Little Hearts", "Hope Home", "Sunshine Orphanage", "Bright Future", "Angel's Abode"],
    "Animal Shelter": ["Paws & Claws", "Safe Animal Shelter", "Furry Friends", "Happy Tails", "Safe Haven Pets"],
    "Old Age Home": ["Golden Years", "Dignity Home", "Elder Care", "Peaceful Sunset", "Senior Sanctuary"],
    "Biogas Plant": ["Green Energy Biogas", "Eco Waste Solutions", "Renewable Energy Co", "Clean Fuel Plant", "Bio Power Plant"]
}

def seed():
    # Clear existing data
    db.query(Organization).delete()
    db.query(User).delete()
    
    # Add Trial Users
    users = []
    password = "123"
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    
    # Standard trial accounts
    users.append(User(username="ngo1", hashed_password=hashed, role="ngo"))
    users.append(User(username="donor1", hashed_password=hashed, role="donor"))
    users.append(User(username="admin1", hashed_password=hashed, role="admin"))

    users.append(User(username="ngo123", hashed_password=hashed, role="ngo"))
    users.append(User(username="donor123", hashed_password=hashed, role="donor"))
    users.append(User(username="admin123", hashed_password=hashed, role="admin"))

    # More descriptive dummy users
    users.append(User(username="green_hotel", hashed_password=hashed, role="donor"))
    users.append(User(username="city_kitchen", hashed_password=hashed, role="donor"))
    users.append(User(username="taj_mahal_hotel", hashed_password=hashed, role="donor"))
    users.append(User(username="marriott_delhi", hashed_password=hashed, role="donor"))
    users.append(User(username="zomato_cloud", hashed_password=hashed, role="donor"))
    users.append(User(username="swiggy_central", hashed_password=hashed, role="donor"))
    users.append(User(username="local_caterer", hashed_password=hashed, role="donor"))

    users.append(User(username="seva_foundation", hashed_password=hashed, role="ngo"))
    users.append(User(username="hope_orphanage", hashed_password=hashed, role="ngo"))
    users.append(User(username="robinhood_army", hashed_password=hashed, role="ngo"))
    users.append(User(username="khalsa_aid", hashed_password=hashed, role="ngo"))
    users.append(User(username="feeding_india_ngo", hashed_password=hashed, role="ngo"))
    users.append(User(username="smile_foundation", hashed_password=hashed, role="ngo"))
    users.append(User(username="goonj_foundation", hashed_password=hashed, role="ngo"))

    users.append(User(username="super_admin", hashed_password=hashed, role="admin"))
    users.append(User(username="regional_admin", hashed_password=hashed, role="admin"))
    users.append(User(username="compliance_head", hashed_password=hashed, role="admin"))
    users.append(User(username="system_monitor", hashed_password=hashed, role="admin"))
    
    db.add_all(users)
    db.commit()
    print(f"Seeded {len(users)} trial users (password: 123)")

    org_list = []

    # Add specific organizations for the new dummy NGOs
    org_list.append(Organization(
        name="Sewa Foundation",
        ngo_name="Sewa Foundation",
        type="NGO",
        latitude=28.6139,
        longitude=77.2090,
        address="Sector 12, RK Puram, New Delhi",
        rating=4.8,
        is_verified=True,
        id_number="DL/2024/0001234",
        district="New Delhi",
        state="Delhi",
        contact_email="contact@sewa.org"
    ))

    org_list.append(Organization(
        name="Hope Orphanage",
        ngo_name="Hope Orphanage",
        type="Orphanage",
        latitude=19.0760,
        longitude=72.8777,
        address="Andheri West, Mumbai",
        rating=4.5,
        is_verified=True,
        id_number="MH/2024/0005678",
        district="Mumbai",
        state="Maharashtra",
        contact_email="help@hope.org"
    ))
    
    # Generate ~20 orgs per major city
    for city, (base_lat, base_lng) in CITIES.items():
        for i in range(20):
            org_type = random.choice(ORG_TYPES)
            org_name = f"{random.choice(ORG_NAMES[org_type])} {city} #{i+1}"
            
            # Randomize within ~50km radius
            lat = base_lat + random.uniform(-0.5, 0.5)
            lng = base_lng + random.uniform(-0.5, 0.5)
            
            org = Organization(
                name=org_name,
                ngo_name=org_name,
                type=org_type,
                latitude=lat,
                longitude=lng,
                address=f"Street {i+1}, {city}, India",
                rating=round(random.uniform(3.5, 5.0), 1),
                is_verified=random.choice([True, True, False]),
                id_number=f"DL/202{random.randint(0,5)}/{random.randint(1000,9999)}",
                district=city,
                state="State",
                contact_email=f"contact_{i}@example.com"
            )
            org_list.append(org)
            
    # Add some random ones across India
    for i in range(100):
        org_type = random.choice(ORG_TYPES)
        # Bounding box for India
        lat = random.uniform(8.0, 35.0)
        lng = random.uniform(69.0, 95.0)
        
        org = Organization(
            name=f"Rural {org_type} Support #{i+1}",
            type=org_type,
            latitude=lat,
            longitude=lng,
            address=f"Village Route {i+1}, Rural India"
        )
        org_list.append(org)

    db.add_all(org_list)
    db.commit()
    print(f"Seeded {len(org_list)} organizations across India.")

if __name__ == "__main__":
    seed()
