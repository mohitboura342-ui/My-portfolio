import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { CanvasBackground } from './components/CanvasBackground';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { HobbiesSection } from './components/HobbiesSection';
import { MapSection } from './components/MapSection';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans text-white selection:bg-indigo-500/30 selection:text-white bg-[#050505] min-h-screen relative overflow-x-hidden">
      {/* Animated Scroll Progress Bar at the absolute top of the viewport */}
      {!loading && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 origin-left z-[9999] shadow-[0_1px_10px_rgba(99,102,241,0.5)]"
          style={{ scaleX }}
        />
      )}

      <Loader loading={loading} />
      
      {!loading && <Navbar />}

      {/* Global 3D Background Canvas */}
      {!loading && <CanvasBackground />}

      <main className="relative z-10 w-full overflow-hidden block">
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
            <AboutSection />
            <HobbiesSection />
            <ProjectsSection />
            <MapSection />
            <JourneySection />
            <SkillsSection />
            <ContactSection />
          </motion.div>
        )}
      </main>

      {!loading && (
        <footer className="relative z-10 py-10 border-t border-white/5 mt-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Mohit Boura. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
