import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function WaitingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { org, itemType } = location.state || {}
  const [timeLeft, setTimeLeft] = useState(15) // 15 minutes waiting time example

  useEffect(() => {
    if (!org) {
      navigate("/donor")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 60000) // update every minute

    return () => clearInterval(timer)
  }, [org, navigate])

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "30px", minHeight: "100vh", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        <div style={{ textAlign: "center", maxWidth: "600px", background: "white", padding: "50px", borderRadius: "30px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <h1 style={{ color: "#1f2937", marginBottom: "10px" }}>Request Sent!</h1>
          <p style={{ color: "#6b7280", marginBottom: "40px" }}>
            Connecting with <strong>{org?.name}</strong> for your <strong>{itemType}</strong> donation.
          </p>

          {/* Fun Animation Area */}
          <div className="animation-container">
             <div className="heart">❤️</div>
             <div className="food-box">📦</div>
             <div className="delivery-bike">🛵</div>
             <div className="road"></div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "48px", color: "#e94560", margin: "0" }}>{timeLeft}</h2>
            <p style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "14px", color: "#9ca3af", margin: "0" }}>Minutes Estimated Waiting Time</p>
          </div>

          <button 
            onClick={() => navigate("/donor")}
            style={{
              marginTop: "40px",
              padding: "12px 30px",
              backgroundColor: "transparent",
              color: "#6b7280",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#6b7280"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
          >
            Back to Dashboard
          </button>
        </div>

      </div>

      <style>{`
        .animation-container {
          position: relative;
          height: 150px;
          width: 300px;
          margin: 0 auto;
          overflow: hidden;
          background: #fdf2f4;
          border-radius: 20px;
        }

        .road {
          position: absolute;
          bottom: 30px;
          width: 100%;
          height: 2px;
          background: repeating-linear-gradient(90deg, #d1d5db 0, #d1d5db 10px, transparent 10px, transparent 20px);
          animation: road-move 1s linear infinite;
        }

        .delivery-bike {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 40px;
          animation: bounce 0.5s ease-in-out infinite alternate;
        }

        .food-box {
          position: absolute;
          top: 20px;
          left: -50px;
          font-size: 30px;
          animation: float-across 3s linear infinite;
        }

        .heart {
          position: absolute;
          top: 10px;
          right: -50px;
          font-size: 24px;
          animation: float-across 4s linear infinite 1s;
        }

        @keyframes road-move {
          from { transform: translateX(0); }
          to { transform: translateX(-20px); }
        }

        @keyframes bounce {
          from { bottom: 32px; }
          to { bottom: 38px; }
        }

        @keyframes float-across {
          0% { left: -50px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 350px; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
