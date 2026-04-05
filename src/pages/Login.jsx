import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {loginUser} from "../api/api"

export default function Login(){

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")
 const navigate = useNavigate()

 const login = async()=>{

  const res = await loginUser(username,password)

  if(res.role){

   localStorage.setItem("role",res.role)

   if(res.role==="admin") navigate("/admin")
   if(res.role==="ngo") navigate("/ngo")
   if(res.role==="donor") navigate("/donor")

  }else{
   alert("Login failed")
  }
 }

 return(

  <div style={{textAlign:"center",marginTop:"120px"}}>

   <h1>Login</h1>

   <input
    placeholder="Username"
    onChange={e=>setUsername(e.target.value)}
   />

   <br/><br/>

   <input
    type="password"
    placeholder="Password"
    onChange={e=>setPassword(e.target.value)}
   />

   <br/><br/>

   <button onClick={login}>Login</button>

   <br/><br/>

   <button onClick={()=>navigate("/register")}>
    Register Here
   </button>

  </div>
 )
}