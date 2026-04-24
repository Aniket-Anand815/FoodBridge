// Dynamically resolve API base URL for localhost and GitHub Codespaces
function getApiBase() {
 const { hostname, protocol } = window.location;
 // GitHub Codespaces: hostname looks like "<name>-5173.app.github.dev"
 if (hostname.includes("app.github.dev")) {
  // Replace the frontend port (5173) with the backend port (8000)
  const backendHost = hostname.replace("-5173.", "-8000.");
  return `${protocol}//${backendHost}`;
 }
 // Local development
 return "http://127.0.0.1:8000";
}

const API = getApiBase();

export async function loginUser(username,password){

 const res = await fetch(`${API}/auth/login`,{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({username,password})

 })

 return res.json()
}

export async function createDonation(data){

 const res=await fetch(`${API}/donor/donate`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
 })

 return res.json()
}

export async function getDonorDashboard(){

 const res=await fetch(`${API}/donor/donations`)
 return res.json()
}

export async function getNgoDashboard(){

 const res=await fetch(`${API}/ngo/dashboard`)
 return res.json()
}

export async function acceptDonation(id){

 const res=await fetch(`${API}/ngo/accept/${id}`,{
  method:"POST"
 })

 return res.json()
}

export async function getAdminAnalytics(){

 const res=await fetch(`${API}/admin/analytics`)
 return res.json()
}

export async function verifyNgo(darpan){

 const res=await fetch(`${API}/verification/ngo`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({darpan_id:darpan})
 })

 return res.json()
}

export async function predictEta(distance){

 const res=await fetch(`${API}/eta/predict`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({distance})
 })

 return res.json()
}

export async function registerUser(username,password,role){

 const res = await fetch(`${API}/auth/register`,{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({username,password,role})

 })

 return res.json()
}

export async function getOrganizations(){
 const res = await fetch(`${API}/organizations/all`)
 return res.json()
}

export async function getNearbyOrganizations(lat, lng){
 const res = await fetch(`${API}/organizations/nearby?lat=${lat}&lng=${lng}`)
 return res.json()
}

export async function sendChatMessage(message, location = null){

 const res = await fetch(`${API}/chatbot/ask`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({message, location})
 })

 return res.json()
}