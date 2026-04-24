import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, ShieldAlert, List, Users, Activity, LogOut, CheckSquare, Search, Phone, Info } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const getMenuItems = () => {
    if (role === "admin") {
      return [
        { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/admin" },
        { id: "verify", label: "Verify NGO", icon: <CheckSquare size={20} />, path: "/admin?tab=verify" },
        { id: "all_ngos", label: "All NGOs", icon: <List size={20} />, path: "/admin?tab=all_ngos" },
        { id: "verified_now", label: "Verified Now", icon: <ShieldAlert size={20} />, path: "/admin?tab=verified_now" },
        { id: "ngo_contacts", label: "NGO Contacts", icon: <Phone size={20} />, path: "/admin?tab=ngo_contacts" },
        { id: "donors", label: "Donor's List", icon: <Users size={20} />, path: "/admin?tab=donors" },
      ];
    } else if (role === "ngo") {
      return [
        { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, path: "/ngo" },
        { id: "requests", label: "Donation Requests", icon: <Activity size={20} />, path: "/ngo/requests" },
        { id: "biogas", label: "Biogas Plants", icon: <Search size={20} />, path: "/ngo/biogas" },
        { id: "about", label: "About App", icon: <Info size={20} />, path: "/ngo/about" },
      ];
    } else {
      // donor
      return [
        { id: "overview", label: "Overview", icon: <Home size={20} />, path: "/donor" },
        { id: "donate", label: "Donate", icon: <Activity size={20} />, path: "/donor/donate" },
        { id: "checkNgo", label: "Check NGO", icon: <Search size={20} />, path: "/donor/check-ngo" },
        { id: "bioplant", label: "Bioplant Donate", icon: <Activity size={20} />, path: "/donor/bioplant" },
        { id: "about", label: "About App", icon: <Info size={20} />, path: "/donor/about" },
      ];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path) => {
    // Treat base path match as active
    const basePath = path.split("#")[0];
    return location.pathname === basePath;
  };

  const handleNavigation = (path) => {
    if (path.includes("#")) {
      const [routePath, hash] = path.split("#");
      if (location.pathname === routePath) {
        // Already on the page, just scroll
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to the page with hash, we'll need to scroll after load
        navigate(path);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity color="white" size={24} />
          </div>
          <h2 style={{ fontSize: "1.2rem", margin: 0, color: "var(--text-main)" }}>FoodBridge</h2>
        </div>
      </div>

      <div className="sidebar-nav">
        <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "1rem", paddingLeft: "1rem", fontWeight: 600 }}>
          Menu
        </p>
        
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <div
          className="nav-item"
          style={{ color: "var(--danger)", marginBottom: 0 }}
          onClick={() => { localStorage.clear(); navigate("/login"); }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}