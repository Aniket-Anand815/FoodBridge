import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { CheckCircle, XCircle, Activity } from "lucide-react";

export default function NgoRequests() {
  const [requests, setRequests] = useState([]);
  const [acceptedIds, setAcceptedIds] = useState([]);
  const [rejectedIds, setRejectedIds] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ngo/dashboard");
      const json = await res.json();
      setRequests(json.requests || []);
      setAcceptedIds(json.accepted_ids || []);
      setRejectedIds(json.rejected_ids || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/ngo/${action}/${id}`, { method: "POST" });
      const json = await res.json();
      alert(json.message || json.error);
      fetchRequests();
    } catch (e) {
      console.error(e);
      alert("Error processing action");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="topbar">
          <div>
            <h1 style={{ marginBottom: "0.5rem" }}>Donation Requests</h1>
            <p style={{ color: "var(--text-muted)" }}>Manage incoming contributions in real-time.</p>
          </div>
        </div>

        <div className="glass-panel-light animate-fade-in" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}>
            <Activity color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Live Requests</h3>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Donor</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => {
                let status = "Pending";
                let statusClass = "badge-warning";
                if (acceptedIds.includes(req.id)) { status = "Accepted"; statusClass = "badge-success"; }
                if (rejectedIds.includes(req.id)) { status = "Rejected"; statusClass = "badge-danger"; }

                return (
                  <tr key={req.id}>
                    <td>#{req.id}</td>
                    <td style={{ fontWeight: 600 }}>{req.donor}</td>
                    <td>{req.type}</td>
                    <td>{req.amount}</td>
                    <td><span className={`badge ${statusClass}`}>{status}</span></td>
                    <td>
                      {status === "Pending" ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: "0.4rem 0.8rem", background: "var(--success)" }}
                            onClick={() => handleAction(req.id, "accept")}
                          >
                            <CheckCircle size={16} /> Accept
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: "0.4rem 0.8rem", color: "var(--danger)", borderColor: "var(--danger)" }}
                            onClick={() => handleAction(req.id, "reject")}
                          >
                            <XCircle size={16} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
