import { FadeIn3D } from './FadeIn3D';
import { Gamepad2, Tv, Cpu } from 'lucide-react';

const HOBBIES = [
  {
    icon: <Gamepad2 size={32} className="text-pink-500" />,
    title: "Esports & Gaming",
    desc: "Playing and competing in esports, pushing strategies to the limit.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20"
  },
  {
    icon: <Tv size={32} className="text-blue-500" />,
    title: "Spectator",
    desc: "Enjoying competitive streams, watching esports and cricket matches.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20"
  },
  {
    icon: <span className="text-3xl block">🏏</span>,
    title: "Cricket Player & Sports Enthusiast",
    desc: "Playing cricket in my free time to stay active, teamwork-oriented and sharp.",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/20"
  },
  {
    icon: <Cpu size={32} className="text-amber-500" />,
    title: "Tech Explorer",
    desc: "Deep diving and exploring new technologies and digital things.",
    color: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/20"
  }
];

export function HobbiesSection() {
  return (
    <section id="hobbies" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <FadeIn3D>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-sm font-mono text-indigo-400 tracking-[0.3em] uppercase mb-4">Recharge</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Hobbies & Interests</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-amber-500 mt-6 rounded-full"></div>
        </div>
      </FadeIn3D>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOBBIES.map((hobby, i) => (
          <FadeIn3D key={i} delay={i * 0.1}>
            <div className={`glass-card p-6 flex flex-col items-center text-center rounded-3xl h-full border ${hobby.border} hover:bg-white/5 transition-all group overflow-hidden relative`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${hobby.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  {hobby.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{hobby.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{hobby.desc}</p>
              </div>
            </div>
          </FadeIn3D>
        ))}
      </div>
    </section>
  );
}
