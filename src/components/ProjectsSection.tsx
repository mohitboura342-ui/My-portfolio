import { FadeIn3D } from './FadeIn3D';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: "zomato-eda-analysis",
    desc: "This project performs Exploratory Data Analysis (EDA) on the Zomato restaurant dataset using Python. It analyzes restaurant ratings, online vs offline services, and customer preferences using visualizations.",
    tags: ["Python", "Jupyter Notebook", "EDA", "Data Visualization"],
    link: "https://github.com/mohitboura342-ui/zomato-eda-analysis",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    title: "Used-car-eda",
    desc: "An Exploratory Data Analysis (EDA) project focusing on the used car market dataset, uncovering key pricing dynamics, mileage indicators, and vehicle conditions using Python and visuals.",
    tags: ["Python", "Jupyter Notebook", "Seaborn", "Data Cleaning"],
    link: "https://github.com/mohitboura342-ui/Used-car-eda",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "telcom_churn-EDA",
    desc: "Exploratory Data Analysis (EDA) on telecom customer churn dataset. Investigating patterns, customer tenure, service contracts, and main drivers behind customer churn using descriptive statistics and visual plots.",
    tags: ["Python", "Jupyter Notebook", "Churn Prediction", "Matplotlib"],
    link: "https://github.com/mohitboura342-ui/telcom_churn-EDA",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "E-commerce-project",
    desc: "Comprehensive e-commerce analytics project analyzing customer transactions, purchase behaviors, sales trends, and product performance to drive strategic decisions and boost sales.",
    tags: ["Python", "Data Analytics", "Customer Cohorts", "Pandas"],
    link: "https://github.com/mohitboura342-ui/E-commerce-project",
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <FadeIn3D>
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-sm font-mono text-indigo-400 tracking-[0.3em] uppercase mb-4">Executables</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Featured Projects</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-6 rounded-full"></div>
        </div>
      </FadeIn3D>

      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <FadeIn3D key={i} delay={i * 0.1}>
            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`glass-card rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 h-full flex flex-col block cursor-pointer`}
            >
              {/* Background gradient orb */}
              <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${project.color} rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                  <Github size={24} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-all backdrop-blur-sm border border-white/10">
                  <ExternalLink size={18} />
                </div>
              </div>

              <h4 className="text-2xl font-bold text-white mb-4 relative z-10">{project.title}</h4>
              <p className="text-gray-400 leading-relaxed mb-8 flex-grow relative z-10">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </FadeIn3D>
        ))}
      </div>

      {/* See More Projects on GitHub Button */}
      <FadeIn3D delay={0.3}>
        <div className="flex justify-center mt-14">
          <a 
            href="https://github.com/mohitboura342-ui" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600/10 hover:bg-indigo-600/25 border border-indigo-500/30 hover:border-indigo-500/60 rounded-full font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.35)] hover:scale-105 group cursor-pointer"
          >
            <Github size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>See More Projects on GitHub</span>
            <ExternalLink size={16} className="text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </FadeIn3D>
    </section>
  );
}
