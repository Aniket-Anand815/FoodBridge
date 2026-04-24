import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import DonorOverview from "./pages/donor/DonorOverview"
import DonorDonate from "./pages/donor/DonorDonate"
import DonorBioplant from "./pages/donor/DonorBioplant"
import DonorCheckNgo from "./pages/donor/DonorCheckNgo"
import DonorAbout from "./pages/donor/DonorAbout"

import NgoOverview from "./pages/ngo/NgoOverview"
import NgoRequests from "./pages/ngo/NgoRequests"
import NgoBiogas from "./pages/ngo/NgoBiogas"
import NgoAbout from "./pages/ngo/NgoAbout"

import AdminDashboard from "./pages/AdminDashboard"
import SelectNgo from "./pages/SelectNgo"
import WaitingPage from "./pages/WaitingPage"
import ChatBot from "./components/ChatBot"

import ProtectedRoute from "./components/ProtectedRoute"

export default function App(){

 return(

  <>
   <Routes>
       <Route path="/" element={<Home/>}/>


    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>

    {/* Donor Routes */}
    <Route path="/donor" element={<ProtectedRoute role="donor"><DonorOverview/></ProtectedRoute>}/>
    <Route path="/donor/donate" element={<ProtectedRoute role="donor"><DonorDonate/></ProtectedRoute>}/>
    <Route path="/donor/bioplant" element={<ProtectedRoute role="donor"><DonorBioplant/></ProtectedRoute>}/>
    <Route path="/donor/check-ngo" element={<ProtectedRoute role="donor"><DonorCheckNgo/></ProtectedRoute>}/>
    <Route path="/donor/about" element={<ProtectedRoute role="donor"><DonorAbout/></ProtectedRoute>}/>

    {/* NGO Routes */}
    <Route path="/ngo" element={<ProtectedRoute role="ngo"><NgoOverview/></ProtectedRoute>}/>
    <Route path="/ngo/requests" element={<ProtectedRoute role="ngo"><NgoRequests/></ProtectedRoute>}/>
    <Route path="/ngo/biogas" element={<ProtectedRoute role="ngo"><NgoBiogas/></ProtectedRoute>}/>
    <Route path="/ngo/about" element={<ProtectedRoute role="ngo"><NgoAbout/></ProtectedRoute>}/>

    <Route
     path="/admin"
     element={
      <ProtectedRoute role="admin">
       <AdminDashboard/>
      </ProtectedRoute>
     }
    />

    <Route
     path="/select-ngo"
     element={
      <ProtectedRoute role="donor">
       <SelectNgo/>
      </ProtectedRoute>
     }
    />

    <Route
     path="/waiting"
     element={
      <ProtectedRoute role="donor">
       <WaitingPage/>
      </ProtectedRoute>
     }
    />

   </Routes>

   <ChatBot />
  </>

 )
}