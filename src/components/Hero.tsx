import { motion } from 'motion/react';
import Typewriter from 'typewriter-effect';

export function Hero() {
  const imgSrc = "/profile.jpg";

  return (
    <div className="relative z-10 min-h-[100vh] flex items-center px-6 lg:px-20 py-16 lg:py-0">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-24 lg:pt-0">
        
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-center pointer-events-none"
        >
          <span className="text-xs sm:text-sm font-mono text-emerald-400 tracking-[0.2em] uppercase block mb-4 pointer-events-auto">
            👋 Welcome to my portfolio
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6 pointer-events-auto text-white">
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Mohit Boura</span>
          </h1>
          
          <div className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-gray-300 h-[40px] mb-8 pointer-events-auto flex items-center gap-2">
            <span className="text-indigo-400">Specializing in:</span>
            <Typewriter
              options={{
                strings: [
                  'AI Data Science',
                  'Machine Learning',
                  'Python Programming',
                  'Business Intelligence'
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed pointer-events-auto"
          >
            Passionate about data analytics, machine learning, and business intelligence. 
            I build models that predict accurately and drive real business value.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="pointer-events-auto flex flex-wrap gap-4"
          >
            <a href="#projects" className="px-6 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105">
              Explore Work
            </a>
            <a href="#contact" className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Photo Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center gap-4"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-[350px] xl:h-[350px] group pointer-events-auto">
            {/* Soft ambient glowing ring behind portrait */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-700 pointer-events-none animate-pulse"></div>
            
            {/* Glassmorphism framing container */}
            <div className="relative w-full h-full p-3 bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
              
              {/* Profile Image itself */}
              <img 
                src={imgSrc}
                alt="Mohit Boura Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl border border-white/5 shadow-inner transition-all duration-700 group-hover:scale-105 filter saturate-[1.05] contrast-[1.02]"
              />

              {/* Grid overlay for dynamic background dimming on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              {/* Smart minimal status badge on image */}
              <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl flex items-center justify-between transform transition-all duration-500 group-hover:translate-y-[-2px] pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  <span className="text-[10px] font-mono text-gray-300 tracking-wider uppercase">Open to Work</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">Active</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
