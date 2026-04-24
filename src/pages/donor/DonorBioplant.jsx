import Sidebar from "../../components/Sidebar";
import { Gift } from "lucide-react";

export default function DonorBioplant() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>Bioplant Donation</h1>
            <p style={{ color: "var(--text-muted)" }}>Turn waste into energy.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "3rem", borderLeft: "6px solid var(--success)", maxWidth: "800px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <Gift color="var(--success)" size={32} />
            <h2 style={{ margin: 0 }}>Eco-Friendly Waste Disposal</h2>
          </div>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Donate organic waste for bioplant conversion and energy production. Join the zero-waste initiative and help reduce our carbon footprint.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <input
              type="text"
              placeholder="What are you donating? (e.g. Vegetable Peelings, Leftovers)"
              className="input-field"
              style={{ flex: 1, padding: "1rem" }}
            />
            <button className="btn btn-primary" style={{ background: "var(--success)", padding: "1rem 2.5rem" }} onClick={() => alert("Bioplant donation request sent!")}>
              Send to Bioplant
            </button>
          </div>
          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "12px" }}>
            <h4 style={{ color: "var(--success)", marginBottom: "0.5rem" }}>Why Bioplants?</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Bioplants convert organic waste into biogas and fertilizer, preventing methane emissions from landfills and providing clean energy to local communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
