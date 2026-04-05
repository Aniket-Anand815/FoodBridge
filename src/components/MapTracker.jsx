import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet"
import {useState, useEffect} from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapTracker(){
 const [userLocation, setUserLocation] = useState(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)
 const [mapCenter, setMapCenter] = useState([13.0827, 80.2707]) // Default to Chennai

 useEffect(() => {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
   setError("Geolocation is not supported by this browser")
   setLoading(false)
   return
  }

  // Request location permission and get current position
  navigator.geolocation.getCurrentPosition(
   (position) => {
    const { latitude, longitude } = position.coords
    const location = [latitude, longitude]
    setUserLocation(location)
    setMapCenter(location)
    setLoading(false)
   },
   (error) => {
    console.error("Error getting location:", error)
    let errorMessage = "Unable to retrieve your location"

    switch(error.code) {
     case error.PERMISSION_DENIED:
      errorMessage = "Location access denied. Please enable location permissions and refresh the page."
      break
     case error.POSITION_UNAVAILABLE:
      errorMessage = "Location information is unavailable."
      break
     case error.TIMEOUT:
      errorMessage = "Location request timed out."
      break
     default:
      errorMessage = "An unknown error occurred."
      break
    }

    setError(errorMessage)
    setLoading(false)
   },
   {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000 // 5 minutes
   }
  )
 }, [])

 if (loading) {
  return (
   <div style={{
    height: "400px",
    width: "100%",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    border: "2px dashed #ddd"
   }}>
    <div style={{textAlign: "center"}}>
     <div style={{
      width: "40px",
      height: "40px",
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #2196F3",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 10px"
     }}></div>
     <p style={{margin: 0, color: "#666"}}>Getting your location...</p>
    </div>
    <style>{`
     @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
     }
    `}</style>
   </div>
  )
 }

 if (error) {
  return (
   <div style={{
    height: "400px",
    width: "100%",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7"
   }}>
    <div style={{textAlign: "center", padding: "20px"}}>
     <div style={{fontSize: "48px", marginBottom: "10px"}}>📍</div>
     <h3 style={{color: "#856404", margin: "0 0 10px 0"}}>Location Access Required</h3>
     <p style={{color: "#856404", margin: 0}}>{error}</p>
     <button
      onClick={() => window.location.reload()}
      style={{
       marginTop: "15px",
       padding: "8px 16px",
       backgroundColor: "#ffc107",
       border: "none",
       borderRadius: "4px",
       cursor: "pointer",
       fontWeight: "bold"
      }}
     >
      Try Again
     </button>
    </div>
   </div>
  )
 }

 return(
  <div style={{position: "relative"}}>
   <MapContainer
    center={mapCenter}
    zoom={15}
    style={{
     height:"400px",
     width:"100%",
     borderRadius:"8px",
     overflow:"hidden"
    }}
   >
    <TileLayer
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />

    {/* User's current location marker */}
    {userLocation && (
     <Marker position={userLocation}>
      <Popup>
       <div style={{textAlign: "center"}}>
        <strong>📍 Your Location</strong><br/>
        <small>Lat: {userLocation[0].toFixed(4)}<br/>Lng: {userLocation[1].toFixed(4)}</small>
       </div>
      </Popup>
     </Marker>
    )}

    {/* Pickup location marker (example) */}
    <Marker position={[13.0827, 80.2707]}>
     <Popup>
      <div style={{textAlign: "center"}}>
       <strong>🏪 Pickup Location</strong><br/>
       <small>Food donation pickup point</small>
      </div>
     </Popup>
    </Marker>

   </MapContainer>

   {/* Location status indicator */}
   <div style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    zIndex: 1000
   }}>
    <span style={{color: "#4CAF50"}}>●</span>
    <span>Location Active</span>
   </div>
  </div>
 )
}