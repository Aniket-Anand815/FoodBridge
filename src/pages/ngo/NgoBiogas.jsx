import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Activity, Send, Mail, MapPin } from "lucide-react";
import { getOrganizations } from "../../api/api";

export default function NgoBiogas() {
  const [biogasPlants, setBiogasPlants] = useState([]);

  useEffect(() => {
    getOrganizations().then(orgs => {
      setBiogasPlants(orgs.filter(o => o.type === "Biogas Plant"));
    }).catch(e => console.error(e));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>Biogas Plant Partnerships</h1>
            <p style={{ color: "var(--text-muted)" }}>Manage organic waste and surplus food sustainably.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
            <Activity color="var(--success)" />
            <h3 style={{ margin: 0 }}>Available Facilities</h3>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {biogasPlants.map(plant => (
              <div key={plant.id} className="glass-panel-dark" style={{ padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--success)" }}>{plant.name}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  <MapPin size={14} /> {plant.address || "Location Hidden"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                  <Mail size={14} /> {plant.contact_email || "contact@bioplant.org"}
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: "100%", background: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                  onClick={() => alert(`Contacting ${plant.name}... Request sent!`)}
                >
                  <Send size={16} /> Contact Plant
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
