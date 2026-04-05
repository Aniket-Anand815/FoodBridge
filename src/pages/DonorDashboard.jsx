import {useState} from "react"
import Sidebar from "../components/Sidebar"
import MapTracker from "../components/MapTracker"
import KPICard from "../components/KPICard"
import {Line, Pie} from "react-chartjs-2"
import "chart.js/auto"

export default function DonorDashboard(){

 const [food,setFood] = useState("")
 const [donations] = useState(24)
 const [pickups] = useState(18)
 const [impact] = useState(156)

 const donate = ()=>{
  alert("Donation submitted")
 }

 const lineChartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [{
   label: 'Donations per Week',
   data: [5, 8, 12, 10, 15],
   borderColor: '#4CAF50',
   backgroundColor: 'rgba(76, 175, 80, 0.1)',
   tension: 0.4,
   fill: true
  }]
 }

 const pieChartData = {
  labels: ['Food Items', 'Clothing', 'Medical'],
  datasets: [{
   data: [45, 30, 25],
   backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
  }]
 }

 return(
  <div>
   <Sidebar/>
   <div style={{marginLeft:"240px",padding:"30px",minHeight:"100vh",backgroundColor:"#f5f5f5"}}>
    <h1 style={{marginBottom:"30px",color:"#333"}}>Donor Dashboard</h1>

    <div style={{
     display:"grid",
     gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
     gap:"20px",
     marginBottom:"40px"
    }}>
     <KPICard title="Total Donations" value={donations}/>
     <KPICard title="Pickups Scheduled" value={pickups}/>
     <KPICard title="Lives Impacted" value={impact}/>
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
      <h3>Donation Trends</h3>
      <Line data={lineChartData} options={{responsive: true}}/>
     </div>
     <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"10px",
      boxShadow:"0px 2px 6px rgba(0,0,0,0.1)"
     }}>
      <h3>Donation Types</h3>
      <Pie data={pieChartData} options={{responsive: true}}/>
     </div>
    </div>

    <div style={{
     background:"white",
     padding:"20px",
     borderRadius:"10px",
     boxShadow:"0px 2px 6px rgba(0,0,0,0.1)",
     marginBottom:"40px"
    }}>
     <h2 style={{marginBottom:"20px"}}>Make a Donation</h2>
     <div style={{display:"flex",gap:"10px",marginBottom:"20px"}}>
      <input
       placeholder="Food item"
       onChange={e=>setFood(e.target.value)}
       style={{
        padding:"10px",
        border:"1px solid #ddd",
        borderRadius:"5px",
        flex:1
       }}
      />
      <button 
       onClick={donate}
       style={{
        padding:"10px 20px",
        background:"#4CAF50",
        color:"white",
        border:"none",
        borderRadius:"5px",
        cursor:"pointer",
        fontWeight:"bold"
       }}
      >
       Donate
      </button>
     </div>
    </div>

    <div style={{
     background:"white",
     padding:"20px",
     borderRadius:"10px",
     boxShadow:"0px 2px 6px rgba(0,0,0,0.1)",
     minHeight:"400px"
    }}>
     <h2 style={{marginBottom:"20px"}}>Pickup Tracking</h2>
     <MapTracker/>
    </div>
   </div>
  </div>
 )
}