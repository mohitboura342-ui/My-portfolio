import { FadeIn3D } from './FadeIn3D';

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <FadeIn3D>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-sm font-mono text-indigo-400 tracking-[0.3em] uppercase mb-4">Inside the core</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">About Me</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 mt-6 rounded-full"></div>
        </div>
      </FadeIn3D>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <FadeIn3D direction="left">
          <div className="glass-card p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 relative z-10">
              <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full border border-white/10 shadow-lg overflow-hidden">
                <img 
                  src="/profile.jpg" 
                  alt="Mohit Boura" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter saturate-[1.05] contrast-[1.02] transform transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Data Science meets Business</h4>
                <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4 text-gray-400 relative z-10 leading-relaxed text-lg">
              <p>
                I am a <span className="text-indigo-400 font-semibold">Professional Data Scientist</span> passionate about data analytics, machine learning, and business intelligence.
              </p>
              <p>
                Skilled in <strong className="text-white font-medium">Python, SQL, Power BI, statistics,</strong> and exploratory data analysis. My background bridges the gap between technical data science and strategic business management, allowing me to build models that not only predict accurately but also drive real business value.
              </p>
            </div>
            
            {/* Glowing orb in bg */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </FadeIn3D>

        <FadeIn3D direction="right" delay={0.2}>
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "Experience", value: "Hands-on", desc: "Data Analytics & ML" },
              { title: "Projects", value: "10+", desc: "Real-world implementations" },
              { title: "Education", value: "BCom", desc: "Analytics & Tech focus" },
              { title: "Location", value: "India", desc: "Uttarakhand" },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/10 group">
                <h5 className="text-gray-500 text-sm font-mono uppercase tracking-wider mb-2">{stat.title}</h5>
                <h6 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{stat.value}</h6>
                <p className="text-sm text-gray-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn3D>
      </div>
    </section>
  );
}
