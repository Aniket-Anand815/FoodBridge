const API="http://127.0.0.1:8001"

export async function loginUser(username,password){

 const res = await fetch("http://127.0.0.1:8001/auth/login",{

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

 const res = await fetch("http://127.0.0.1:8001/auth/register",{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({username,password,role})

 })

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