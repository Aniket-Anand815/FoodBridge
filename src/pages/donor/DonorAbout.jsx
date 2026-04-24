import Sidebar from "../../components/Sidebar";
import { ShieldCheck } from "lucide-react";

export default function DonorAbout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>About FoodBridge</h1>
            <p style={{ color: "var(--text-muted)" }}>Our mission and your impact.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "3rem", background: "linear-gradient(rgba(0, 210, 255, 0.05), rgba(58, 123, 213, 0.05))", maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
            <ShieldCheck color="var(--primary)" size={36} />
            <h2 style={{ margin: 0 }}>The Mission</h2>
          </div>
          <div style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.1rem" }}>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong>FoodBridge</strong> is a community-driven platform designed to bridge the gap between surplus resources and those in need. We leverage technology to create a seamless ecosystem for giving, ensuring that no resource goes to waste.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
              <div className="glass-panel-dark" style={{ padding: "1.5rem", borderRadius: "16px" }}>
                <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Your Role as a Donor</h4>
                <p style={{ fontSize: "0.95rem" }}>
                  As a donor, you are the starting point of this chain of kindness. By listing your surplus food, clothes, or organic waste, you prevent perfectly good resources from going to waste.
                </p>
              </div>
              <div className="glass-panel-dark" style={{ padding: "1.5rem", borderRadius: "16px" }}>
                <h4 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Impacting Society</h4>
                <p style={{ fontSize: "0.95rem" }}>
                  Every donation you make helps feed a hungry child, provides warmth to someone in need, or contributes to green energy through our bioplant partnerships.
                </p>
              </div>
            </div>

            <p style={{ marginTop: "2.5rem", textAlign: "center", fontStyle: "italic", color: "var(--primary)" }}>
              "Together, we are building a more sustainable and compassionate society."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
