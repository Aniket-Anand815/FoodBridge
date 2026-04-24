import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import { UserPlus, ArrowLeft, Activity, ShieldCheck, Building2 } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("donor");
  
  // Basic info
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // NGO extra info
  const [name, setName] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [email, setEmail] = useState("");
  
  // Verification info
  const [idNumber, setIdNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (role === "donor") {
      submitRegistration();
    } else {
      setStep(2);
    }
  };

  const submitRegistration = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      if (role === "donor") {
        const res = await registerUser(username, password, role);
        alert(res.message);
        if(!res.error) navigate("/login");
      } else {
        // We will call a special NGO registration endpoint
        const res = await fetch("http://127.0.0.1:8000/auth/register_ngo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username, password, role: "ngo",
            name, ngoName, email, idNumber
          })
        });
        const data = await res.json();
        alert(data.message || data.error);
        if(!data.error) navigate("/login");
      }
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout">
      {/* Left side form */}
      <div className="split-left">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="glass-panel animate-fade-in" style={{ padding: "3rem", width: "100%", maxWidth: "480px" }}>
          
          <button 
            onClick={() => step === 2 ? setStep(1) : navigate("/login")} 
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.5rem" }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Activity size={40} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h1 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {step === 1 ? "Create Account" : "AI Verification"}
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              {step === 1 ? "Join the FoodBridge network today." : "Verify your NGO with our AI model."}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleNext}>
              <div className="input-group" style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1, padding: "1rem", border: role === "donor" ? "2px solid var(--primary)" : "1px solid var(--border)", borderRadius: "8px", cursor: "pointer", textAlign: "center", background: role === "donor" ? "rgba(0, 210, 255, 0.1)" : "rgba(0,0,0,0.2)" }} onClick={() => setRole("donor")}>
                  <UserPlus size={24} color={role === "donor" ? "var(--primary)" : "var(--text-muted)"} style={{ marginBottom: "8px" }} />
                  <div style={{ fontWeight: "600", color: role === "donor" ? "white" : "var(--text-muted)" }}>Donor</div>
                </div>
                <div style={{ flex: 1, padding: "1rem", border: role === "ngo" ? "2px solid var(--primary)" : "1px solid var(--border)", borderRadius: "8px", cursor: "pointer", textAlign: "center", background: role === "ngo" ? "rgba(0, 210, 255, 0.1)" : "rgba(0,0,0,0.2)" }} onClick={() => setRole("ngo")}>
                  <Building2 size={24} color={role === "ngo" ? "var(--primary)" : "var(--text-muted)"} style={{ marginBottom: "8px" }} />
                  <div style={{ fontWeight: "600", color: role === "ngo" ? "white" : "var(--text-muted)" }}>NGO</div>
                </div>
              </div>

              <div className="input-group">
                <label>Username</label>
                <input type="text" className="input-field" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" className="input-field" placeholder="Choose a password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              {role === "ngo" && (
                <>
                  <div className="input-group">
                    <label>Your Name</label>
                    <input type="text" className="input-field" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label>NGO Name</label>
                    <input type="text" className="input-field" placeholder="Enter NGO name" value={ngoName} onChange={e => setNgoName(e.target.value)} required />
                  </div>
                  <div className="input-group" style={{ marginBottom: "2rem" }}>
                    <label>Email (Gmail)</label>
                    <input type="email" className="input-field" placeholder="ngo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-primary btn-full">
                {role === "donor" ? "Register as Donor" : "Proceed to Verification"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitRegistration}>
              <div className="input-group" style={{ marginBottom: "2rem" }}>
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  DARPAN ID
                  <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "normal" }}>Format: XX/YYYY/NNNNNNN</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. DL/2024/0123456" 
                    value={idNumber} 
                    onChange={e => setIdNumber(e.target.value.toUpperCase())} 
                    required 
                    style={{ letterSpacing: "1px", fontWeight: "600" }}
                  />
                  <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    {idNumber.length > 0 && (idNumber.match(/^[A-Z]{2}\/\d{4}\/\d{7}$/) ? "✅ Valid Format" : "❌ Invalid Format")}
                  </div>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  Please enter the ID exactly as issued by the NITI Aayog NGO Darpan portal.
                </p>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? "Verifying via AI..." : "Verify & Register"}
                <ShieldCheck size={20} />
              </button>
            </form>
          )}

        </div>
      </div>

      {/* Right side background image */}
      <div className="split-right" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", right: "3rem", zIndex: 10 }}>
          <div className="glass-panel" style={{ padding: "2rem", borderLeft: "4px solid var(--primary)" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Make an Impact.</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              Whether you're a donor looking to give back or an NGO ready to distribute, FoodBridge brings us all together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}