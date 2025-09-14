import { useState } from "react";

const busStops = [
  { name: "Village Center", lat: 28.7041, lng: 77.1025 },
  { name: "Main Market", lat: 28.5355, lng: 77.3910 },
  { name: "Bus Depot", lat: 28.4595, lng: 77.0266 },
];

export default function ETAFeature() {
  const [selectedStop, setSelectedStop] = useState("");
  const [eta, setEta] = useState("");

  // Example: bus location from QR scan
  const busLat = 28.60;  
  const busLng = 77.20;  

  function handleCheckETA() {
    const stop = busStops.find(s => s.name === selectedStop);
    if (stop) {
      const result = calculateETA(busLat, busLng, stop.lat, stop.lng, 40); // speed = 40 km/h
      setEta(result);
    }
  }

  return (
    <div>
      <h2>Check Bus ETA</h2>
      <select onChange={(e) => setSelectedStop(e.target.value)}>
        <option value="">Select Stop</option>
        {busStops.map((stop, i) => (
          <option key={i} value={stop.name}>{stop.name}</option>
        ))}
      </select>
      <button onClick={handleCheckETA}>Get ETA</button>

      {eta && <p>Estimated Arrival: {eta}</p>}
    </div>
  );
}

// Distance formula
function calculateETA(busLat, busLng, stopLat, stopLng, speedKmph = 35) {
  const R = 6371;
  const dLat = (stopLat - busLat) * Math.PI / 180;
  const dLng = (stopLng - busLng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(busLat * Math.PI/180) * Math.cos(stopLat * Math.PI/180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  const etaMins = (distance / speedKmph) * 60;
  return etaMins.toFixed(1) + " mins";
}
