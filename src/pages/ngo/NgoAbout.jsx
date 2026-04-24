import Sidebar from "../../components/Sidebar";
import { Info } from "lucide-react";

export default function NgoAbout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>About FoodBridge</h1>
            <p style={{ color: "var(--text-muted)" }}>Our vision for NGOs and social impact.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "3rem", background: "linear-gradient(rgba(16, 185, 129, 0.05), rgba(0, 210, 255, 0.05))", maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
            <Info color="var(--success)" size={36} />
            <h2 style={{ margin: 0 }}>Empowering Social Impact</h2>
          </div>
          <div style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.1rem" }}>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong>FoodBridge</strong> is a platform built on the principle of efficient resource redistribution. We empower social organizations to scale their impact through digital coordination and real-time donation management.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
              <div className="glass-panel-dark" style={{ padding: "1.5rem", borderRadius: "16px" }}>
                <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Your Role as an NGO</h4>
                <p style={{ fontSize: "0.95rem" }}>
                  As an NGO, you are the guardians of distribution. By using this dashboard to manage donations and waste, you ensure that every item reaches its maximum potential.
                </p>
              </div>
              <div className="glass-panel-dark" style={{ padding: "1.5rem", borderRadius: "16px" }}>
                <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Impacting Society</h4>
                <p style={{ fontSize: "0.95rem" }}>
                  Your work ensures that food doesn't rot in landfills while people go hungry. You are directly improving the quality of life and promoting a circular economy.
                </p>
              </div>
            </div>

            <p style={{ marginTop: "2.5rem", textAlign: "center", fontStyle: "italic", color: "var(--success)" }}>
              "Bridging the gap between abundance and need."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
