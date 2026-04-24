import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Line, Pie } from "react-chartjs-2";
import { Activity, Bell } from "lucide-react";
import "chart.js/auto";

export default function DonorOverview() {
  const [donations] = useState(24);
  const [pickups] = useState(18);
  const [impact] = useState(156);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ngo/messages")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setNotifications(data);
        }
      })
      .catch(e => console.error(e));
  }, []);

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
      label: 'Donations per Week',
      data: [5, 8, 12, 10, 15],
      borderColor: '#00d2ff',
      backgroundColor: 'rgba(0, 210, 255, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const pieChartData = {
    labels: ['Food', 'Clothes', 'Medical'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: ['#00d2ff', '#3a7bd5', '#ff4b2b'],
      borderWidth: 0
    }]
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>Donor Overview</h1>
            <p style={{ color: "var(--text-muted)" }}>Your overall contribution and impact.</p>
          </div>
          <div className="badge badge-primary"><Activity size={14} style={{marginRight:"4px"}}/> Good Standing</div>
        </div>

        {notifications.length > 0 && (
          <div className="glass-panel-light animate-fade-in" style={{ padding: "1rem", marginBottom: "2rem", borderLeft: "4px solid var(--warning)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
              <Bell color="var(--warning)" size={20} />
              <h4 style={{ margin: 0, color: "var(--text-main)" }}>Notifications</h4>
            </div>
            <ul style={{ paddingLeft: "2rem", color: "var(--text-muted)", margin: 0 }}>
              {notifications.slice(-3).map((notif, idx) => (
                <li key={idx} style={{ marginBottom: "0.25rem" }}>{notif.message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="stats-grid">
          <div className="glass-panel-light stat-card">
            <div className="stat-title">Total Donations</div>
            <div className="stat-value text-gradient">{donations}</div>
          </div>
          <div className="glass-panel-light stat-card">
            <div className="stat-title">Pickups Scheduled</div>
            <div className="stat-value text-gradient">{pickups}</div>
          </div>
          <div className="glass-panel-light stat-card">
            <div className="stat-title">Lives Impacted</div>
            <div className="stat-value text-gradient">{impact}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="glass-panel-light" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Donation Trends</h3>
            <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="glass-panel-light" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Donation Types</h3>
            <div style={{ display: "flex", justifyContent: "center", maxHeight: "250px" }}>
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
