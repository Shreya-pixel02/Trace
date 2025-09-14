const busStops = [
  { name: "Village Center", lat: 28.7041, lng: 77.1025 },
  { name: "Main Market", lat: 28.5355, lng: 77.3910 },
  { name: "Bus Depot", lat: 28.4595, lng: 77.0266 },
];
<select onChange={(e) => setSelectedStop(e.target.value)}>
  {busStops.map((stop, i) => (
    <option key={i} value={stop.name}>{stop.name}</option>
  ))}
</select>
const stop = busStops.find(s => s.name === selectedStop);
function calculateETA(busLat, busLng, stopLat, stopLng, speedKmph = 35) {
  const R = 6371; // Earth radius (km)
  const dLat = (stopLat - busLat) * Math.PI / 180;
  const dLng = (stopLng - busLng) * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(busLat * Math.PI/180) * Math.cos(stopLat * Math.PI/180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // in km

  const etaMins = (distance / speedKmph) * 60;
  return etaMins.toFixed(1) + " mins";
}
