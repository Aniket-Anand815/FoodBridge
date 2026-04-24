import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import KPICard from "../components/KPICard";
import { Bar, Line, Radar } from "react-chartjs-2";
import { ShieldCheck, AlertTriangle, Users, Activity } from "lucide-react";
import "chart.js/auto";

export default function AdminDashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab") || "dashboard";

  const [stats, setStats] = useState({
    donations: 120, ngos: 32, pickups: 15, users: 456
  });

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    // Fetch all organizations
    fetch("http://127.0.0.1:8000/organizations/all")
      .then(res => res.json())
      .then(data => setOrgs(data))
      .catch(err => console.error(err));
  }, []);

  const renderContent = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardView stats={stats} />;
      case "all_ngos":
        return <AllNgosView orgs={orgs} />;
      case "verified_now":
        return <VerifiedNowView orgs={orgs} />;
      case "ngo_contacts":
        return <NgoContactsView orgs={orgs} />;
      case "verify":
        return <VerifyNgoView orgs={orgs} />;
      case "donors":
        return <DonorsView />;
      default:
        return <DashboardView stats={stats} />;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>Admin Center</h1>
            <p style={{ color: "var(--text-muted)" }}>Manage the FoodBridge ecosystem.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className="badge badge-success">System Online</div>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
}

// --- Views ---

function DashboardView({ stats }) {
  const platformStatsData = {
    labels: ["Donations", "NGOs", "Pickups", "Users"],
    datasets: [{
      label: "Platform Stats",
      data: [stats.donations, stats.ngos, stats.pickups, stats.users],
      backgroundColor: '#00d2ff',
      borderRadius: 4
    }]
  };

  const riskData = {
    labels: ['Food Safety', 'Doc Verification', 'Financial Health', 'Capacity', 'Transparency'],
    datasets: [{
      label: 'Average Risk Profile',
      data: [20, 15, 10, 25, 18],
      borderColor: '#ff4b2b',
      backgroundColor: 'rgba(255, 75, 43, 0.2)',
      borderWidth: 2,
    }]
  };

  return (
    <div className="animate-fade-in">
      <div className="stats-grid">
        <div className="glass-panel-light stat-card">
          <div className="stat-title">Total Donations</div>
          <div className="stat-value text-gradient">{stats.donations}</div>
        </div>
        <div className="glass-panel-light stat-card">
          <div className="stat-title">Active Orgs</div>
          <div className="stat-value text-gradient">{stats.ngos}</div>
        </div>
        <div className="glass-panel-light stat-card">
          <div className="stat-title">Pending Pickups</div>
          <div className="stat-value text-gradient">{stats.pickups}</div>
        </div>
        <div className="glass-panel-light stat-card">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-gradient">{stats.users}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        <div className="glass-panel-light" style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Platform Analytics</h3>
          <Bar data={platformStatsData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="glass-panel-light" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>Fraud Detection AI Risk Assessment</h3>
            <ShieldCheck color="var(--primary)" />
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            NGO & Orphanage risk scoring powered by advanced ML models.
          </p>
          <div style={{ maxHeight: "250px", display: "flex", justifyContent: "center" }}>
            <Radar data={riskData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AllNgosView({ orgs }) {
  return (
    <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem" }}>
      <h3 style={{ marginBottom: "1.5rem" }}>All Organizations (AI Rated)</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>AI Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orgs.length > 0 ? orgs.map(org => (
            <tr key={org.id}>
              <td>
                <div style={{ fontWeight: 600 }}>{org.ngo_name || org.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ID: {org.id_number || "N/A"}</div>
              </td>
              <td><span className="badge badge-primary">{org.type}</span></td>
              <td>{org.district}, {org.state}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#f59e0b" }}>★</span> {org.rating?.toFixed(1) || "4.0"}
                </div>
              </td>
              <td>
                {org.is_verified ? 
                  <span className="badge badge-success">Verified</span> : 
                  <span className="badge badge-warning">Pending</span>
                }
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>No organizations found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function VerifiedNowView({ orgs }) {
  const verifiedOrgs = orgs.filter(o => o.is_verified);
  return (
    <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem" }}>
      <h3 style={{ marginBottom: "1.5rem" }}>Latest Verified Organizations</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration No.</th>
            <th>AI Verified Status</th>
          </tr>
        </thead>
        <tbody>
          {verifiedOrgs.length > 0 ? verifiedOrgs.map(org => (
            <tr key={org.id}>
              <td>{org.ngo_name || org.name}</td>
              <td>{org.registration_number || "N/A"}</td>
              <td><span className="badge badge-success"><ShieldCheck size={12} style={{marginRight:"4px"}}/> Verified by AI</span></td>
            </tr>
          )) : (
            <tr><td colSpan="3" style={{ textAlign: "center", padding: "2rem" }}>No verified organizations yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function NgoContactsView({ orgs }) {
  return (
    <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem" }}>
      <h3 style={{ marginBottom: "1.5rem" }}>Organization Contacts</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Email</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {orgs.length > 0 ? orgs.map(org => (
            <tr key={org.id}>
              <td>{org.ngo_name || org.name}</td>
              <td>{org.contact_email || "Not Provided"}</td>
              <td>{org.district || "N/A"}</td>
            </tr>
          )) : (
            <tr><td colSpan="3" style={{ textAlign: "center", padding: "2rem" }}>No organizations found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function VerifyNgoView({ orgs }) {
  const unverified = orgs.filter(o => !o.is_verified);
  return (
    <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem" }}>
      <h3 style={{ marginBottom: "1.5rem" }}>Pending AI Verification</h3>
      {unverified.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unverified.map(org => (
              <tr key={org.id}>
                <td>{org.ngo_name || org.name}</td>
                <td>{org.type}</td>
                <td><button className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Run AI Check</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <ShieldCheck size={48} style={{ marginBottom: "1rem", color: "var(--success)" }} />
          <p>All organizations are currently verified.</p>
        </div>
      )}
    </div>
  );
}

function DonorsView() {
  return (
    <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem", textAlign: "center" }}>
      <Users size={48} style={{ marginBottom: "1rem", color: "var(--primary)" }} />
      <h3>Donor List</h3>
      <p style={{ color: "var(--text-muted)" }}>The list of registered donors will appear here.</p>
    </div>
  );
}