import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useState, useEffect, useCallback } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { getOrganizations } from "../api/api"

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom icons
const createIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const icons = {
  "NGO": createIcon('blue'),
  "Orphanage": createIcon('red'),
  "Animal Shelter": createIcon('green'),
  "Old Age Home": createIcon('orange'),
  "Biogas Plant": createIcon('black'),
  "User": createIcon('violet')
};

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [center, map]);
  return null;
}

export default function MapTracker() {
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]) // Center of India
  const [organizations, setOrganizations] = useState([])

  const requestLocation = useCallback(() => {
    setShowPrompt(false)
    setLoading(true)

    if (!navigator.geolocation) {
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const location = [latitude, longitude]
        setUserLocation(location)
        setMapCenter(location)
        setLoading(false)
        setRetryCount(0)
      },
      (err) => {
        console.error("Location error:", err)
        if (retryCount < 3) { // 0, 1, 2, 3 = 4 attempts
          setRetryCount(prev => prev + 1)
          setShowPrompt(true)
        } else {
          setLoading(false)
          setRetryCount(4)
        }
      },
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }, [retryCount])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgData = await getOrganizations()
        setOrganizations(orgData)
      } catch (err) {
        console.error("Error fetching orgs:", err)
      }
    }
    fetchData()
    requestLocation()
  }, []) // Initial request

  if (loading && !showPrompt) {
    return (
      <div style={{ height: "450px", width: "100%", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div className="map-loader"></div>
      </div>
    )
  }

  if (showPrompt && retryCount <= 3) {
    return (
      <div style={{ height: "450px", width: "100%", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f5", border: "1px solid #feb2b2" }}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>📍</div>
          <h3 style={{ color: "#c53030", margin: "0 0 10px 0" }}>Location Access Required</h3>
          <p style={{ color: "#742a2a", fontSize: "14px", marginBottom: "20px" }}>
            Please enable location to find NGOs near you.<br/>
            Attempt {retryCount} of 4.
          </p>
          <button 
            onClick={requestLocation}
            style={{
              padding: "10px 25px",
              backgroundColor: "#e94560",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Allow Location Access
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: "relative", height: "500px", width: "100%", borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <MapContainer
        center={mapCenter}
        zoom={userLocation ? 12 : 5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        <RecenterMap center={userLocation} />

        {userLocation && (
          <Marker position={userLocation} icon={icons["User"]}>
            <Popup><strong>You are here</strong></Popup>
          </Marker>
        )}

        {Array.isArray(organizations) && organizations.map(org => (
          <Marker 
            key={org.id} 
            position={[org.latitude, org.longitude]} 
            icon={icons[org.type] || icons["NGO"]}
          >
            <Popup>
              <div style={{ padding: "5px" }}>
                <strong style={{ color: "#e94560" }}>{org.name}</strong><br/>
                <span style={{ fontSize: "12px", color: "#666" }}>{org.type}</span><br/>
                <p style={{ margin: "5px 0 0 0", fontSize: "11px" }}>{org.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "15px",
        borderRadius: "12px",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontSize: "12px"
      }}>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "13px" }}>Organization Types</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "blue" }}></span> NGO
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "red" }}></span> Orphanage
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "green" }}></span> Animal Shelter
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "orange" }}></span> Old Age Home
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "black" }}></span> Biogas Plant
          </div>
        </div>
      </div>
      
      {!userLocation && retryCount >= 4 && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "8px 12px",
          borderRadius: "8px",
          zIndex: 1000,
          color: "#e94560",
          fontSize: "12px",
          fontWeight: "bold",
          border: "1px solid #fecaca"
        }}>
          Showing All Organizations (India)
        </div>
      )}
    </div>
  )
}