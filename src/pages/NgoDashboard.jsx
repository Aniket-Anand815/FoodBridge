import {useState} from "react"
import Sidebar from "../components/Sidebar"
import KPICard from "../components/KPICard"
import {Bar, Doughnut} from "react-chartjs-2"
import "chart.js/auto"

export default function NgoDashboard(){

 const [pending] = useState(12)
 const [accepted] = useState(45)
 const [beneficiaries] = useState(287)

 const barChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
   label: 'Donations Received',
   data: [8, 12, 5, 10, 15, 9, 7],
   backgroundColor: '#2196F3'
  }]
 }

 const doughnutChartData = {
  labels: ['Accepted', 'Pending', 'Rejected'],
  datasets: [{
   data: [45, 12, 8],
   backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
  }]
 }

 return(
  <div>
   <Sidebar/>
   <div style={{marginLeft:"240px",padding:"30px",minHeight:"100vh",backgroundColor:"#f5f5f5"}}>
    <h1 style={{marginBottom:"30px",color:"#333"}}>NGO Dashboard</h1>

    <div style={{
     display:"grid",
     gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
     gap:"20px",
     marginBottom:"40px"
    }}>
     <KPICard title="Pending Requests" value={pending}/>
     <KPICard title="Accepted" value={accepted}/>
     <KPICard title="Beneficiaries" value={beneficiaries}/>
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
      <h3>Weekly Donations</h3>
      <Bar data={barChartData} options={{responsive: true}}/>
     </div>
     <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"10px",
      boxShadow:"0px 2px 6px rgba(0,0,0,0.1)"
     }}>
      <h3>Donation Status</h3>
      <Doughnut data={doughnutChartData} options={{responsive: true}}/>
     </div>
    </div>

    <div style={{
     background:"white",
     padding:"20px",
     borderRadius:"10px",
     boxShadow:"0px 2px 6px rgba(0,0,0,0.1)"
    }}>
     <h3 style={{marginBottom:"15px"}}>Donation Requests</h3>
     <p style={{color:"#666",marginBottom:"20px"}}>Accept or reject food donations from donors.</p>
     
     <div style={{
      display:"grid",
      gridTemplateColumns:"1fr",
      gap:"10px"
     }}>
      {[1,2,3].map(i => (
       <div key={i} style={{
        background:"#f9f9f9",
        padding:"15px",
        borderRadius:"5px",
        borderLeft:"4px solid #2196F3"
       }}>
        <p><strong>Donor {i}</strong> - {i*5} kg food donated</p>
        <button style={{
         padding:"5px 15px",
         background:"#4CAF50",
         color:"white",
         border:"none",
         borderRadius:"3px",
         cursor:"pointer",
         marginRight:"10px"
        }}>Accept</button>
        <button style={{
         padding:"5px 15px",
         background:"#F44336",
         color:"white",
         border:"none",
         borderRadius:"3px",
         cursor:"pointer"
        }}>Reject</button>
       </div>
      ))}
     </div>
    </div>

    <div style={{
     background:"white",
     padding:"20px",
     borderRadius:"10px",
     boxShadow:"0px 2px 6px rgba(0,0,0,0.1)",
     marginTop:"30px"
    }}>
     <h3 style={{marginBottom:"15px"}}>AI Verification</h3>
     <p style={{color:"#666"}}>NGO verified via Darpan API + ML risk scoring. Status: <strong style={{color:"#4CAF50"}}>Verified</strong></p>
    </div>
   </div>
  </div>
 )
}