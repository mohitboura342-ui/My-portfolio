import { useState, useRef, useEffect } from 'react';
import { FadeIn3D } from './FadeIn3D';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const myLocations = [
  { coord: [29.3948, 79.1256], name: "UBSE, Ramnagar", desc: "Intermediate Schooling - Uttarakhand Board of School Education" },
  { coord: [30.3165, 78.0322], name: "Uttarakhand Open Univ. (Dehradun)", desc: "BCom, Analytics & Tech (2025 - 2028)" },
  { coord: [29.2183, 79.5130], name: "vijAI Robotics Pvt Ltd (Haldwani)", desc: "Data Science Intern (Sep 2025 - Present)" }
];

function MapController() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    // Center the map covering all points
    const bounds = L.latLngBounds(myLocations.map(l => l.coord as [number, number]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map]);
  return null;
}

export function MapSection() {
  const [isOpen, setIsOpen] = useState(false);

  const playPageFlipSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio play failed");
    }
  };

  const polylineCoords = myLocations.map(l => l.coord as [number, number]);

  return (
    <section id="map" className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16 scroll-mt-20">
      <FadeIn3D>
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-sm font-mono text-indigo-400 tracking-[0.3em] uppercase mb-3">Coordinates</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white text-center">Education & Experience Locations</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mt-4 rounded-full"></div>
        </div>
      </FadeIn3D>

      <FadeIn3D direction="up">
        <div className="relative group perspective-1000">
          {!isOpen ? (
            <div 
              onClick={() => {
                playPageFlipSound();
                setIsOpen(true);
              }}
              className="glass-card h-[400px] w-full rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group-hover:shadow-[0_0_40px_rgba(79,70,229,0.3)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
               <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <span className="text-4xl block">🗺️</span>
               </div>
               <h4 className="text-2xl font-bold text-white mb-2">Explore the Map</h4>
               <p className="text-gray-400">Click to open the interactive journey</p>
            </div>
          ) : (
            <div className="glass-card p-2 rounded-3xl animate-in fade-in zoom-in duration-500">
              <div className="relative h-[500px] w-full rounded-[20px] overflow-hidden">
                 <MapContainer 
                    center={[22.3511148, 78.6677428]} 
                    zoom={5} 
                    scrollWheelZoom={false} 
                    style={{ height: '100%', width: '100%' }}
                 >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController />
                    <Polyline positions={polylineCoords} color="#ef4444" weight={4} opacity={0.8} dashArray="10, 10" />
                    
                    {myLocations.map((loc, idx) => (
                      <Marker key={idx} position={loc.coord as [number, number]}>
                        <Popup>
                          <div className="p-2">
                             <h4 className="font-bold text-gray-900 text-lg m-0 mb-1">{loc.name}</h4>
                             <p className="text-gray-700 m-0 text-sm">{loc.desc}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                 </MapContainer>
                 <button 
                   onClick={() => {
                     playPageFlipSound();
                     setIsOpen(false);
                   }}
                   className="absolute top-4 right-4 z-[1000] bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 p-2 rounded-xl transition-all"
                 >
                   ✕ Close
                 </button>
              </div>
            </div>
          )}
        </div>
      </FadeIn3D>
    </section>
  );
}
