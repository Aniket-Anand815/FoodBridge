import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapView(){

 const donor=[13.0827,80.2707]
 const ngo=[13.0674,80.2376]

 return(

  <MapContainer center={donor} zoom={13} style={{height:"300px"}}>

   <TileLayer
   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />

   <Marker position={donor}/>

   <Marker position={ngo}/>

  </MapContainer>

 )
}