import { MapContainer, TileLayer, Marker } from "react-leaflet"

export default function MapTracking(){

 return(

  <MapContainer center={[13.0827,80.2707]} zoom={13} style={{height:"400px"}}>

   <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />

   <Marker position={[13.0827,80.2707]} />

  </MapContainer>

 )
}