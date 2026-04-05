import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapTracking() {

  const ngoLocation = [13.0827,80.2707]   // Chennai example
  const donorLocation = [13.0674,80.2376]

  return(

    <div style={{height:"500px"}}>

      <h2>Donation Pickup Tracking</h2>

      <MapContainer center={ngoLocation} zoom={13} style={{height:"400px"}}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={ngoLocation}>
          <Popup>NGO Vehicle</Popup>
        </Marker>

        <Marker position={donorLocation}>
          <Popup>Donor Location</Popup>
        </Marker>

      </MapContainer>

    </div>
  )
}