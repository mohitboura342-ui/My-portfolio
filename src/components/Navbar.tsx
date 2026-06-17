import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { Menu, X } from 'lucide-react';

const handleDownloadCV = () => {
    const doc = new jsPDF();
    const primaryColor = [79, 70, 229]; // Indigo
    const darkTextColor = [31, 41, 55]; // Charcoal
    const secondaryColor = [75, 85, 99]; // Cool gray
    const accentColor = [16, 185, 129]; // Emerald
    
    let y = 15;
    let pageNum = 1;
    
    const drawPageHeader = () => {
        // Main boundary bar
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(15, 12, 180, 2, 'F');
    };
    
    const drawPageFooter = (num: number) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175); // gray-400
        doc.text(`Mohit Boura — Curriculum Vitae`, 15, 287);
        doc.text(`Page ${num}`, 195, 287, { align: "right" });
    };

    const checkPageBreak = (spaceNeeded: number) => {
        if (y + spaceNeeded > 275) {
            drawPageFooter(pageNum);
            doc.addPage();
            pageNum++;
            y = 20;
            drawPageHeader();
        }
    };

    // --- Page 1 Header ---
    drawPageHeader();
    
    // Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("MOHIT BOURA", 15, y + 10);
    y += 10;
    
    // Subtitle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Data Analyst  |  Data Science Intern  |  ML Enthusiast", 15, y + 6);
    y += 6;
    
    // Contact Info Grid
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Email: mohitboura342@gmail.com   |   Phone: +91 7037957098   |   Location: Uttarakhand, India", 15, y + 6);
    doc.text("LinkedIn: linkedin.com/in/mohit-boura-558382379   |   GitHub: github.com/mohitboura342-ui", 15, y + 10);
    y += 12;

    // Open to Opportunities badge
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(15, y + 2, 38, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text("OPEN TO OPPORTUNITIES", 17, y + 5.5);
    
    // Line separator
    doc.setDrawColor(229, 231, 235);
    doc.line(15, y + 10, 195, y + 10);
    y += 16;
    
    // Summary Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("PROFESSIONAL SUMMARY", 15, y);
    y += 5;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    const summaryText = "Results-driven Data Analyst and aspiring Data Scientist with hands-on experience in Python, SQL, machine learning, and business intelligence. Adept at transforming complex datasets into actionable insights through rigorous exploratory data analysis, feature engineering, and predictive modelling. Uniquely positioned at the intersection of technical data science and strategic business management, consistently delivering models that not only predict accurately but also drive measurable business value. Currently applying skills in a real-world internship environment while pursuing a B.Com with an analytics and technology focus.";
    const summaryLines = doc.splitTextToSize(summaryText, 180);
    doc.text(summaryLines, 15, y);
    y += summaryLines.length * 4.8 + 6;
    
    // Skills Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("TECHNICAL SKILLS", 15, y);
    y += 5;
    
    const drawSkillCategory = (title: string, skills: string) => {
        checkPageBreak(10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text(title, 15, y);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        const skillLines = doc.splitTextToSize(skills, 130);
        doc.text(skillLines, 65, y);
        y += Math.max(5, skillLines.length * 4.5) + 1;
    };
    
    drawSkillCategory("Programming & Data:", "Python, SQL, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Jupyter Notebook");
    drawSkillCategory("Analytics & BI:", "Power BI, MS Excel, Google Colab, EDA, Feature Engineering, Statistical Analysis, Data Cleaning, Data Visualization");
    drawSkillCategory("Tools & Platforms:", "Git & GitHub, MySQL Workbench, VS Code, AWS, Figma, ChatGPT, Google AI Studio, Perplexity AI");
    drawSkillCategory("Soft Skills:", "Analytical Thinking, Problem Solving, Team Collaboration, Communication");
    y += 5;
    
    // Experience Section
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("PROFESSIONAL EXPERIENCE", 15, y);
    y += 5;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Data Science Intern", 15, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Sep 2025 – Present", 195, y, { align: "right" });
    y += 4.5;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("vijAI Robotics Pvt Ltd — Haldwani, Uttarakhand", 15, y);
    y += 6;
    
    const points = [
        "Executed end-to-end data pipelines covering data cleaning, feature engineering, and model building using Python (pandas, NumPy, scikit-learn).",
        "Conducted exploratory data analysis (EDA) on real-world datasets, surfacing key insights that informed product and operational decisions.",
        "Developed and evaluated ML models to support business intelligence and predictive analytics requirements.",
        "Produced data visualisation reports using Matplotlib and Seaborn, improving stakeholder understanding of complex data trends.",
        "Collaborated cross-functionally with engineering and product teams in an agile environment."
    ];
    
    points.forEach(pt => {
        checkPageBreak(12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text("•", 15, y);
        const wrappedPt = doc.splitTextToSize(pt, 172);
        doc.text(wrappedPt, 20, y);
        y += wrappedPt.length * 4.5 + 1;
    });
    
    y += 5;
    
    // Projects Section
    checkPageBreak(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("SELECTED PROJECTS", 15, y);
    y += 5;
    
    const projectsList = [
        {
            title: "Zomato Restaurant EDA",
            tech: "Python | Jupyter | EDA | Matplotlib",
            desc: "Performed comprehensive EDA on the Zomato restaurant dataset, analysing ratings, online vs. offline service patterns, and customer preferences. Delivered visual insights that highlighted key factors influencing restaurant success and customer satisfaction.",
            link: "github.com/mohitboura342-ui/zomato-eda-analysis"
        },
        {
            title: "Used Car Market EDA",
            tech: "Python | Seaborn | Data Cleaning",
            desc: "Analysed used car market dataset to uncover pricing dynamics, mileage trends, and vehicle condition indicators. Applied data cleaning best practices to handle missing values and outliers, improving data quality by standardising 5+ feature columns.",
            link: "github.com/mohitboura342-ui/Used-car-eda"
        },
        {
            title: "Telecom Customer Churn EDA",
            tech: "Python | Matplotlib | Churn Prediction",
            desc: "Investigated telecom churn dataset to identify key drivers: customer tenure, service contracts, and usage patterns. Produced descriptive statistics and visual plots that reduced churn analysis time and provided a foundation for predictive modelling.",
            link: "github.com/mohitboura342-ui/telcom_churn-EDA"
        },
        {
            title: "E-Commerce Analytics Dashboard",
            tech: "Python | Pandas | Customer Cohorts",
            desc: "Analysed customer transactions, purchase behaviours, sales trends, and product performance across an e-commerce dataset. Delivered cohort analysis and segmentation insights, enabling data-driven strategies to improve retention and boost revenue.",
            link: "github.com/mohitboura342-ui/E-commerce-project"
        }
    ];
    
    projectsList.forEach(proj => {
        checkPageBreak(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text(proj.title, 15, y);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`[ ${proj.tech} ]`, 195, y, { align: "right" });
        y += 4.5;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        const wrappedDesc = doc.splitTextToSize(proj.desc, 180);
        doc.text(wrappedDesc, 15, y);
        y += wrappedDesc.length * 4.5;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text(`Repository: ${proj.link}`, 15, y + 3.5);
        y += 9;
    });
    
    // Education Section
    checkPageBreak(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("EDUCATION HISTORY", 15, y);
    y += 5;
    
    // B.Com
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Bachelor of Commerce (B.Com) — Analytics & Technology", 15, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Jul 2025 – Jul 2028", 195, y, { align: "right" });
    y += 4.5;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Uttarakhand Open University, Dehradun", 15, y);
    y += 4.5;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Coursework focused on analytics, technology, and commerce fundamentals.", 15, y);
    y += 8;
    
    // Intermediate
    checkPageBreak(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Intermediate (Science / Mathematics)", 15, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Completed", 195, y, { align: "right" });
    y += 4.5;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Uttarakhand Board of School Education (UBSE), Ramnagar", 15, y);
    y += 4.5;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Studied science and mathematics under the Uttarakhand state board curriculum.", 15, y);
    y += 12;
    
    // Certifications & Learning
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("CERTIFICATIONS & LEARNING", 15, y);
    y += 5;
    
    const certs = [
        "Python for Data Science & Machine Learning — self-directed study via industry platforms",
        "SQL for Data Analysis — structured query language and relational database fundamentals",
        "Power BI & Data Visualisation — business intelligence and dashboard design",
        "Exploratory Data Analysis (EDA) — statistical methods and Python libraries",
        "Continually expanding skills through Google AI Studio, Perplexity AI, and Claude."
    ];
    
    certs.forEach(cert => {
        checkPageBreak(8);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text("•", 15, y);
        const wrappedCert = doc.splitTextToSize(cert, 172);
        doc.text(wrappedCert, 20, y);
        y += wrappedCert.length * 4.5 + 1;
    });
    
    y += 5;
    
    // Interests & Hobbies
    checkPageBreak(25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("INTERESTS & HOBBIES", 15, y);
    y += 5;
    
    const hobbies = [
        { title: "Esports & Competitive Gaming", desc: "strategic thinking, rapid decision-making, and performance optimisation under pressure." },
        { title: "Competitive Sports Spectating", desc: "analytical observation of tactics in esports and cricket to deepen strategic mindset." },
        { title: "Cricket Player", desc: "active team sport participation, fostering teamwork, discipline, and physical fitness." },
        { title: "Technology Exploration", desc: "continuous learning of emerging tools, AI platforms, and digital innovations." }
    ];
    
    hobbies.forEach(hobby => {
        checkPageBreak(10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text(`• ${hobby.title}:`, 15, y);
        
        const textWidth = doc.getTextWidth(`• ${hobby.title}: `);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        const wrappedHobbyDesc = doc.splitTextToSize(hobby.desc, 172 - textWidth);
        doc.text(wrappedHobbyDesc, 15 + textWidth, y);
        y += wrappedHobbyDesc.length * 4.5 + 1;
    });
    
    // Draw footer for the last page
    drawPageFooter(pageNum);
    
    // Save file
    doc.save("Mohit_Boura_CV.pdf");
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto">
        <a href="#" className="text-xl font-bold text-white tracking-tighter shrink-0">
          MB<span className="text-indigo-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-8 text-xs lg:text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#hobbies" className="hover:text-white transition-colors">Hobbies</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={handleDownloadCV}
            className="hidden sm:block px-4 lg:px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs lg:text-sm font-medium text-white transition-all"
          >
            Download CV
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 sm:left-6 right-4 sm:right-6 mt-2 p-4 glass rounded-2xl flex flex-col gap-4 text-sm font-medium text-gray-300 pointer-events-auto shadow-xl"
          >
            <a href="#about" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors">About</a>
            <a href="#hobbies" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Hobbies & Interests</a>
            <a href="#projects" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Featured Projects</a>
            <a href="#experience" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Experience</a>
            <a href="#skills" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Tools & Platforms</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-white/10 rounded-lg hover:text-white transition-colors">Get in Touch</a>
            <button 
              onClick={() => {
                handleDownloadCV();
                setIsOpen(false);
              }}
              className="sm:hidden px-4 py-3 mt-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm font-medium transition-all hover:bg-indigo-500/30 text-center"
            >
              Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
