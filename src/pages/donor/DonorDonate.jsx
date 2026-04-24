import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DonorDonate() {
  const navigate = useNavigate();
  const [itemType, setItemType] = useState("Food");

  const donate = () => {
    navigate("/select-ngo", { state: { itemType } });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>Make a Donation</h1>
            <p style={{ color: "var(--text-muted)" }}>Share your resources with the community.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "3rem", maxWidth: "800px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
            <Heart color="var(--accent)" size={32} />
            <h2 style={{ margin: 0 }}>Select Donation Type</h2>
          </div>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Choose the type of items you wish to donate. Our system will match you with the best NGO in your vicinity.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <select
              value={itemType}
              onChange={e => setItemType(e.target.value)}
              className="input-field"
              style={{ flex: 1, padding: "1rem", fontSize: "1rem" }}
            >
              <option value="Food">Food</option>
              <option value="Clothes">Clothes</option>
              <option value="Animal Food">Animal Food</option>
              <option value="Other">Other</option>
            </select>
            <button className="btn btn-primary" style={{ padding: "1rem 2.5rem" }} onClick={donate}>
              Next: Select NGO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
