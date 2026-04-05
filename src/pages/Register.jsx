import {useState} from "react"
import {registerUser} from "../api/api"

export default function Register(){

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")
 const [role,setRole] = useState("donor")

 const register = async()=>{

  const res = await registerUser(username,password,role)

  alert(res.message)

 }

 return(

  <div style={{textAlign:"center",marginTop:"120px"}}>

   <h1>Register</h1>

   <input placeholder="Username"
    onChange={e=>setUsername(e.target.value)}
   />

   <br/><br/>

   <input
    type="password"
    placeholder="Password"
    onChange={e=>setPassword(e.target.value)}
   />

   <br/><br/>

   <select onChange={e=>setRole(e.target.value)}>

    <option value="donor">Donor</option>
    <option value="ngo">NGO</option>

   </select>

   <br/><br/>

   <button onClick={register}>
    Register
   </button>

  </div>
 )
}