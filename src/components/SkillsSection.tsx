import { Canvas } from '@react-three/fiber';
import { SkillsGroup } from './Skills3D';
import { FadeIn3D } from './FadeIn3D';

const toolLinks: Record<string, string> = {
  "Jupyter Notebook": "https://jupyter.org/",
  "VS Code": "https://code.visualstudio.com/",
  "MS Excel": "https://www.microsoft.com/en-us/microsoft-365/excel",
  "Google Colab": "https://colab.research.google.com/",
  "Git": "https://git-scm.com/",
  "MySQL Workbench": "https://www.mysql.com/products/workbench/",
  "AWS": "https://aws.amazon.com/",
  "Figma": "https://www.figma.com/",
  "ChatGPT": "https://chatgpt.com/",
  "Gemini": "https://gemini.google.com/",
  "Perplexity": "https://www.perplexity.ai/",
  "Google AI Studio": "https://aistudio.google.com/",
  "Claude": "https://claude.ai/",
  "QuillBot": "https://quillbot.com/"
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 w-full pt-1 pb-12 scroll-mt-20 flex flex-col items-center justify-center">
      <div className="w-full h-[260px] relative pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} />
          <SkillsGroup />
        </Canvas>
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,#050505_70%)]"></div>
      </div>

      {/* Tools & Platforms Grid */}
      <FadeIn3D className="w-full max-w-4xl mx-auto px-6 mt-2 relative z-10 space-y-6">
        <div>
          <h4 className="text-xl font-bold text-indigo-300 mb-3 text-center font-mono">Tools & Platforms</h4>
          <div className="flex flex-wrap justify-center gap-4">
             {["Jupyter Notebook", "VS Code", "MS Excel", "Google Colab", "Git", "MySQL Workbench", "AWS", "Figma"].map(tool => (
               <a 
                 key={tool} 
                 href={toolLinks[tool] || "#"} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="glass px-6 py-3 rounded-full border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all hover:scale-105 transform duration-300 cursor-pointer block"
               >
                  {tool}
               </a>
             ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-emerald-400 mb-3 text-center font-mono">AI Tools & Productivity</h4>
          <div className="flex flex-wrap justify-center gap-4">
             {["ChatGPT", "Gemini", "Perplexity", "Google AI Studio", "Claude", "QuillBot"].map(tool => (
               <a 
                 key={tool} 
                 href={toolLinks[tool] || "#"} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="glass px-6 py-3 rounded-full border border-emerald-500/20 text-gray-300 font-medium hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-white transition-all hover:scale-105 transform duration-300 cursor-pointer block"
               >
                  {tool}
               </a>
             ))}
          </div>
        </div>
      </FadeIn3D>
    </section>
  );
}
