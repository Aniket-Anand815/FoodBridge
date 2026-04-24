import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Bar, Doughnut } from "react-chartjs-2";
import { ShieldCheck } from "lucide-react";
import "chart.js/auto";

export default function NgoOverview() {
  const [data, setData] = useState({
    pending: 0, accepted: 0, rejected: 0, beneficiaries: 0,
    weekly_donations: [], donation_status: []
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ngo/dashboard")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(e => console.error(e));
  }, []);

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Donations Processed',
      data: data.weekly_donations.length ? data.weekly_donations : [0,0,0,0,0,0,0],
      backgroundColor: '#00d2ff',
      borderRadius: 4
    }]
  };

  const doughnutChartData = {
    labels: ['Accepted', 'Pending', 'Rejected'],
    datasets: [{
      data: data.donation_status.length ? data.donation_status : [0,0,0],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>NGO Overview</h1>
            <p style={{ color: "var(--text-muted)" }}>Performance metrics and impact summary.</p>
          </div>
          <div className="badge badge-success"><ShieldCheck size={14} style={{marginRight:"4px"}}/> AI Verified</div>
        </div>

        <div className="stats-grid">
          <div className="glass-panel-light stat-card">
            <div className="stat-title">Pending Requests</div>
            <div className="stat-value text-gradient">{data.pending}</div>
          </div>
          <div className="glass-panel-light stat-card">
            <div className="stat-title">Accepted Donations</div>
            <div className="stat-value text-gradient">{data.accepted}</div>
          </div>
          <div className="glass-panel-light stat-card">
            <div className="stat-title">Beneficiaries Fed</div>
            <div className="stat-value text-gradient">{data.beneficiaries}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="glass-panel-light" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Weekly Activity</h3>
            <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="glass-panel-light" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Donation Status</h3>
            <div style={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}>
              <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
