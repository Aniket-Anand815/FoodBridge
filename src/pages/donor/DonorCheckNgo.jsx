import Sidebar from "../../components/Sidebar";
import MapTracker from "../../components/MapTracker";
import { Navigation } from "lucide-react";

export default function DonorCheckNgo() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>NGO & Pickup Tracking</h1>
            <p style={{ color: "var(--text-muted)" }}>Find nearby organizations and track your contributions.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem", minHeight: "600px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <Navigation color="var(--primary)" size={28} />
            <h3 style={{ margin: 0 }}>Regional Social Organizations</h3>
          </div>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", height: "550px" }}>
            <MapTracker />
          </div>
        </div>
      </div>
    </div>
  );
}
