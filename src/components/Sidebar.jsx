import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo.png"
import {useState} from "react"

export default function Sidebar(){

 const navigate = useNavigate()
 const [selectedOption, setSelectedOption] = useState("")

 const handleOptionChange = (e) => {
  const option = e.target.value
  setSelectedOption(option)
  if(option === "history") console.log("History clicked")
  else if(option === "rewards") console.log("Rewards clicked")
  else if(option === "ngo") console.log("Nearby NGO clicked")
  else if(option === "help") console.log("Help clicked")
  setSelectedOption("")
 }

 return(

  <div style={{
   width:"240px",
   height:"100vh",
   background:"#1f2937",
   color:"white",
   padding:"20px",
   position:"fixed"
  }}>

   <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
    <img src={logo} alt="MajorProj logo" style={{width:"64px",height:"auto"}}/>
    <h2 style={{margin:0,fontSize:"16px"}}>MajorProj</h2>
   </div>

   <br/>

   <label style={{fontSize:"12px", color:"#d1d5db", marginBottom:"8px", display:"block"}}>
    Menu
   </label>
   <select 
    value={selectedOption}
    onChange={handleOptionChange}
    style={{
     width:"100%",
     padding:"10px",
     borderRadius:"4px",
     border:"none",
     backgroundColor:"#374151",
     color:"white",
     fontSize:"14px",
     cursor:"pointer"
    }}
   >
    <option value="">Menu</option>
    <option value="history">📊 History</option>
    <option value="rewards">🎁 Rewards</option>
    <option value="ngo">🏢 Nearby NGO</option>
    <option value="help">❓ Help</option>
   </select>

  </div>

 )
}