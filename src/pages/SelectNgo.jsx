import { useState, useEffect, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getNearbyOrganizations } from "../api/api"
import Sidebar from "../components/Sidebar"

export default function SelectNgo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { itemType } = location.state || { itemType: "Food" }
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [organizations, setOrganizations] = useState([])
  const [radius, setRadius] = useState(10)
  const [retryCount, setRetryCount] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)

  const fetchNearby = useCallback((lat, lng) => {
    getNearbyOrganizations(lat, lng)
      .then(data => {
        setOrganizations(data.organizations || [])
        setRadius(data.radius || 10)
        setLoading(false)
        setShowPrompt(false)
      })
      .catch(err => {
        setError("Failed to fetch nearby organizations")
        setLoading(false)
      })
  }, [])

  const requestLocation = useCallback(() => {
    setShowPrompt(false)
    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetchNearby(latitude, longitude)
        setRetryCount(0)
      },
      (err) => {
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1)
          setShowPrompt(true)
          setLoading(false)
        } else {
          // Final fallback: Use a default location (e.g., Delhi) to show something
          setError("Location denied 4 times. Showing organizations near Delhi as a fallback.")
          fetchNearby(28.6139, 77.2090) 
          setRetryCount(4)
        }
      },
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }, [retryCount, fetchNearby])

  useEffect(() => {
    requestLocation()
  }, [])

  const handleSelect = (org) => {
    navigate("/waiting", { state: { org, itemType } })
  }

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "30px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <h1 style={{ marginBottom: "10px", color: "#333" }}>Select an Organization</h1>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Donating: <strong>{itemType}</strong>
        </p>

        {showPrompt && retryCount <= 3 ? (
          <div style={{ textAlign: "center", padding: "50px", background: "white", borderRadius: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
             <div style={{ fontSize: "40px", marginBottom: "20px" }}>📍</div>
             <h3>Location Required</h3>
             <p style={{ color: "#666", marginBottom: "20px" }}>
               We need your location to find NGOs within 10km.<br/>
               Attempt {retryCount} of 4.
             </p>
             <button 
               onClick={requestLocation}
               style={{
                 padding: "12px 30px",
                 backgroundColor: "#e94560",
                 color: "white",
                 border: "none",
                 borderRadius: "10px",
                 fontWeight: "bold",
                 cursor: "pointer"
               }}
             >
               Grant Permission
             </button>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <div className="spinner"></div>
            <p>Searching for organizations...</p>
          </div>
        ) : (
          <div>
            {error && (
              <div style={{ backgroundColor: "#fff3cd", padding: "15px", borderRadius: "10px", color: "#856404", marginBottom: "20px", border: "1px solid #ffeeba" }}>
                ℹ️ {error}
              </div>
            )}
            <p style={{marginBottom: "20px", fontSize: "14px", color: "#4b5563"}}>
              Found {organizations.length} organizations within {radius}km radius.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {organizations.map((org) => (
                <div 
                  key={org.id} 
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    border: "1px solid #e5e7eb"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => handleSelect(org)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h3 style={{ margin: 0, color: "#1f2937" }}>{org.name}</h3>
                    <span style={{ 
                      fontSize: "12px", 
                      padding: "4px 8px", 
                      borderRadius: "12px", 
                      backgroundColor: "#e0f2fe", 
                      color: "#0369a1",
                      fontWeight: 600
                    }}>
                      {org.type}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: "5px 0" }}>📍 {org.address}</p>
                  <p style={{ fontSize: "14px", fontWeight: "bold", color: "#059669", margin: "10px 0 0 0" }}>
                    {org.distance} km away
                  </p>
                  <button style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#e94560",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}>
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #e94560;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
