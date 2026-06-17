import { motion } from 'motion/react';
import { FadeIn3D } from './FadeIn3D';

const EXPERIENCES = [
  {
    type: "Work",
    title: "Data Science Intern",
    company: "vijAI Robotics Pvt Ltd (Haldwani)",
    date: "Sep 2025 - Present",
    desc: "Executed data cleaning, EDA, feature engineering, and model building using Python (pandas, NumPy, scikit-learn, matplotlib) in Haldwani, Uttarakhand.",
  },
  {
    type: "Education",
    title: "BCom, Analytics & Tech",
    company: "Uttarakhand Open Univ. (Dehradun)",
    date: "Jul 2025 - Jul 2028",
    desc: "Focusing on analytics, technology, and commerce fundamentals at the Dehradun facility.",
  },
  {
    type: "Education",
    title: "Intermediate Schooling",
    company: "Uttarakhand Board of School Education (UBSE), Ramnagar",
    date: "Completed",
    desc: "Completed intermediate secondary education studying science/mathematics under the Uttarakhand Board of School Education (UBSE) in Ramnagar, Uttarakhand."
  }
];

export function JourneySection() {
  return (
    <section id="experience" className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-4 md:pt-16 md:pb-6 scroll-mt-20">
      <FadeIn3D>
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-sm font-mono text-indigo-400 tracking-[0.3em] uppercase mb-3">The Path</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Experience</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 mt-4 rounded-full"></div>
        </div>
      </FadeIn3D>

      <div className="relative">
        {/* Glow Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent -translate-x-1/2 hidden md:block"></div>
        
        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn3D key={i} delay={i * 0.1}>
              <div className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                <div className="flex-1 w-full flex justify-center md:justify-end">
                  {i % 2 === 1 && <div className="hidden md:block flex-1" />}
                  {i % 2 === 0 && (
                     <div className="glass-card p-8 rounded-2xl w-full group hover:bg-white/5 transition-all">
                        <span className="text-xs font-mono text-emerald-400 mb-2 block">{exp.date}</span>
                        <h4 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{exp.title}</h4>
                        <h5 className="text-lg text-gray-300 mb-4">{exp.company}</h5>
                        <p className="text-gray-400 leading-relaxed text-sm">
                          {exp.desc}
                        </p>
                     </div>
                  )}
                </div>

                <div className="hidden md:flex w-12 h-12 rounded-full border-4 border-[#050505] bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                   <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className="flex-1 w-full flex justify-center md:justify-start">
                  {i % 2 === 0 && <div className="hidden md:block flex-1" />}
                  {i % 2 === 1 && (
                     <div className="glass-card p-8 rounded-2xl w-full group hover:bg-white/5 transition-all">
                        <span className="text-xs font-mono text-emerald-400 mb-2 block">{exp.date}</span>
                        <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{exp.title}</h4>
                        <h5 className="text-lg text-gray-300 mb-4">{exp.company}</h5>
                        <p className="text-gray-400 leading-relaxed text-sm">
                          {exp.desc}
                        </p>
                     </div>
                  )}
                </div>

              </div>
            </FadeIn3D>
          ))}
        </div>
      </div>
    </section>
  );
}
