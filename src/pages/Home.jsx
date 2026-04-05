import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Home(){

 const navigate = useNavigate()

 return(

  <div style={{fontFamily:"Arial"}}>

   {/* NAVBAR */}

   <div style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"20px 60px",
    background:"white",
    boxShadow:"0px 2px 8px rgba(0,0,0,0.1)"
   }}>

    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

     <img src={logo} alt="FoodBridge logo" style={{width:"60px", height:"auto"}}/>

     <h2>FoodBridge </h2>

    </div>

    <div style={{display:"flex",gap:"15px"}}>

     <button
      onClick={()=>navigate("/login")}
      style={{
       padding:"10px 20px",
       border:"none",
       background:"#2563eb",
       color:"white",
       borderRadius:"5px",
       cursor:"pointer"
      }}
     >
      Login
     </button>

     <button
      onClick={()=>navigate("/register")}
      style={{
       padding:"10px 20px",
       border:"2px solid #2563eb",
       background:"white",
       color:"#2563eb",
       borderRadius:"5px",
       cursor:"pointer"
      }}
     >
      Register
     </button>

    </div>

   </div>


   {/* HERO SECTION */}

   <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    height:"80vh",
    background:"#f5f7fa",
    textAlign:"center"
   }}>

    <img src={logo} alt="FoodBridge logo" style={{width:"300px",marginBottom:"20px", height:"auto"}}/>

    <h1 style={{fontSize:"48px"}}>
     FoodBridge
    </h1>

    <p style={{
     fontSize:"18px",
     color:"#555",
     maxWidth:"600px"
    }}>
     Connecting surplus food from restaurants and hotels to NGOs
     and people in need through intelligent logistics and AI.
    </p>

    <div style={{marginTop:"30px",display:"flex",gap:"20px"}}>

     <button
      onClick={()=>navigate("/register")}
      style={{
       padding:"14px 30px",
       fontSize:"16px",
       background:"#2563eb",
       color:"white",
       border:"none",
       borderRadius:"6px",
       cursor:"pointer"
      }}
     >
      Get Started
     </button>

     <button
      onClick={()=>navigate("/login")}
      style={{
       padding:"14px 30px",
       fontSize:"16px",
       border:"2px solid #2563eb",
       background:"white",
       color:"#2563eb",
       borderRadius:"6px",
       cursor:"pointer"
      }}
     >
      Login
     </button>

    </div>

   </div>


   {/* FEATURES SECTION */}

   <div style={{
    padding:"60px",
    background:"white",
    textAlign:"center"
   }}>

    <h2>How FoodBridge Works</h2>

    <div style={{
     display:"flex",
     justifyContent:"center",
     gap:"40px",
     marginTop:"40px"
    }}>

     <div style={{width:"250px"}}>

      <h3>Donate Food</h3>

      <p>
       Restaurants and hotels donate surplus food easily through the platform.
      </p>

     </div>

     <div style={{width:"250px"}}>

      <h3>NGO Pickup</h3>

      <p>
       NGOs receive pickup requests and collect food efficiently.
      </p>

     </div>

     <div style={{width:"250px"}}>

      <h3>AI Monitoring</h3>

      <p>
       AI verifies NGOs and predicts delivery ETA to ensure transparency.
      </p>

     </div>

    </div>

   </div>


   {/* FOOTER */}

   <div style={{
    background:"#1f2937",
    color:"white",
    padding:"20px",
    textAlign:"center"
   }}>

    © 2026 FoodBridge • Smart Food Redistribution Platform

   </div>

  </div>

 )
}