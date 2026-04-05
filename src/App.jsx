import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import DonorDashboard from "./pages/DonorDashboard"
import NgoDashboard from "./pages/NgoDashboard"
import AdminDashboard from "./pages/AdminDashboard"

import ProtectedRoute from "./components/ProtectedRoute"

export default function App(){

 return(

  <Routes>
      <Route path="/" element={<Home/>}/>


   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>

   <Route
    path="/donor"
    element={
     <ProtectedRoute role="donor">
      <DonorDashboard/>
     </ProtectedRoute>
    }
   />

   <Route
    path="/ngo"
    element={
     <ProtectedRoute role="ngo">
      <NgoDashboard/>
     </ProtectedRoute>
    }
   />

   <Route
    path="/admin"
    element={
     <ProtectedRoute role="admin">
      <AdminDashboard/>
     </ProtectedRoute>
    }
   />

  </Routes>

 )
}