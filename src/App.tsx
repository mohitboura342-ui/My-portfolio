import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, GraduationCap, Briefcase, ExternalLink, Code2, Server, BarChart2, CheckCircle2, BookOpen, Gamepad2, Tv, Cpu, Quote } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import profileAvatar from './assets/images/ghibli_professional_avatar_1780938600440.png';
import L from 'leaflet';
import { jsPDF } from 'jspdf';

// Custom brutalist marker
const brutalistIcon = new L.DivIcon({
  className: 'bg-transparent border-0',
  html: `
    <div class="relative flex items-center justify-center w-12 h-12 group">
      <div class="absolute w-8 h-8 bg-[#ff6b9d] border-[3px] border-black rounded-full shadow-[4px_4px_0_0_#000] animate-bounce z-10 group-hover:bg-[#ffd93d] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
        <div class="w-3 h-3 bg-white border-[2px] border-black rounded-full"></div>
      </div>
      <div class="absolute bottom-[2px] w-6 h-2 bg-black opacity-40 rounded-[50%] blur-[2px]"></div>
      <div class="absolute -top-6 bg-white border-[2px] border-black px-2 py-0.5 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-[2px_2px_0_0_#000]">View</div>
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 40],
  popupAnchor: [0, -40]
});

const ROLES = [
  "Data Analyst",
  "AI Data Scientist",
  "SQL Developer",
  "Python Developer",
  "Machine Learning Expert"
];

const EXPERIENCES = [
  {
    type: "experience",
    title: "Data Science Intern",
    company: "vijAI Robotics Pvt Ltd",
    date: "Sep 2025 - Present",
    desc: "Hands-on experience in data analysis, machine learning, and statistical modeling. Executed data cleaning, EDA, feature engineering, and model building using Python (pandas, NumPy, scikit-learn, matplotlib).",
    location: [29.2193, 79.5126] as [number, number],
    locName: "Haldwani, Uttarakhand",
    color: "bg-[#66d9ef]"
  },
  {
    type: "education",
    title: "BCom, Analytics & Tech",
    company: "Uttarakhand Open Univ.",
    date: "Jul 2025 - Jul 2028",
    desc: "Focusing on analytics, technology, and commerce fundamentals.",
    location: [30.3165, 78.0322] as [number, number],
    locName: "Dehradun, Uttarakhand",
    color: "bg-[#ff6b9d]"
  },
  {
    type: "education",
    title: "High School / Intermediate",
    company: "UBSE",
    date: "Completed",
    desc: "Foundational education and coursework.",
    location: [29.3948, 79.1278] as [number, number],
    locName: "Ramnagar, Uttarakhand",
    color: "bg-[#a8e6cf]"
  }
];

const playWelcomeSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        const playNote = (freq: number, startTime: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
            
            gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
            gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.start(ctx.currentTime + startTime);
            osc.stop(ctx.currentTime + startTime + duration);
        };

        playNote(440, 0.0, 0.3); // A4
        playNote(554.37, 0.1, 0.3); // C#5
        playNote(659.25, 0.2, 0.5); // E5
        playNote(880, 0.3, 0.6); // A5
    } catch (e) {
        console.error("Audio play failed", e);
    }
};

const playPopSound = (pitchMultiplier: number = 1) => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 * pitchMultiplier, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100 * pitchMultiplier, ctx.currentTime + 0.1);
        oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio play failed", e);
    }
};

const playPageFlipSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        const bufferSize = ctx.sampleRate * 0.15; // 0.15 seconds of noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1; // White noise
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 0.5;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.15);
    } catch (e) {
        console.error("Audio play failed", e);
    }
};

const handleDownloadCV = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Mohit Boura", 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("UI/UX Designer | Frontend Developer", 20, 30);
    doc.text("mohitboura342@gmail.com | linkedin.com/in/mohit-boura-558382379", 20, 37);

    // About
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("About Me", 20, 50);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const aboutText = "Passionate about data analytics, machine learning, and business intelligence. I thrive on uncovering hidden patterns in complex datasets and translating them into actionable business strategies.";
    doc.text(doc.splitTextToSize(aboutText, 170), 20, 60);

    // Skills
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Skills", 20, 85);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("- UI/UX Design (Figma, Tailwind CSS)", 20, 95);
    doc.text("- Frontend Development (React.js, TypeScript)", 20, 102);
    doc.text("- Data Analytics & Machine Learning (Python, SQL)", 20, 109);
    doc.text("- Version Control (Git) & Tools", 20, 116);

    // Experience
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Experience", 20, 135);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Systems Engineer @ Infosys (May 2024 - Present)", 20, 145);
    doc.text("Business Analyst @ Innostax (Sep 2023 - Jan 2024)", 20, 155);
    doc.text("Data Analyst Intern @ Oye Busy (Jul 2023 - Aug 2023)", 20, 165);

    doc.save("Mohit_Boura_CV.pdf");
};

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [showAiTools, setShowAiTools] = useState(false);
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    let hasInteracted = false;
    const handleFirstInteraction = () => {
      if (hasInteracted) return;
      hasInteracted = true;
      playWelcomeSound();
      
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans text-black selection:bg-[#ff6b9d] selection:text-white">
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }} exit={{ opacity: 0, visibility: "hidden" }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#ffd93d] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="flex gap-6 items-center z-10 relative">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 10, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black bg-[#66d9ef] border-[6px] border-black shadow-[12px_12px_0_#000] w-28 h-28 md:w-36 md:h-36 flex items-center justify-center -rotate-[10deg]"
              >M</motion.div>
              <motion.div 
                initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 10, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black bg-[#ff6b9d] border-[6px] border-black shadow-[12px_12px_0_#000] w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rotate-[10deg]"
              >B</motion.div>
            </div>
            
            {/* Background decorative shapes */}
            <motion.div animate={{ rotate: 360, y: [-20, 20, -20] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] w-24 h-24 bg-[#a8e6cf] border-[4px] border-black" />
            <motion.div animate={{ rotate: -360, x: [-20, 20, -20] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] right-[15%] w-20 h-20 bg-white border-[4px] border-black rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="brutal-wrapper w-full max-w-[1400px] mx-auto border-[4px] md:border-[6px] border-black shadow-[6px_6px_0_0_#000] md:shadow-[12px_12px_0_0_#000] relative overflow-hidden flex flex-col">
        
        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-[#ffd93d] border-b-[4px] md:border-[4px] md:border-black md:shadow-[8px_8px_0_#000] flex flex-col lg:flex-row justify-between items-center px-4 py-3 md:mx-6 md:mt-6 mb-10 md:mb-20 transition-transform gap-4 lg:gap-0">
          <div className="flex justify-between w-full lg:w-auto items-center">
             <a href="#" className="text-2xl font-black bg-[#66d9ef] border-[3px] border-black shadow-[3px_3px_0_0_#000] px-3 py-1 -rotate-2 hover:rotate-0 hover:translate-y-1 transition-all shrink-0">MB.</a>
             <a href="#contact" className="lg:hidden bg-[#66d9ef] border-[3px] border-black shadow-[4px_4px_0_0_#000] px-4 py-1.5 font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs uppercase tracking-wide">
                Contact Info
             </a>
          </div>
          
          <div className="flex overflow-x-auto w-full lg:w-auto gap-4 lg:gap-8 font-bold text-sm lg:text-lg items-center pb-2 lg:pb-0 scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <a href="#about" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">About</a>
            <a href="#experience" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">Journey</a>
            <a href="#skills" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">Skills</a>
            <a href="#aitools" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">AI Tools</a>
            <a href="#projects" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">Projects</a>
            <a href="#blogs" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">Blogs</a>
            <a href="#hobbies" className="hover:-translate-y-1 hover:rotate-[-2deg] transition-transform whitespace-nowrap">Hobbies</a>
          </div>
          
          <a href="#contact" className="hidden lg:inline-flex bg-[#66d9ef] border-[3px] border-black shadow-[4px_4px_0_0_#000] px-5 py-2 font-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all items-center gap-2 text-sm uppercase tracking-wide">
            Get in Touch!
          </a>
        </nav>

        <main className="px-6 md:px-12 lg:px-20 space-y-24 md:space-y-40 mb-20 relative">
          
          {/* Hero Section */}
          <section id="hero" className="flex flex-col lg:flex-row gap-16 md:gap-8 items-center min-h-[70vh]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }} className="flex-1 space-y-8 relative z-10 w-full mb-10 lg:mb-0">
              <div className="inline-block bg-[#ff6b9d] text-white px-4 py-1.5 font-bold border-[3px] border-black rotate-[-3deg] shadow-[4px_4px_0_0_#000] text-xl">
                Hi there! 👋
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.1]">
                I'm Mohit <br/>
                <span className="text-transparent" style={{ WebkitTextStroke: "2px black", WebkitTextFillColor: "transparent" }}>Boura.</span>
              </h1>
              
              <div className="text-xl md:text-2xl font-bold max-w-2xl border-l-[6px] border-black pl-5 space-y-2 leading-relaxed h-[80px] sm:h-auto">
                 <span>I am a BCom student and</span> <br className="hidden sm:block" />
                 <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block bg-[#ffd93d] border-[2px] border-black shadow-[3px_3px_0_0_#000] px-2 whitespace-nowrap mt-2"
                    >
                      {ROLES[roleIndex]}
                    </motion.span>
                 </AnimatePresence>
              </div>
              
              <p className="text-lg md:text-xl font-medium max-w-2xl border-[3px] border-black border-dashed p-4 shadow-[4px_4px_0_0_#000] bg-white mt-10 lg:mt-6">
                Passionate about data analytics, machine learning, and business intelligence. I thrive on uncovering hidden patterns in complex datasets and translating them into actionable business strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 items-start sm:items-center relative">
                 <div className="absolute -top-16 left-48 hidden xl:flex flex-col items-center z-10 w-32">
                    <span className="font-['Caveat'] text-2xl font-bold opacity-80 -rotate-6 whitespace-nowrap">Say hello</span>
                 </div>
                 
                 <a href="#contact" className="bg-[#66d9ef] border-[3px] border-black shadow-[5px_5px_0_0_#000] px-8 py-3 font-bold text-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-tight text-center block w-full sm:w-auto">
                   Contact Me
                 </a>
                 <button onClick={handleDownloadCV} className="bg-[#ffd93d] border-[3px] border-black shadow-[5px_5px_0_0_#000] px-8 py-3 font-bold text-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-tight cursor-pointer text-center block w-full sm:w-auto">
                   Download CV
                 </button>
                 <div className="flex gap-4">
                   <SocialButton icon={<Github />} href="https://github.com/mohitboura342-ui" color="bg-white" />
                   <SocialButton icon={<Linkedin />} href="https://linkedin.com/in/mohit-boura-558382379" color="bg-[#0077b5] text-white" />
                 </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className="w-full lg:w-[450px] relative flex justify-center items-center mt-12 lg:mt-0">
              <div className="tape-sticker w-[120px] h-10 -top-4 right-10 md:right-16 rotate-[12deg] z-20"></div>
              
              {/* Image Block */}
              <div className="relative group perspective-1000 z-10 w-full flex justify-center cursor-pointer" onClick={() => {
                  playPopSound(1 + (clickCount % 6) * 0.1);
                  setClickCount((prev) => prev < 5 ? prev + 1 : 0);
              }}>
                 <div className="border-[5px] border-black bg-[#a8e6cf] shadow-[12px_12px_0_0_#000] w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rotate-[3deg] group-hover:rotate-0 transition-all duration-300 ease-in-out relative overflow-hidden p-2 flex items-center justify-center">
                    <img 
                      src={profileAvatar} 
                      alt="Mohit Boura Profile" 
                      className="w-[90%] h-[90%] object-cover border-[4px] border-black drop-shadow-[5px_5px_0_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-300"
                    />
                 </div>
                 
                 {clickCount === 0 && (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-2 py-1 font-black border-[3px] border-white shadow-[4px_4px_0_0_#fff] rotate-[-5deg] text-sm opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                         Click Me! 💥
                     </div>
                 )}

                 <AnimatePresence>
                     {clickCount >= 1 && (
                            <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               transition={{ type: "spring", stiffness: 260, damping: 15 }}
                               className="absolute -top-6 -left-6 sm:-left-12 bg-[#ff6b9d] text-white px-4 py-2 font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[-12deg] text-sm sm:text-lg z-20 whitespace-nowrap"
                            >
                               Python Developer
                            </motion.div>
                     )}
                     {clickCount >= 2 && (
                            <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               transition={{ type: "spring", stiffness: 260, damping: 15 }}
                               className="absolute -top-10 -right-6 sm:-right-8 bg-[#ffd93d] text-black px-4 py-2 font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[8deg] text-sm sm:text-lg z-20 whitespace-nowrap"
                            >
                               Data Scientist
                            </motion.div>
                     )}
                     {clickCount >= 3 && (
                            <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               transition={{ type: "spring", stiffness: 260, damping: 15 }}
                               className="absolute bottom-16 -left-8 sm:-left-16 bg-[#66d9ef] text-black px-4 py-2 font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[15deg] text-sm sm:text-lg z-20 whitespace-nowrap"
                            >
                               SQL Developer
                            </motion.div>
                     )}
                     {clickCount >= 4 && (
                            <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               transition={{ type: "spring", stiffness: 260, damping: 15 }}
                               className="absolute -bottom-6 -right-6 sm:-right-10 bg-[#a8e6cf] text-black px-4 py-2 font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[-5deg] text-sm sm:text-lg z-20 whitespace-nowrap"
                            >
                               Data Analyst
                            </motion.div>
                     )}
                     {clickCount >= 5 && (
                            <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               transition={{ type: "spring", stiffness: 260, damping: 15 }}
                               className="absolute top-1/2 -right-12 sm:-right-20 -translate-y-1/2 bg-white text-black px-4 py-2 font-black border-[3px] border-black shadow-[4px_4px_0_0_#000] rotate-[5deg] text-sm sm:text-lg z-20 whitespace-nowrap"
                            >
                               Website Developer
                            </motion.div>
                     )}
                 </AnimatePresence>
              </div>

              {/* Dekos */}
              <div className="absolute top-[10%] -left-8 w-20 h-20 bg-[#ffd93d] border-[4px] border-black shadow-[6px_6px_0_0_#000] rotate-[-15deg] hidden lg:block"></div>
              <div className="absolute bottom-[5%] -left-[5%] w-24 h-8 bg-black rotate-[20deg] hidden lg:block"></div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="relative">
             <SectionTitle text="ABOUT ME" bg="bg-[#a8e6cf]" rotate="rotate-[-2deg]" />
             
             <div className="bg-white border-[5px] border-black shadow-[10px_10px_0_0_#000] p-6 md:p-12 text-lg md:text-xl font-medium leading-relaxed hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[14px_14px_0_0_#000] transition-all relative">
               <div className="tape-sticker w-[100px] h-8 -top-4 right-1/2 translate-x-1/2 rotate-[-3deg] z-20"></div>
               <p className="mb-6 mt-2">
                 I am a BCom student and aspiring <span className="bg-[#ffd93d] px-2 py-0.5 border-2 border-black font-bold shadow-[2px_2px_0_0_#000]">Data Scientist</span> passionate about data analytics, machine learning, and business intelligence. 
               </p>
               <p>
                 Skilled in <strong className="bg-[#66d9ef] border-b-[3px] border-black">Python, SQL, Power BI, statistics,</strong> and exploratory data analysis. My background bridges the gap between technical data science and strategic business management, allowing me to build models that not only predict accurately but also drive real business value.
               </p>
             </div>
          </section>

          {/* Experience & Education */}
          <section id="experience" className="relative space-y-16">
             <SectionTitle text="JOURNEY" bg="bg-[#ffd93d]" rotate="rotate-[2deg]" align="center" />
             
             <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Timeline List */}
                <div className="lg:col-span-2 h-[600px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                  <div className="sticky top-0 bg-[#d0d0d0] z-20 pb-4 pt-2 mb-8 hidden">
                    <h3 className="text-3xl font-black flex items-center justify-between border-b-[4px] border-black pb-2 border-dashed">
                      <span className="flex items-center gap-3"><Briefcase /> My Journey</span>
                    </h3>
                  </div>
                  
                  <div className="space-y-8 pl-2 pb-8 mt-4">
                    {EXPERIENCES.map((exp, idx) => (
                      <JourneyCard 
                         key={idx}
                         title={exp.title}
                         company={exp.company}
                         date={exp.date}
                         color={exp.color}
                         desc={exp.desc}
                         type={exp.type}
                         location={exp.location}
                         locName={exp.locName}
                         isActive={activeExpIndex === idx}
                         onClick={() => setActiveExpIndex(idx)}
                      />
                    ))}
                  </div>
                </div>

                {/* Map Section */}
                <div className="lg:col-span-3 pb-8 lg:pb-0" style={{ perspective: '1500px' }}>
                  <div className="relative h-[400px] lg:h-[600px] z-10 w-full" style={{ transformStyle: 'preserve-3d' }}>
                    
                    {/* Book Cover */}
                    <div 
                      className="absolute inset-0 border-[6px] border-black shadow-[12px_12px_0_0_#000] z-50 cursor-pointer flex flex-col justify-center items-center bg-gray-100"
                      style={{
                        transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s 0.2s',
                        transformOrigin: 'left center',
                        transform: isMapOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                        opacity: isMapOpen ? 0 : 1,
                        pointerEvents: isMapOpen ? 'none' : 'auto',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#a8e6cf',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'multiply'
                      }}
                      onClick={() => { playPageFlipSound(); setIsMapOpen(true); }}
                    >
                      {/* Spine */}
                      <div className="absolute left-0 top-0 bottom-0 w-12 border-r-[4px] border-black bg-black" style={{ backgroundImage: 'linear-gradient(90deg, #222 0%, #000 50%, #222 100%)' }}></div>
                      
                      {/* Label */}
                      <div className="relative z-10 bg-white border-[4px] border-black p-6 w-[80%] max-w-[320px] shadow-[8px_8px_0_0_#000] flex flex-col items-center rotate-[-2deg]">
                         <hr className="w-full border-t-[2px] border-black mb-2" />
                         <h2 className="text-3xl font-black text-center mb-1 uppercase tracking-widest text-black whitespace-nowrap">Composition</h2>
                         <h3 className="text-[10px] md:text-sm font-black text-center mb-4 uppercase tracking-[0.2em] text-gray-500">Notebook</h3>
                         
                         <div className="w-full border-t-[3px] border-black mb-4"></div>
                         
                         <h4 className="text-xl md:text-2xl font-black text-center uppercase mb-6 flex flex-col gap-1 items-center">
                            <span className="bg-[#ff6b9d] text-white px-3 py-1 shadow-[2px_2px_0_0_#000] border-2 border-black inline-block rotate-[2deg]">MAP OF</span>
                            <span className="bg-[#66d9ef] text-black px-3 py-1 shadow-[2px_2px_0_0_#000] border-2 border-black inline-block mt-2 rotate-[-1deg]">THE WORLD</span>
                         </h4>
                         
                         <p className="mt-2 font-bold text-center border-b-[3px] border-dashed border-gray-400 w-full pb-1 text-lg">Mohit Boura</p>
                         <p className="font-bold text-center border-b-[3px] border-dashed border-gray-400 w-full pb-1 mt-3">Interactive Journey</p>
                         <p className="font-bold text-center border-b-[3px] border-dashed border-gray-400 w-full pb-1 mt-3 text-transparent selection:text-transparent">.</p>
                         <hr className="w-full border-t-[2px] border-black mt-3" />
                      </div>

                      <div className="absolute bottom-6 right-6 bg-[#ffd93d] text-black border-[3px] border-black shadow-[4px_4px_0_0_#000] px-4 py-2 font-black rotate-[4deg] animate-pulse">
                         Click to Open 📖
                      </div>
                    </div>

                    {/* Inside Map */}
                    <div className="absolute inset-0 border-[6px] border-black shadow-[12px_12px_0_0_#000] bg-[#e0e0e0] overflow-hidden"
                         style={{
                           transition: 'opacity 0.5s',
                           opacity: isMapOpen ? 1 : 0.4
                         }}
                    >
                      <div 
                         className={`absolute top-4 right-4 bg-[#ff6b9d] text-white border-[3px] border-black shadow-[4px_4px_0_0_#000] px-4 py-2 font-black rotate-[6deg] z-[999] transition-all hover:scale-110 cursor-pointer ${isMapOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'} duration-500 delay-500`}
                         onClick={() => { playPageFlipSound(); setIsMapOpen(false); }}
                      >
                        Close Map ✖
                      </div>
                      
                      {/* Brutalist Grid Overlay */}
                      <div className="absolute inset-0 pointer-events-none z-[400] opacity-10" style={{ backgroundImage: "linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)", backgroundSize: "40px 40px" }}></div>
                      
                      <MapContainer center={EXPERIENCES[activeExpIndex].location} zoom={9} scrollWheelZoom={false} className="w-full h-full z-0 font-sans" zoomControl={false}>
                        <TileLayer
                          attribution='&copy; OpenStreetMap'
                          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                          className="map-blend"
                        />
                        
                        <Polyline 
                          positions={EXPERIENCES.map(e => e.location)} 
                          pathOptions={{ color: 'black', weight: 4, dashArray: '10, 10', opacity: 0.5 }} 
                        />
                        
                        {EXPERIENCES.map((exp, idx) => (
                          <Marker 
                            key={idx} 
                            position={exp.location} 
                            icon={brutalistIcon}
                            eventHandlers={{
                              click: () => setActiveExpIndex(idx)
                            }}
                          >
                            <Popup className="brutalist-popup">
                              <div className="font-bold text-lg border-b-[3px] border-black pb-1 mb-2">
                                <span className="inline-block px-1 bg-[#ffd93d] border-[2px] border-black text-[10px] uppercase mr-2 relative -top-[2px]">{exp.type}</span>
                                {exp.company}
                              </div>
                              <div className="text-sm font-semibold mb-1">{exp.title}</div>
                              <div className="text-xs font-bold opacity-80">{exp.locName}</div>
                            </Popup>
                          </Marker>
                        ))}
                        
                        <MapController center={EXPERIENCES[activeExpIndex].location} />
                      </MapContainer>
                    </div>
                  </div>
                </div>
             </div>
          </section>

          {/* Skills */}
          <section id="skills">
             <SectionTitle text="TECHNICAL SKILLS" bg="bg-[#ff6b9d]" rotate="rotate-[-1deg]" textClass="text-white" />
             
             <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 gap-y-12 mt-12">
                {[
                  { title: "Programming", icon: <Code2 size={40} />, bg: "bg-[#66d9ef]", skills: ["Python", "SQL", "Database Mgmt", "R"] },
                  { title: "Core Data", icon: <Server size={40} />, bg: "bg-[#ffd93d]", skills: ["Pandas", "NumPy", "Scikit", "EDA"] },
                  { title: "Visualization", icon: <BarChart2 size={40} />, bg: "bg-[#a8e6cf]", skills: ["Power BI", "Tableau", "Plotly"] },
                  { title: "Methodology", icon: <CheckCircle2 size={40} />, bg: "bg-white", skills: ["Machine Learning", "Statistics"] }
                ].map((s, i) => (
                  <div key={i} className={`border-[4px] border-black shadow-[8px_8px_0_0_#000] p-6 ${s.bg} hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all flex flex-col relative`}>
                     <div className="text-black mb-6 bg-white border-[3px] border-black w-20 h-20 flex items-center justify-center shadow-[4px_4px_0_0_#000] -rotate-6 transform hover:rotate-0 transition-transform">
                        {s.icon}
                     </div>
                     <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter leading-tight h-[40px]">{s.title}</h3>
                     <div className="flex flex-wrap gap-2 mt-auto">
                        {s.skills.map((skill, j) => (
                           <span key={j} className="bg-white border-[2px] border-black font-bold px-3 py-1 shadow-[2px_2px_0_0_#000] text-sm whitespace-nowrap">
                             {skill}
                           </span>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* AI Tools */}
          <section id="aitools" className="my-16">
             <SectionTitle text="AI ARSENAL" bg="bg-[#a8e6cf]" rotate="rotate-[2deg]" align="center" />
             
             <div className="flex flex-col items-center justify-center mt-16 md:mt-32 mb-16 md:mb-32 relative">
                
                <div className="w-full flex justify-center perspective-1000 z-20">
                    <div 
                      className={`border-[5px] border-black bg-[#ffd93d] shadow-[12px_12px_0_0_#000] w-[250px] h-[250px] md:w-[320px] md:h-[320px] transition-all duration-500 relative overflow-hidden flex items-center justify-center p-0 cursor-pointer ${showAiTools ? 'rotate-0 scale-90 shadow-[6px_6px_0_0_#000]' : 'rotate-[-3deg] jiggle-hover scale-100'}`} 
                      onClick={() => {
                        playPopSound(showAiTools ? 0.8 : 1.5);
                        setShowAiTools(!showAiTools);
                      }}
                    >
                       <p className="text-[120px] transition-transform group-hover:scale-110">🧠</p>
                       <div className="tape-sticker w-24 h-10 -bottom-4 right-4 rotate-[-12deg] z-20"></div>
                       <div className="tape-sticker w-24 h-10 -top-4 left-4 rotate-[8deg] z-20"></div>
                       {!showAiTools && (
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 font-black border-[3px] border-white shadow-[4px_4px_0_0_#fff] rotate-[5deg] text-lg lg:text-xl z-30 pointer-events-none whitespace-nowrap">
                              Click Here! 🔨
                           </div>
                       )}
                    </div>
                </div>

                <AnimatePresence>
                   {showAiTools && [
                      { name: "ChatGPT", icon: "🤖", color: "bg-[#a8e6cf]" },
                      { name: "GitHub Copilot", icon: "💻", color: "bg-white" },
                      { name: "Google Gemini", icon: "✨", color: "bg-[#66d9ef]" },
                      { name: "Anthropic Claude", icon: "🧠", color: "bg-[#ff6b9d]" },
                      { name: "Perplexity AI", icon: "🔍", color: "bg-[#ffd93d]" },
                      { name: "Midjourney", icon: "🎨", color: "bg-[#d4a5a5]" },
                      { name: "Cursor", icon: "⚡", color: "bg-gray-100" },
                      { name: "v0 / Bolt", icon: "🚀", color: "bg-[#a1c4fd]" }
                   ].map((tool, idx, arr) => {
                      const angle = (idx / arr.length) * Math.PI * 2;
                      const radiusX = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 300;
                      const radiusY = typeof window !== 'undefined' && window.innerWidth < 640 ? 160 : 250;
                      
                      const x = Math.cos(angle) * radiusX;
                      const y = Math.sin(angle) * radiusY;
                      const rot = (idx % 2 === 0 ? 1 : -1) * (10 + Math.random() * 15);

                      return (
                         <motion.div 
                           key={idx}
                           initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%", rotate: 0 }}
                           animate={{ 
                              scale: 1, 
                              opacity: 1, 
                              x: `calc(-50% + ${x}px)`, 
                              y: `calc(-50% + ${y}px)`,
                              rotate: rot
                           }}
                           exit={{ scale: 0, opacity: 0, x: "-50%", y: "-50%", rotate: 0 }}
                           transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.05 }}
                           className={`absolute left-1/2 top-1/2 ${tool.color} border-[3px] md:border-[4px] border-black shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] px-2 py-1 md:px-4 md:py-2 flex items-center justify-center gap-1 md:gap-2 cursor-pointer z-10 whitespace-nowrap`} 
                           onClick={(e) => { e.stopPropagation(); playPopSound(1 + (idx % 4) * 0.2); }}
                           whileHover={{ scale: 1.1, zIndex: 40 }}
                         >
                            <span className="text-xl md:text-3xl block leading-none">{tool.icon}</span>
                            <span className="font-bold text-xs md:text-base leading-tight">{tool.name}</span>
                         </motion.div>
                      );
                   })}
                </AnimatePresence>
             </div>
          </section>

          {/* Projects */}
          <section id="projects">
             <SectionTitle text="FEATURED PROJECTS" bg="bg-[#66d9ef]" rotate="rotate-[1deg]" align="center" />
             
             <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
               <ProjectCard 
                  title="Telco Customer Churn"
                  desc="Developed a predictive model to identify customers at risk of leaving using telecom data, utilizing Random Forest and XGBoost."
                  tags={["Python", "Scikit-Learn", "Pandas", "EDA"]}
                  link="https://github.com/mohitboura342-ui/telcom_churn-EDA"
                  bg="bg-white"
               />
               <ProjectCard 
                  title="E-Commerce Churn Prediction"
                  desc="Exploratory data analysis and modeling project focused on e-commerce datasets to understand sales trends and customer behavior."
                  tags={["Python", "Machine Learning", "SQL", "Seaborn"]}
                  link="https://github.com/mohitboura342-ui/E-commerce-project"
                  bg="bg-[#fffdf2]"
               />
               <ProjectCard 
                  title="Zomato EDA Analysis"
                  desc="Explores restaurant ratings, online/offline services, and customer preferences using histograms, count plots, and pie charts."
                  tags={["Python", "Pandas", "Matplotlib", "Seaborn"]}
                  link="https://github.com/mohitboura342-ui/zomato-eda-analysis"
                  bg="bg-[#fff2f8]"
               />
               <ProjectCard 
                  title="Learning Core Python"
                  desc="A notebook collection documenting the journey in core Python and libraries, including Matplotlib, NumPy, pandas, and scikit-learn."
                  tags={["Python", "NumPy", "Pandas", "Scikit-Learn"]}
                  link="https://github.com/mohitboura342-ui/LEARNING-CORE-PYTHON"
                  bg="bg-[#f2fbff]"
               />
               <ProjectCard 
                  title="Used Car EDA"
                  desc="A repository with notebooks and plots for used-car exploratory data analysis work."
                  tags={["Python", "Pandas", "Data Vis", "EDA"]}
                  link="https://github.com/mohitboura342-ui/Used-car-eda"
                  bg="bg-[#f3fff2]"
               />
             </div>
             
             <div className="mt-12 flex justify-center">
                 <a href="https://github.com/mohitboura342-ui" target="_blank" rel="noopener noreferrer" className="bg-[#a8e6cf] border-[4px] border-black shadow-[8px_8px_0_0_#000] px-8 py-4 font-black flex items-center gap-3 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000] transition-all text-xl md:text-2xl uppercase tracking-wider group rotate-[-1deg] hover:rotate-0">
                    <Github size={32} className="group-hover:scale-110 transition-transform" />
                    View More Projects on GitHub
                 </a>
             </div>
          </section>

          {/* Blogs Section */}
          <section id="blogs">
             <SectionTitle text="BLOGS & THOUGHTS" bg="bg-[#ffd93d]" rotate="rotate-[2deg]" align="center" />
             
             <div className="mt-12 max-w-4xl mx-auto">
                <a href="https://www.blogger.com/blog/posts/1773436329057341665" target="_blank" rel="noopener noreferrer" className="block group">
                   <div className="bg-[#fffdf2] border-[4px] border-black shadow-[8px_8px_0_0_#000] p-6 md:p-10 flex flex-col sm:flex-row items-center gap-8 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[16px_16px_0_0_#000] transition-all relative">
                      <div className="absolute -top-4 -right-4 bg-[#ff6b9d] border-[3px] border-black shadow-[4px_4px_0_0_#000] p-3 rotate-12 group-hover:rotate-0 transition-transform text-white">
                         <ExternalLink size={24} />
                      </div>
                      <div className="bg-[#66d9ef] border-[3px] border-black shadow-[4px_4px_0_0_#000] p-6 rounded-full rotate-[-5deg] group-hover:rotate-0 transition-transform shrink-0">
                         <BookOpen size={48} className="text-black" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-3xl font-black mb-4 leading-tight">Data Science Blogger</h3>
                        <p className="text-lg font-medium opacity-90 mb-6">Explore my latest write-ups, tech insights, and coding journeys on my personal Blogger space. I share practical case studies and tutorials on Python, machine learning, and data analytics.</p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <span className="bg-white border-[2px] border-black font-bold text-sm px-3 py-1 shadow-[2px_2px_0_0_#000]">Data Science</span>
                          <span className="bg-white border-[2px] border-black font-bold text-sm px-3 py-1 shadow-[2px_2px_0_0_#000]">Tech Articles</span>
                          <span className="bg-white border-[2px] border-black font-bold text-sm px-3 py-1 shadow-[2px_2px_0_0_#000]">Tutorials</span>
                        </div>
                      </div>
                   </div>
                </a>
             </div>
          </section>

          {/* Hobbies Section */}
          <section id="hobbies" className="mt-12 mb-20">
             <SectionTitle text="HOW I RECHARGE" bg="bg-[#a8e6cf]" rotate="rotate-[-2deg]" align="center" />
             
             <div className="mt-12 flex flex-col gap-12 items-center">
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                   <div className="bg-[#fff2f8] border-[4px] border-black shadow-[6px_6px_0_0_#000] p-6 hover:-translate-y-2 transition-transform">
                      <Gamepad2 size={40} className="mb-4 text-[#ff6b9d]" />
                      <h4 className="text-xl font-black mb-2">Esports & Gaming</h4>
                      <p className="font-medium text-sm">Playing and competing in esports, pushing strategies to the limit.</p>
                   </div>
                   <div className="bg-[#f2fbff] border-[4px] border-black shadow-[6px_6px_0_0_#000] p-6 hover:-translate-y-2 transition-transform">
                      <Tv size={40} className="mb-4 text-[#0077b5]" />
                      <h4 className="text-xl font-black mb-2">Spectator</h4>
                      <p className="font-medium text-sm">Enjoying competitive streams, watching esports and cricket matches.</p>
                   </div>
                   <div className="bg-[#f3fff2] border-[4px] border-black shadow-[6px_6px_0_0_#000] p-6 hover:-translate-y-2 transition-transform">
                      <span className="text-4xl block mb-4">🏏</span>
                      <h4 className="text-xl font-black mb-2">Cricket Lover</h4>
                      <p className="font-medium text-sm">Playing cricket in my free time to stay active, teamwork-oriented and sharp.</p>
                   </div>
                   <div className="bg-[#fffdf2] border-[4px] border-black shadow-[6px_6px_0_0_#000] p-6 hover:-translate-y-2 transition-transform">
                      <Cpu size={40} className="mb-4 text-[#ffd93d]" />
                      <h4 className="text-xl font-black mb-2">Tech Explorer</h4>
                      <p className="font-medium text-sm">Deep diving and exploring new technologies and digital things.</p>
                   </div>
                </div>

             </div>
          </section>

          {/* Contact */}
          <section id="contact" className="pb-10 pt-10 border-t-[6px] border-black border-dashed mt-20 relative">
             <div className="tape-sticker w-[120px] h-10 -top-6 left-10 rotate-[8deg] z-20"></div>
             <div className="tape-sticker w-[120px] h-10 -top-6 right-10 rotate-[-8deg] z-20"></div>
             
             <div className="text-center mb-12 lg:mb-20 pt-10">
               <h2 className="text-4xl md:text-5xl font-black mb-4"><span className="bg-[#ffd93d] px-4 border-[4px] border-black shadow-[6px_6px_0_0_#000] inline-block -rotate-1 py-1">GET IN TOUCH</span></h2>
               <p className="text-2xl font-bold font-['Caveat']">Let's build something amazing together!</p>
             </div>
             
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
                <a href="https://linkedin.com/in/mohit-boura-558382379" target="_blank" rel="noopener noreferrer" className="bg-[#0077b5] text-white border-[4px] border-black shadow-[8px_8px_0_0_#000] p-8 flex flex-col items-center justify-center rotate-[-2deg] hover:rotate-0 hover:-translate-y-2 transition-all relative group">
                   <div className="tape-sticker w-16 h-8 -top-3 right-4 rotate-12"></div>
                   <div className="bg-white text-[#0077b5] p-4 border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-full mb-6 group-hover:scale-110 transition-transform">
                      <Linkedin size={36} />
                   </div>
                   <span className="text-xl md:text-2xl font-bold tracking-tight">LinkedIn</span>
                </a>
                <a href="https://github.com/mohitboura342-ui" target="_blank" rel="noopener noreferrer" className="bg-white text-black border-[4px] border-black shadow-[8px_8px_0_0_#000] p-8 flex flex-col items-center justify-center rotate-[2deg] hover:rotate-0 hover:-translate-y-2 transition-all relative group">
                   <div className="tape-sticker w-16 h-8 -top-3 right-4 rotate-[-12deg]"></div>
                   <div className="bg-[#ffd93d] p-4 border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-full mb-6 group-hover:scale-110 transition-transform">
                      <Github size={36} />
                   </div>
                   <span className="text-xl md:text-2xl font-bold tracking-tight">GitHub</span>
                </a>
                <a href="https://www.blogger.com/blog/posts/1773436329057341665" target="_blank" rel="noopener noreferrer" className="bg-[#a8e6cf] text-black border-[4px] border-black shadow-[8px_8px_0_0_#000] p-8 flex flex-col items-center justify-center rotate-[1deg] hover:rotate-0 hover:-translate-y-2 transition-all relative group">
                   <div className="tape-sticker w-16 h-8 -top-3 left-4 rotate-[8deg]"></div>
                   <div className="bg-white text-black p-4 border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-full mb-6 group-hover:scale-110 transition-transform">
                      <BookOpen size={36} />
                   </div>
                   <span className="text-xl md:text-2xl font-bold tracking-tight">Blog</span>
                </a>
                <a href="mailto:mohitboura342@gmail.com" className="bg-[#ff6b9d] text-white border-[4px] border-black shadow-[8px_8px_0_0_#000] p-8 flex flex-col items-center justify-center rotate-[-1deg] hover:rotate-0 hover:-translate-y-2 transition-all relative group break-all">
                   <div className="tape-sticker w-16 h-8 -top-3 right-4 rotate-[5deg]"></div>
                   <div className="bg-[#66d9ef] text-black p-4 border-[3px] border-black shadow-[4px_4px_0_0_#000] rounded-full mb-6 group-hover:scale-110 transition-transform">
                      <Mail size={36} />
                   </div>
                   <span className="text-lg md:text-xl font-bold tracking-tight text-center">mohitboura342<br/>@gmail.com</span>
                </a>
             </div>

             <div className="max-w-3xl mx-auto mt-16 px-4">
                <ContactForm />
             </div>
          </section>

        </main>
        
        {/* Footer */}
        <footer className="border-t-[4px] md:border-t-[6px] border-black bg-white p-8 md:p-12 relative overflow-hidden mt-auto">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="font-black text-3xl tracking-tighter bg-[#ffd93d] border-[3px] border-black px-4 py-1 -rotate-1 shadow-[4px_4px_0_0_#000]">
                Mohit Boura<span className="text-[#ff6b9d]">.</span>
              </div>
              <p className="font-bold text-gray-800 border-[2px] border-black px-5 py-2 border-dashed shadow-[2px_2px_0_0_#000] bg-white">
                 © {new Date().getFullYear()} All rights reserved. Built with bold choices.
              </p>
           </div>
           {/* Abstract footer design piece */}
           <div className="absolute top-0 right-10 w-24 h-32 bg-[#ff6b9d] border-l-[6px] border-b-[6px] border-black -translate-y-1/2 rotate-12 hidden md:block"></div>
        </footer>
        
      </div>
    </div>
  );
}

function SectionTitle({ text, bg, rotate, align = "left", textClass = "text-black" }: any) {
   return (
      <div className={`mb-12 ${align === 'center' ? 'text-center' : ''} relative`}>
         <h2 className={`text-4xl md:text-5xl font-black ${bg} ${textClass} border-[4px] border-black shadow-[8px_8px_0_0_#000] inline-block px-8 py-3 ${rotate} uppercase tracking-tighter hover:rotate-0 transition-transform relative z-10`}>
            {text}
         </h2>
      </div>
   );
}

function SocialButton({ icon, href, color = "bg-white" }: any) {
  return (
    <a 
      href={href} target="_blank" rel="noopener noreferrer"
      className={`${color} border-[3px] border-black shadow-[4px_4px_0_0_#000] p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0_0_#000] transition-all flex items-center justify-center`}
    >
      {icon}
    </a>
  );
}

function JourneyCard({ title, company, date, color, desc, type, isActive, onClick, locName }: any) {
   return (
      <div 
        className={`relative pl-10 md:pl-12 ml-4 pb-4 cursor-pointer transition-all duration-300
          ${isActive ? `border-l-[6px] border-black` : 'border-l-[6px] border-black opacity-70 hover:opacity-100'}`} 
        onClick={onClick}
      >
         {/* Timeline Dot */}
         <div className={`absolute top-0 -left-[19px] w-8 h-8 border-[4px] border-black rounded-full shadow-[3px_3px_0_0_#000] ${color} transition-all duration-300 flex items-center justify-center ${isActive ? 'scale-125' : ''}`}>
           {isActive && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
         </div>
         
         <div className={`bg-white border-[4px] border-black p-6 transition-all relative
            ${isActive ? 'translate-x-2 -translate-y-2 shadow-[12px_12px_0_0_#000] bg-[#fffdf2]' : 'shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000]'}`}
         >
            {isActive && <div className="tape-sticker w-16 h-6 -top-2 left-1/2 -translate-x-1/2 rotate-[-2deg] z-10 transition-all"></div>}
            
            <div className="flex items-center gap-2 mb-2 font-black text-sm uppercase tracking-tight">
               {type === 'experience' ? <Briefcase size={16} className={isActive ? 'text-[#ff6b9d]' : ''} /> : <GraduationCap size={16} className={isActive ? 'text-[#ff6b9d]' : ''} />}
               <span className={isActive ? 'text-[#ff6b9d]' : ''}>{type}</span>
            </div>

            <h4 className="text-xl md:text-2xl font-black mb-3 leading-tight">{title}</h4>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
               <span className={`font-mono text-sm font-bold ${color} border-[2px] border-black px-2 py-1 shadow-[2px_2px_0_0_#000] inline-block max-w-[fit-content]`}>{company}</span>
               <span className="font-bold underline decoration-2 text-sm">{date}</span>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${isActive ? 'max-h-[500px] pt-4 mt-2' : 'max-h-0 pt-0 mt-0 opacity-0'}`}>
               <div className="flex items-center gap-1.5 mb-3 text-sm font-bold opacity-80">
                  <span>📍</span> {locName}
               </div>
               
               <p className="font-medium opacity-90 leading-relaxed border-t-[2px] border-black border-dashed pt-4 text-[15px]">
                 {desc}
               </p>
            </div>
         </div>
      </div>
   );
}

function ProjectCard({ title, desc, tags, link, bg }: any) {
   return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
         <div className={`${bg} border-[4px] border-black shadow-[8px_8px_0_0_#000] p-6 md:p-8 h-full flex flex-col group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[16px_16px_0_0_#000] transition-all relative`}>
            <div className="absolute -top-4 -right-4 bg-[#ffd93d] border-[3px] border-black shadow-[4px_4px_0_0_#000] p-3 rotate-12 group-hover:rotate-0 transition-transform">
               <ExternalLink size={24} />
            </div>
            <h3 className="text-3xl font-black mb-4 leading-tight pr-6">{title}</h3>
            <p className="text-lg font-medium mb-8 flex-grow opacity-90">{desc}</p>
            <div className="flex flex-wrap gap-3">
               {tags.map((t: string, i: number) => (
                  <span key={i} className="bg-white border-[2px] border-black font-bold text-sm px-3 py-1 shadow-[2px_2px_0_0_#000] whitespace-nowrap">{t}</span>
               ))}
            </div>
         </div>
      </a>
   )
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 9, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [center, map]);
  return null;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    try {
      await fetch("https://formsubmit.co/ajax/mohitboura342@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio Contact from ${name}`
        })
      });
    } catch (error) {
      console.error(error);
    }
    
    setStatus("success");
    // Reset after a few seconds
    setTimeout(() => setStatus("idle"), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-[#e0e0e0] border-[4px] border-black shadow-[8px_8px_0_0_#000] p-6 sm:p-10 relative">
       <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#ff6b9d] text-white border-[3px] border-black shadow-[4px_4px_0_0_#000] px-4 py-1 font-black text-lg rotate-[-2deg]">
          Send a Message
       </div>

       {status === "success" ? (
         <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="bg-[#a8e6cf] p-4 rounded-full border-[3px] border-black shadow-[4px_4px_0_0_#000] mb-2 animate-bounce">
              <CheckCircle2 size={48} className="text-black" />
            </div>
            <h3 className="text-3xl font-black">Message Sent!</h3>
            <p className="text-lg font-bold">I'll get back to you as soon as possible.</p>
         </div>
       ) : (
         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label htmlFor="name" className="block text-lg font-black mb-2 uppercase tracking-wide">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required 
                placeholder="John Doe" 
                className="w-full bg-white border-[3px] border-black p-3 text-lg font-bold focus:outline-none focus:ring-0 focus:shadow-[6px_6px_0_0_#ff6b9d] transition-shadow placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-lg font-black mb-2 uppercase tracking-wide">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required 
                placeholder="john@example.com" 
                className="w-full bg-white border-[3px] border-black p-3 text-lg font-bold focus:outline-none focus:ring-0 focus:shadow-[6px_6px_0_0_#ffd93d] transition-shadow placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-black mb-2 uppercase tracking-wide">Message</label>
              <textarea 
                id="message" 
                name="message"
                required 
                placeholder="Hello there..."
                rows={4}
                className="w-full bg-white border-[3px] border-black p-3 text-lg font-bold focus:outline-none focus:ring-0 focus:shadow-[6px_6px_0_0_#66d9ef] transition-shadow placeholder:text-gray-400 resize-y"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full bg-[#ffd93d] border-[4px] border-black shadow-[6px_6px_0_0_#000] p-4 font-black text-xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_0_#000] uppercase tracking-wider disabled:cursor-wait"
            >
              {status === "submitting" ? "Sending..." : "Blast off!"}
            </button>
         </form>
       )}
    </div>
  );
}
