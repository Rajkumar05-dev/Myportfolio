import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Database,
  Server,
  ExternalLink,
  Briefcase,
  Mail,
  Send,
  Award,
  Cpu,
  BookOpen,
  Terminal,
  Sparkles,
  Check,
  Copy,
  Menu,
  X,
  ArrowUpRight,
  TrendingUp,
  FileCode,
  Layers,
  ChevronRight,
  Monitor
} from 'lucide-react'

// Custom SVGs for Social Media Icons to ensure 100% reliability independent of Lucide versions
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Helper for typing animation values
const TYPING_ROLES = [
  "Java Full Stack Developer",
  "Spring Boot & JPA Specialist",
  "React JS Frontend Engineer",
  "Database & API Architect"
];

function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Custom typing animation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Skills filter state
  const [activeSkillTab, setActiveSkillTab] = useState('all');

  // Contact clipboard state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form submission state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  // GitHub contribution grid hover details
  const [hoveredContribution, setHoveredContribution] = useState(null);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'github', 'journey', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for triggers
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text loop typing animation effect
  useEffect(() => {
    let timer;
    const fullText = TYPING_ROLES[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing text
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);

        if (currentText === fullText) {
          // Pause at full text
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting text
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  // Copy Email Function
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rajkumarchauhan.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus('sending');
    // Simulate API request
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1500);
  };

  // Pre-configured projects data
  const projectsData = [
    {
      title: "JerseyKart — Sports E-Commerce Marketplace",
      description: "Interactive web retail platform designed for sports jerseys and custom sports apparel. Unifies a reactive, rich shopping layout with transactional backend server databases.",
      details: "Integrates persistent cart session states, secure customer profile credentials, relational item categories, and dynamic stock level controls using Hibernate and JPA models.",
      type: "fullstack",
      imageText: "SPRING BOOT / REACT JS / HIBERNATE / TAILWIND CSS",
      tech: ["Java", "Spring Boot", "React JS", "Hibernate", "JPA", "MySQL", "Tailwind CSS"],
      github: "https://github.com/Rajkumar05-dev/JerseyKart",
      demo: "https://github.com/Rajkumar05-dev/JerseyKart",
      metric: "Real-time Cart Sync"
    },
    {
      title: "EcoTrack — Environmental Telemetry Dashboard",
      description: "High-end carbon footprint telemetry tracker and analytics platform. Focuses on carbon emission algorithms, sustainability metrics, and real-time visualization.",
      details: "Renders visual emission gauges, custom telemetry tracking tables, and data models mapping environmental variables. Built with animated Framer Motion nodes and responsive CSS glassmorphism.",
      type: "frontend",
      imageText: "REACT JS / TAILWIND CSS / DYNAMIC CHARTING / ANIMATIONS",
      tech: ["React JS", "JavaScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
      github: "https://github.com/Rajkumar05-dev/ecotrack",
      demo: "https://github.com/Rajkumar05-dev/ecotrack",
      metric: "Active Telemetry"
    },
    {
      title: "SpareZone — Auto Spare Parts Database",
      description: "Comprehensive inventory management and search indexing portal matching automotive spare parts. Solves complex relational queries under high data load.",
      details: "Engineered robust database mapping protocols under relational models, custom search parameters, dynamic stock tracking, and fast query execution using optimized MySQL indexing.",
      type: "backend",
      imageText: "CORE JAVA / SPRING BOOT / HIBERNATE / MYSQL / MAVEN",
      tech: ["Java", "Spring Boot", "Hibernate", "JPA", "MySQL", "Maven", "Git"],
      github: "https://github.com/Rajkumar05-dev/SpareZone",
      demo: "https://github.com/Rajkumar05-dev/SpareZone",
      metric: "Optimized RDBMS Search"
    },
    {
      title: "Spring Boot Hotel Reservation System",
      description: "Enterprise reservation engine handling guests booking schedules, dynamic room layouts, custom automated invoices, and secure administrative workflows.",
      details: "Secures application layers using Spring Security middleware. Implements transactional boundaries, dynamic billing math, secure role logins, and modular Maven builds.",
      type: "backend",
      imageText: "SPRING BOOT / SPRING SECURITY / JPA / MYSQL / MAVEN",
      tech: ["Java", "Spring Boot", "Spring Security", "JPA", "Hibernate", "MySQL", "Maven"],
      github: "https://github.com/Rajkumar05-dev/Springboot-hotel-booking-system",
      demo: "https://github.com/Rajkumar05-dev/Springboot-hotel-booking-system",
      metric: "JWT Secure Auth"
    }
  ];

  // Pre-configured skills data
  const skillsData = [
    { name: "Java SE/EE", level: 92, category: "backend", icon: <Terminal className="w-5 h-5 text-cyan-400" /> },
    { name: "Spring Boot", level: 90, category: "backend", icon: <Server className="w-5 h-5 text-emerald-400" /> },
    { name: "Spring Security", level: 85, category: "backend", icon: <Award className="w-5 h-5 text-indigo-400" /> },
    { name: "Hibernate / JPA", level: 88, category: "backend", icon: <Database className="w-5 h-5 text-purple-400" /> },
    { name: "React JS", level: 86, category: "frontend", icon: <Code className="w-5 h-5 text-blue-400" /> },
    { name: "JavaScript (ES6+)", level: 85, category: "frontend", icon: <FileCode className="w-5 h-5 text-yellow-400" /> },
    { name: "Tailwind CSS", level: 90, category: "frontend", icon: <Layers className="w-5 h-5 text-sky-400" /> },
    { name: "Bootstrap", level: 80, category: "frontend", icon: <Monitor className="w-5 h-5 text-violet-400" /> },
    { name: "MySQL Database", level: 88, category: "database", icon: <Database className="w-5 h-5 text-teal-400" /> },
    { name: "Git & GitHub", level: 90, category: "tools", icon: <GithubIcon className="w-5 h-5 text-slate-300" /> },
    { name: "Maven Build", level: 85, category: "tools", icon: <Cpu className="w-5 h-5 text-red-400" /> }
  ];

  // Learning Timeline Data
  const timelineData = [
    {
      year: "May 2025",
      title: "Core Java & Fundamentals",
      desc: "Began my professional coding journey. Mastered Core Java foundations, Object-Oriented Programming (OOP) constructs, collections, multithreading, and robust algorithmic problem solving.",
      badge: "Foundation"
    },
    {
      year: "Sep 2025",
      title: "Enterprise Database Integration",
      desc: "Delved into database mapping and persistent storage structures. Mastered relational mapping using Hibernate ORM and JPA, relational SQL schemas with MySQL, and secure transaction workflows.",
      badge: "Database & JPA"
    },
    {
      year: "Jan 2026",
      title: "Spring Boot Microservices & JWT",
      desc: "Transitioned to advanced microservice networking. Engineered enterprise REST gateways with Spring Boot, structured multi-module builds using Maven, and implemented role-based authorization via Spring Security JWT middleware.",
      badge: "API Architect"
    },
    {
      year: "May 2026",
      title: "Full Stack Convergence (React & Tailwind)",
      desc: "Combined the robust Java backend with modern reactive user interfaces. Engineered sleek, fast, and fully responsive layouts using React JS, custom hooks, and Tailwind CSS v4.",
      badge: "Full Stack Ready"
    }
  ];

  // GitHub contribution grid mock dataset (7 rows, 30 columns)
  const generateGithubGrid = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grid = [];
    const seedRandom = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash % 100);
    };

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const row = [];
      for (let week = 0; week < 32; week++) {
        const id = `cell-${dayIndex}-${week}`;
        const randVal = seedRandom(id);
        let commits = 0;
        let colorClass = "bg-[#111827] border-white/5"; // 0 commits

        if (randVal > 40 && randVal <= 65) {
          commits = Math.floor(randVal % 3) + 1;
          colorClass = "bg-cyan-950/60 border-cyan-900/20"; // 1-2 commits
        } else if (randVal > 65 && randVal <= 85) {
          commits = Math.floor(randVal % 4) + 3;
          colorClass = "bg-cyan-800/60 border-cyan-700/30"; // 3-6 commits
        } else if (randVal > 85) {
          commits = Math.floor(randVal % 6) + 7;
          colorClass = "bg-cyan-400 border-cyan-300/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]"; // 7+ commits
        }

        row.push({
          id,
          commits,
          week,
          day: days[dayIndex],
          colorClass
        });
      }
      grid.push(row);
    }
    return grid;
  };

  const githubGrid = generateGithubGrid();

  // Filter skills based on tab
  const filteredSkills = activeSkillTab === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === activeSkillTab);

  return (
    <div className="relative min-h-screen text-[#cbd5e1] font-sans overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* Background decoration elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-40"></div>
        <div className="glow-blob-1 top-[10%] left-[5%]"></div>
        <div className="glow-blob-2 bottom-[15%] right-[5%]"></div>
        {/* Sleek diagonal color line */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-radial-gradient from-cyan-500/5 to-transparent blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial-gradient from-purple-500/5 to-transparent blur-[140px] rounded-full"></div>
      </div>

      {/* Floating Glass Header */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between glass-nav px-5 py-3 rounded-2xl border border-white/5 shadow-2xl">
          
          {/* Logo / Name Tag */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              RC
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-sm md:text-base group-hover:text-cyan-400 transition-colors">
                Rajkumar Chauhan
              </span>
              <span className="text-[10px] text-slate-400 font-mono leading-none">
                JAVA FULL STACK DEVELOPER
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'github', label: 'Stats' },
              { id: 'journey', label: 'Timeline' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-2 py-1 transition-colors hover:text-white ${
                  activeSection === item.id ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Call to action header button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-white transition-all shadow-md active:scale-95"
            >
              Let's Connect <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[76px] z-40 mx-4 p-5 rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col gap-4 md:hidden"
          >
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'github', label: 'GitHub Stats' },
              { id: 'journey', label: 'Learning Journey' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  activeSection === item.id 
                    ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
            
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 text-center py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              Contact Developer
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-12">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-center py-12 md:py-20 text-center">
          
          {/* Top banner tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wider uppercase bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Available for Roles in 2026
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-4"
          >
            Designing High-Scale <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl">
              Enterprise Java Solutions
            </span>
          </motion.h1>

          {/* Auto Typing Dynamic Subheading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-8 md:h-12 flex items-center justify-center mb-6"
          >
            <span className="text-xl md:text-3xl font-mono text-slate-300 font-medium">
              I am a <span className="text-cyan-400 typing-caret pr-1 font-bold">{currentText}</span>
            </span>
          </motion.div>

          {/* Professional Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10"
          >
            Experienced backend engineer specialized in crafting high-efficiency API architectures with <strong className="text-white">Spring Boot</strong> and robust <strong className="text-white">JPA/Hibernate</strong> structures, paired with modern <strong className="text-white">React JS</strong> user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all text-sm"
            >
              Explore Featured Work <Briefcase className="w-4 h-4" />
            </a>
            
            <a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all text-sm"
            >
              Get In Touch <Mail className="w-4 h-4 text-cyan-400" />
            </a>
          </motion.div>

          {/* Tech stack badge strip under hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-white/5 w-full max-w-4xl"
          >
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">Core Ecosystem</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto px-4">
              {["Java", "Spring Boot", "Spring Security", "Hibernate", "React JS", "MySQL", "Maven"].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/60 border border-white/5 text-slate-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 border-t border-white/5 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Biography */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> 
                Candidate Profile
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                Bridging Scalable Code <br />With High-End Interfaces.
              </h2>
              
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
                <p>
                  I am <strong className="text-white">Rajkumar Chauhan</strong>, a dedicated Java Full Stack Developer who builds robust server-side environments, secures web layers, and translates technical specifications into beautiful responsive user applications.
                </p>
                <p>
                  My architectural core revolves around the <strong className="text-white">Java Spring Ecosystem</strong>. I configure enterprise APIs with custom authentication guards using <strong className="text-cyan-300">Spring Security</strong>, map complex relational data stores using <strong className="text-indigo-300">Hibernate/JPA</strong> structures, and enforce transaction rules on high-availability databases like <strong className="text-white">MySQL</strong>.
                </p>
                <p>
                  On the frontend, I unify application ecosystems using <strong className="text-white">React JS</strong> and <strong className="text-white">Tailwind CSS</strong>, building sleek interactive SaaS style dashboards that provide real-time updates and lightning-fast user interactions.
                </p>
              </div>

              {/* Grid of stats counts */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                {[
                  { count: "15+", label: "Completed Projects" },
                  { count: "3+", label: "Years Dev Focus" },
                  { count: "12+", label: "Ecosystem Tools" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                      {stat.count}
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide mt-1 uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Glassmorphic Grid / Tech Spotlight Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-[380px] p-6 rounded-3xl glass-panel-glow border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Background flare inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[30px] group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[30px] group-hover:bg-indigo-500/20 transition-all duration-500"></div>

                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono px-2.5 py-1 bg-white/5 rounded-full border border-white/5 uppercase">
                    System Active
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">Rajkumar's Code Core</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Compiled configuration logs detail optimized response times, multi-threaded pipelines, and responsive React state arrays.
                </p>

                {/* Simulated Console Logs inside Glass Card */}
                <div className="bg-[#04060c]/80 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-emerald-400 leading-tight space-y-1.5 shadow-inner">
                  <div className="text-slate-500 select-none"># system diagnostics logger</div>
                  <div>&gt; java -version: "Java 21 LTS"</div>
                  <div>&gt; springboot-status: "running [PORT 8080]"</div>
                  <div>&gt; security-auth: "JWT enabled - HS256"</div>
                  <div>&gt; jpa-cache: "Level-2 enabled - ok"</div>
                  <div className="text-cyan-400">&gt; react-dom: "V19 rendering successful"</div>
                  <div className="text-indigo-400 animate-pulse">&gt; compiler_sys: 0 vulnerabilities. READY.</div>
                </div>

                {/* Contact buttons inside card */}
                <div className="mt-6 flex justify-between gap-3">
                  <a
                    href="#contact"
                    className="flex-1 text-center py-2.5 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300 rounded-xl text-xs font-semibold transition-all"
                  >
                    Send Query
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs flex items-center justify-center transition-all"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-white/5 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-500/10">
              Technical Arsenal
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Ecosystem Expertise
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-3">
              Representing a cohesive blend of highly structured server architectures and optimized layout layers.
            </p>
          </div>

          {/* Filtering Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-md mx-auto">
            {[
              { id: 'all', label: 'All Tech' },
              { id: 'backend', label: 'Java Backend' },
              { id: 'frontend', label: 'React Frontend' },
              { id: 'database', label: 'Databases' },
              { id: 'tools', label: 'Build Tools' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSkillTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/15'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid layout for selected skills */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="p-5 rounded-2xl glass-panel flex flex-col justify-between h-[130px] relative overflow-hidden group"
                >
                  {/* Subtle hover gradient inside skill cards */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all">
                      {skill.icon}
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    
                    {/* Linear progress gauge bar */}
                    <div className="w-full h-1.5 bg-slate-900/60 rounded-full mt-2 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="py-20 border-t border-white/5 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-500/10">
              Selected Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Featured Software Projects
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-3">
              Explore concrete applications mapping robust full-stack specifications to production-ready platforms.
            </p>
          </div>

          {/* Vertical stack of project columns */}
          <div className="space-y-12">
            {projectsData.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                key={project.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 rounded-3xl glass-panel relative overflow-hidden group"
              >
                {/* Floating highlight glow behind card */}
                <div className={`absolute -right-32 -bottom-32 w-80 h-80 rounded-full blur-[100px] transition-opacity duration-700 opacity-20 group-hover:opacity-40 pointer-events-none ${
                  idx % 2 === 0 ? 'bg-cyan-500/10' : 'bg-purple-500/10'
                }`}></div>

                {/* Left Side: Mock Graphic representing the tech ecosystem */}
                <div className="lg:col-span-5 min-h-[220px] rounded-2xl bg-slate-950 border border-white/5 relative overflow-hidden flex flex-col justify-center items-center p-6 text-center select-none shadow-inner">
                  {/* Decorative glowing gradient circle */}
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 blur-[20px] opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  {/* Glowing badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-mono text-cyan-400 tracking-wider">
                    {project.metric}
                  </div>

                  <Terminal className="w-10 h-10 text-cyan-400/60 group-hover:text-cyan-400 transition-colors mb-3 relative z-10" />
                  
                  <span className="font-mono text-xs text-slate-400 font-bold tracking-tight px-3 py-1 bg-white/5 rounded-lg border border-white/5 relative z-10 max-w-full truncate">
                    {project.imageText}
                  </span>
                  
                  <span className="text-[10px] text-slate-600 font-mono mt-4 uppercase">
                    SYS_CONFIG // PRODUCTION_BUILD
                  </span>
                </div>

                {/* Right Side: Detailed Descriptions & Badges */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-3">
                      {project.description}
                    </p>
                    
                    <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed mb-5">
                      {project.details}
                    </p>
                  </div>

                  {/* Tech stack badge list */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-white transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> View Source
                      </a>
                      
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 text-cyan-300 hover:text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Live Demonstration <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GITHUB STATS DASHBOARD */}
        <section id="github" className="py-20 border-t border-white/5 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-500/10">
              Activity Telemetry
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
              GitHub Performance Dashboard
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-3">
              Live representation of contribution matrix, repository language shares, and direct secure git transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Glass Card for Contributions Grid & Quick Analytics */}
            <div className="lg:col-span-8 p-6 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs text-white font-bold">rajkumar-chauhan / contributions</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">365 DAYS ACTIVE // 1,248 COMMITS</span>
                </div>

                {/* Git Contribution block grid representation */}
                <div className="overflow-x-auto py-2 pr-2">
                  <div className="min-w-[620px] flex flex-col gap-[3px]">
                    {githubGrid.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-[3px] items-center">
                        {/* Day indicator label */}
                        <span className="w-7 font-mono text-[9px] text-slate-600 text-right pr-1 select-none">
                          {row[0].day}
                        </span>
                        
                        {row.map((cell) => (
                          <div
                            key={cell.id}
                            onMouseEnter={() => setHoveredContribution(cell)}
                            onMouseLeave={() => setHoveredContribution(null)}
                            className={`w-3.5 h-3.5 rounded-[2.5px] border ${cell.colorClass} transition-all duration-150 hover:scale-125 cursor-pointer relative`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Legend & Hover state */}
                <div className="flex flex-wrap justify-between items-center mt-5 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  
                  {/* Color level descriptors */}
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#111827] border border-white/5"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-950/60 border border-cyan-900/20"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-800/60 border border-cyan-700/30"></div>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400 border-cyan-300/30"></div>
                    <span>More</span>
                  </div>

                  {/* Active Tooltip value */}
                  <div className="min-h-5 text-right flex items-center">
                    <AnimatePresence mode="wait">
                      {hoveredContribution ? (
                        <motion.span
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          className="text-cyan-400 font-bold"
                        >
                          {hoveredContribution.commits} commits on {hoveredContribution.day}, Week {hoveredContribution.week + 1}
                        </motion.span>
                      ) : (
                        <span className="text-slate-600 select-none">Hover blocks to view commits</span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Multi-metrics row at bottom of card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
                {[
                  { value: "94.2%", label: "Acceptance Rate", change: "+1.8%" },
                  { value: "28 Days", label: "Active Streak", change: "Current" },
                  { value: "89", label: "PRs Merged", change: "v4 config" },
                  { value: "15", label: "Repos Tracked", change: "Enterprise" }
                ].map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase leading-none">{m.label}</div>
                    <div className="text-lg font-bold text-white mt-1.5 leading-none">{m.value}</div>
                    <div className="text-[9px] font-mono text-cyan-500 mt-1 select-none">{m.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Circle Language Breakdown & Commit Log feed */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Language Distribution SVG card */}
              <div className="p-5 rounded-3xl glass-panel flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> LANGUAGE BALANCE
                </div>

                {/* Custom SVG ring chart representing shares */}
                <div className="relative w-36 h-36 mt-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Track ring */}
                    <circle cx="50" cy="50" r="40" stroke="#111827" strokeWidth="9" fill="transparent" />
                    
                    {/* Java: 50% (cyan-400) */}
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="#22d3ee" strokeWidth="9" fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="125.6"
                      className="circular-progress"
                    />
                    
                    {/* React JS / JavaScript: 30% (indigo-500) */}
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="#6366f1" strokeWidth="9" fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="201.0"
                      className="circular-progress"
                    />

                    {/* MySQL / JPA: 15% (purple-500) */}
                    <circle
                      cx="50" cy="50" r="40"
                      stroke="#a855f7" strokeWidth="9" fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="238.65"
                      className="circular-progress"
                    />
                  </svg>
                  
                  {/* Central Text HUD */}
                  <div className="absolute flex flex-col justify-center items-center">
                    <span className="text-xl font-extrabold text-white">Java</span>
                    <span className="text-[10px] font-mono text-slate-400">50% Core</span>
                  </div>
                </div>

                {/* Legend checklist */}
                <div className="w-full mt-5 space-y-2 text-xs font-mono">
                  {[
                    { name: "Java (Spring, JPA)", pct: "50%", color: "bg-cyan-400" },
                    { name: "React JS (ES6, Tailwind)", pct: "30%", color: "bg-indigo-500" },
                    { name: "MySQL (SQL Schema)", pct: "15%", color: "bg-purple-500" },
                    { name: "Maven, Git Config", pct: "5%", color: "bg-slate-500" }
                  ].map((lang) => (
                    <div key={lang.name} className="flex justify-between items-center text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-[3px] ${lang.color}`}></span>
                        <span className="font-semibold text-slate-400">{lang.name}</span>
                      </div>
                      <span className="text-white font-bold">{lang.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* simulated commit list */}
              <div className="p-5 rounded-3xl glass-panel relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs text-white font-bold">git log --recent-commits</span>
                </div>

                <div className="space-y-3 max-h-[170px] overflow-y-auto pr-1">
                  {[
                    { hash: "7a2f1c8", msg: "feat: integrate Spring Security JWT token authentication", date: "2 hrs ago" },
                    { hash: "f3c8a92", msg: "refactor: optimize Hibernate JPA queries with lazy loading", date: "1 day ago" },
                    { hash: "e2b0d38", msg: "fix: resolve state re-rendering in React project dashboard", date: "2 days ago" },
                    { hash: "9d48b1c", msg: "build: configure Maven parent pom for multi-module microservice", date: "4 days ago" }
                  ].map((log) => (
                    <div key={log.hash} className="p-2.5 rounded-xl bg-slate-950/40 border border-white/5 font-mono text-[10px] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-bold">commit {log.hash}</span>
                        <span className="text-slate-600">{log.date}</span>
                      </div>
                      <p className="text-slate-300 truncate leading-tight">{log.msg}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* LEARNING JOURNEY TIMELINE */}
        <section id="journey" className="py-20 border-t border-white/5 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-500/10">
              Dev Evolution
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Learning Journey Timeline
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-3">
              Chronological review detailing architectural evolution and framework convergence.
            </p>
          </div>

          {/* Central Vertical Timeline */}
          <div className="relative max-w-3xl mx-auto px-4 md:px-0">
            {/* Timeline center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-500 opacity-20"></div>

            <div className="space-y-12">
              {timelineData.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Node Pin */}
                  <div className="absolute left-[17px] md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#050814] border-4 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  </div>

                  {/* Left Column buffer */}
                  <div className="hidden md:block md:w-1/2 px-8"></div>

                  {/* Right Column: Actual Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="p-6 rounded-2xl glass-panel relative overflow-hidden"
                    >
                      {/* Floating glowing light */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-[10px]"></div>

                      <div className="flex justify-between items-center mb-3">
                        <span className="text-2xl font-extrabold text-white">
                          {milestone.year}
                        </span>
                        <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-mono text-cyan-300 rounded-full font-bold uppercase">
                          {milestone.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        {milestone.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-white/5 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col: Contact direct actions & links */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span> SECURE GATEWAY
              </span>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                Start a Conversation
              </h2>
              
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                I am actively seeking professional alignments, technical roles, or project specifications. Let's arrange a telemetry call or architectural review.
              </p>

              {/* Direct email display panel */}
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 font-mono text-xs space-y-4 mb-8">
                <div className="text-slate-500 uppercase select-none"># contact details</div>
                
                <div className="flex items-center justify-between text-slate-300 bg-[#050814] p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">rajkumarchauhan.dev@gmail.com</span>
                  </div>
                  
                  <button
                    onClick={handleCopyEmail}
                    className="ml-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Icon Row */}
              <div className="flex gap-4">
                {[
                  { icon: <GithubIcon className="w-5 h-5" />, url: "https://github.com/Rajkumar05-dev", label: "GitHub" },
                  { icon: <LinkedinIcon className="w-5 h-5" />, url: "https://linkedin.com/in/rajkumar-chauhan", label: "LinkedIn" },
                  { icon: <InstagramIcon className="w-5 h-5" />, url: "https://instagram.com/_raj_chauhan2", label: "Instagram" }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-slate-300 hover:text-cyan-300 rounded-2xl transition-all active:scale-95 flex items-center justify-center shadow-lg"
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Col: Interactive email dispatch form */}
            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded-3xl glass-panel relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-[20px]"></div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs font-mono text-slate-400 font-bold uppercase select-none tracking-wider">
                      Your Identity
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      required
                      placeholder="e.g. John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 focus:bg-slate-950/80 text-sm transition-all shadow-inner hover:border-white/25"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-xs font-mono text-slate-400 font-bold uppercase select-none tracking-wider">
                      Return Gateway (Email)
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      placeholder="e.g. client@enterprise.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 focus:bg-slate-950/80 text-sm transition-all shadow-inner hover:border-white/25"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="text-xs font-mono text-slate-400 font-bold uppercase select-none tracking-wider">
                      Transmission Parameters (Message)
                    </label>
                    <textarea
                      id="form-message"
                      rows="4"
                      required
                      placeholder="Detail your requirements, project scope, or opportunity details..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 focus:bg-slate-950/80 text-sm transition-all resize-none shadow-inner hover:border-white/25"
                    />
                  </div>

                  {/* Submit state check button */}
                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/35 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all text-sm mt-6"
                  >
                    {formStatus === 'idle' && (
                      <>
                        Dispatch Secure Message <Send className="w-4 h-4" />
                      </>
                    )}
                    {formStatus === 'sending' && (
                      <span className="flex items-center gap-2 font-mono text-xs">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg> Resolving connection...
                      </span>
                    )}
                    {formStatus === 'success' && (
                      <>
                        Message Transmitted Successfully! <Check className="w-4 h-4 text-emerald-400" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/25 text-emerald-400 text-center text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      >
                        Telemetry received. I will establish direct contact within 24 hours.
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-10 bg-[#04060d]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-extrabold text-[10px]">
                RC
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                Rajkumar Chauhan
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1">
              Java Full Stack Developer Portfolio // Version 4.2.0
            </span>
          </div>

          <div className="text-center md:text-right font-mono text-[10px] text-slate-500">
            <div>&copy; {new Date().getFullYear()} Rajkumar Chauhan. All rights reserved.</div>
            <div className="mt-1 flex items-center justify-center md:justify-end gap-1.5 text-[9px] text-slate-600">
              <span>Secure Connection</span> 
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 
              <span>Vite + React + Tailwind v4 + Framer Motion</span>
            </div>
          </div>
          
        </div>
      </footer>

    </div>
  )
}

export default App
