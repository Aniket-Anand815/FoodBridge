import { useNavigate } from "react-router-dom";
import { Activity, ArrowRight, ShieldCheck, Truck, BarChart3, ChevronRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-color)", color: "var(--text-main)", overflowX: "hidden" }}>
      
      {/* Navbar */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "1.5rem 5%", 
        position: "fixed", 
        width: "100%", 
        top: 0, 
        zIndex: 1000,
        background: "rgba(11, 15, 25, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity color="white" size={24} />
          </div>
          <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>FoodBridge</h2>
        </div>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn btn-secondary" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/register")}>
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        padding: "12rem 5% 6rem", 
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div className="blob blob-1" style={{ top: "10%", left: "20%" }}></div>
        <div className="blob blob-2" style={{ bottom: "10%", right: "20%" }}></div>

        <div className="badge badge-primary" style={{ marginBottom: "2rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)", display: "inline-block", boxShadow: "0 0 10px var(--primary)" }}></span>
          Revolutionizing Food Redistribution
        </div>

        <h1 className="text-gradient animate-fade-in" style={{ fontSize: "4.5rem", maxWidth: "900px", lineHeight: 1.1, marginBottom: "1.5rem", fontWeight: 800 }}>
          Bridge the gap between surplus and scarcity.
        </h1>
        
        <p className="animate-fade-in" style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", marginBottom: "3rem", lineHeight: 1.6, animationDelay: "0.2s", opacity: 0 }}>
          Connect surplus food from restaurants and hotels to NGOs and people in need through intelligent logistics and AI verification.
        </p>

        <div className="animate-fade-in" style={{ display: "flex", gap: "1rem", animationDelay: "0.4s", opacity: 0 }}>
          <button className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }} onClick={() => navigate("/register")}>
            Join the Network <ChevronRight size={20} />
          </button>
          <button className="btn btn-secondary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }} onClick={() => navigate("/login")}>
            Explore Dashboard
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: "6rem 5%", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>How FoodBridge Works</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>An end-to-end intelligent ecosystem.</p>
        </div>

        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          
          <div className="glass-panel" style={{ padding: "2.5rem", transition: "transform 0.3s", cursor: "pointer", ":hover": { transform: "translateY(-10px)" } }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(0, 210, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: "1px solid rgba(0, 210, 255, 0.2)" }}>
              <Truck size={32} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Smart Logistics</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Real-time map tracking, ETA predictions, and automated dispatch to match donors with the nearest verified NGOs seamlessly.</p>
          </div>

          <div className="glass-panel" style={{ padding: "2.5rem" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
              <ShieldCheck size={32} color="var(--success)" />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>AI Verification</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Advanced fraud detection AI authenticates NGO registration IDs instantly, maintaining a safe, reliable, and transparent platform.</p>
          </div>

          <div className="glass-panel" style={{ padding: "2.5rem" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(245, 158, 11, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
              <BarChart3 size={32} color="var(--warning)" />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Impact Analytics</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Comprehensive admin and donor dashboards to visualize food distributed, beneficiaries reached, and carbon footprint reduced.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "3rem 5%", textAlign: "center", color: "var(--text-muted)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
          <Activity size={20} color="var(--primary)" />
          <span style={{ fontWeight: 600, fontFamily: "Outfit", color: "white" }}>FoodBridge</span>
        </div>
        <p>© 2026 FoodBridge. All rights reserved. Building a hunger-free future.</p>
      </footer>
    </div>
  );
}