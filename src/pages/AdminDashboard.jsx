import {useEffect,useState} from "react"
import Sidebar from "../components/Sidebar"
import KPICard from "../components/KPICard"
import {Bar, Line, Radar} from "react-chartjs-2"
import "chart.js/auto"

export default function AdminDashboard(){

 const [stats,setStats] = useState({
  donations:0,
  ngos:0,
  pickups:0,
  users:0
 })

 useEffect(()=>{
  setStats({
   donations:120,
   ngos:32,
   pickups:15,
   users:456
  })
 },[])

 const platformStatsData = {
  labels:["Donations","NGOs","Pickups","Users"],
  datasets:[{
   label:"Platform Stats",
   data:[stats.donations, stats.ngos, stats.pickups, stats.users],
   backgroundColor: '#2196F3'
  }]
 }

 const trendsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
   label: 'Donations Trend',
   data: [25, 35, 45, 55],
   borderColor: '#4CAF50',
   backgroundColor: 'rgba(76, 175, 80, 0.1)',
   tension: 0.4,
   fill: true
  }]
 }

 const riskData = {
  labels: ['Food Safety', 'Document Verification', 'Financial Health', 'Operational Capacity', 'Transparency'],
  datasets: [{
   label: 'Risk Score',
   data: [20, 15, 10, 25, 18],
   borderColor: '#FF9800',
   backgroundColor: 'rgba(255, 152, 0, 0.2)'
  }]
 }

 return(
  <div>
   <Sidebar/>
   <div style={{marginLeft:"240px",padding:"30px",minHeight:"100vh",backgroundColor:"#f5f5f5"}}>
    <h1 style={{marginBottom:"30px",color:"#333"}}>Admin Dashboard</h1>

    <div style={{
     display:"grid",
     gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
     gap:"20px",
     marginBottom:"40px"
    }}>
     <KPICard title="Total Donations" value={stats.donations}/>
     <KPICard title="Active NGOs" value={stats.ngos}/>
     <KPICard title="Pending Pickups" value={stats.pickups}/>
     <KPICard title="Total Users" value={stats.users}/>
    </div>

    <div style={{
     display:"grid",
     gridTemplateColumns:"1fr 1fr",
     gap:"30px",
     marginBottom:"40px"
    }}>
     <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"10px",
      boxShadow:"0px 2px 6px rgba(0,0,0,0.1)"
     }}>
      <h3 style={{marginBottom:"20px"}}>Platform Analytics</h3>
      <Bar data={platformStatsData} options={{responsive: true}}/>
     </div>
     <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"10px",
      boxShadow:"0px 2px 6px rgba(0,0,0,0.1)"
     }}>
      <h3 style={{marginBottom:"20px"}}>Donation Trends</h3>
      <Line data={trendsData} options={{responsive: true}}/>
     </div>
    </div>

    <div style={{
     background:"white",
     padding:"20px",
     borderRadius:"10px",
     boxShadow:"0px 2px 6px rgba(0,0,0,0.1)",
     marginBottom:"40px"
    }}>
     <h3 style={{marginBottom:"20px"}}>Fraud Detection AI - Risk Assessment</h3>
     <p style={{color:"#666",marginBottom:"20px"}}>NGO risk scoring powered by ML model.</p>
     <div style={{maxWidth:"500px"}}>
      <Radar data={riskData} options={{responsive: true}}/>
     </div>
    </div>

    <div style={{
     background:"#fff3cd",
     padding:"20px",
     borderRadius:"10px",
     borderLeft:"4px solid #FF9800",
     boxShadow:"0px 2px 6px rgba(0,0,0,0.1)"
    }}>
     <h4>⚠️ System Health</h4>
     <p style={{marginBottom:"10px"}}>All systems operational. 98.5% uptime this month.</p>
    </div>
   </div>
  </div>
 )
}