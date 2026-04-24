import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { LogIn, ArrowRight, Activity } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginUser(username, password);
    setLoading(false);

    if (res.role) {
      localStorage.setItem("role", res.role);
      if (res.role === "admin") navigate("/admin");
      if (res.role === "ngo") navigate("/ngo");
      if (res.role === "donor") navigate("/donor");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="split-layout">
      {/* Left side form */}
      <div className="split-left">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="glass-panel animate-fade-in" style={{ padding: "3rem", width: "100%", maxWidth: "450px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Activity size={48} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
              FoodBridge
            </h1>
            <p style={{ color: "var(--text-muted)" }}>Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={login}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group" style={{ marginBottom: "2rem" }}>
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
              <LogIn size={20} />
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/register")} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "var(--primary)", 
                  cursor: "pointer",
                  fontWeight: "600",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                Register <ArrowRight size={16} />
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side background image (if screen is large) */}
      <div 
        className="split-right" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" 
        }}
      >
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", right: "3rem", zIndex: 10 }}>
          <div className="glass-panel" style={{ padding: "2rem", borderLeft: "4px solid var(--primary)" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Connecting Resources.</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Join the movement to bridge the gap between food surplus and food scarcity.
              Our platform uses smart matching to direct resources where they are needed most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}