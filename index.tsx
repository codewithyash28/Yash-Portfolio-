import React, { Suspense, useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Mail, Smartphone, ExternalLink, Code2, Brain, Database, Terminal, Layers, Cpu, ChevronDown, MessageCircle, X, Send, Bot } from 'lucide-react';
import * as THREE from 'three';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface Project {
  title: string;
  desc: string;
  tech: string[];
  link: string;
}

interface SkillCategory {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

// --- 3D Components ---

const AnimatedSphere = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        position={[2, 0, 0]} 
        scale={hovered ? 2.2 : 2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#a855f7" : "#4f46e5"}
          emissive={hovered ? "#4c1d95" : "#1e1b4b"}
          envMapIntensity={0.5}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
          metalness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const BackgroundScene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

// --- UI Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center glass-card border-none bg-opacity-30">
      <div className="text-2xl font-orbitron font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary cursor-pointer">
        YASH
      </div>
      <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide text-gray-300">
        <a href="#about" className="hover:text-accent transition-colors">ABOUT</a>
        <a href="#skills" className="hover:text-accent transition-colors">SKILLS</a>
        <a href="#projects" className="hover:text-accent transition-colors">PROJECTS</a>
        <a href="#contact" className="hover:text-accent transition-colors">CONTACT</a>
      </div>
      <a href="#contact" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-semibold text-sm backdrop-blur-md">
        Hire Me
      </a>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="h-screen w-full flex items-center px-6 md:px-20 relative overflow-hidden">
      <div className="w-full md:w-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-10 bg-accent"></span>
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">Welcome to my universe</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-orbitron font-black leading-tight mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent text-glow">Yash</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
            AI & Web Developer <br/>
            <span className="text-gray-400 text-lg">Building next-gen digital experiences with React, Three.js, and Modern AI.</span>
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-secondary to-primary font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              View Projects
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6 md:px-20 relative flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

        <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          About Me
        </h2>
        
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            I am a passionate <strong className="text-white">Student Developer</strong> and <strong className="text-white">AI Enthusiast</strong> with a drive for building immersive web applications and intelligent systems.
          </p>
          <p>
            My journey bridges the gap between creative frontend design and powerful backend logic. I specialize in the <strong className="text-accent">MERN Stack</strong>, <strong className="text-accent">Three.js</strong> 3D environments, and cutting-edge <strong className="text-secondary">AI/ML models</strong>.
          </p>
          <p>
            With active participation in hackathons and a constant hunger for learning, I aim to create digital solutions that are not just functional, but visually stunning and intuitive.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400"><Code2 /></div>
            <div>
              <h4 className="font-bold text-white">Frontend</h4>
              <p className="text-xs text-gray-400">React, Three.js</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/20 text-green-400"><Database /></div>
            <div>
              <h4 className="font-bold text-white">Backend</h4>
              <p className="text-xs text-gray-400">Node, SQL</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400"><Brain /></div>
            <div>
              <h4 className="font-bold text-white">AI / ML</h4>
              <p className="text-xs text-gray-400">PyTorch, Python</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 shadow-lg text-accent">
          {category.icon}
        </div>
        <h3 className="text-xl font-orbitron font-bold">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <span 
            key={i} 
            className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-accent/50 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const categories: SkillCategory[] = [
    {
      title: "Frontend & UI",
      icon: <Layers size={24} />,
      skills: ["React (Advanced)", "TypeScript", "Tailwind CSS", "Three.js / R3F", "Framer Motion", "Figma"]
    },
    {
      title: "Backend & DevOps",
      icon: <Terminal size={24} />,
      skills: ["Node.js", "Express", "SQL (Postgres)", "NoSQL (Mongo)", "Docker", "Git / GitHub"]
    },
    {
      title: "AI & Machine Learning",
      icon: <Cpu size={24} />,
      skills: ["Python (Advanced)", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Data Analysis"]
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-6 md:px-20 flex flex-col justify-center">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-orbitron font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500"
      >
        Technical Arsenal
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {categories.map((cat, idx) => (
          <SkillCard key={idx} category={cat} index={idx} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="group relative h-[400px] w-full perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100 duration-500"></div>
      
      <div className="h-full w-full glass-card rounded-2xl p-8 flex flex-col justify-between relative z-10 overflow-hidden group-hover:border-accent/30 transition-colors">
        <div>
          <h3 className="text-2xl font-orbitron font-bold mb-4 text-white group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-black/30 text-gray-300 border border-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-semibold"
        >
          <Github size={18} /> View Code
        </a>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "3D Portfolio Website",
      desc: "An immersive personal portfolio built with React Three Fiber, featuring 3D interactive elements, glassmorphism UI, and smooth physics-based animations.",
      tech: ["React", "Three.js", "R3F", "Tailwind", "Framer Motion"],
      link: "https://github.com/codewithyash28"
    },
    {
      title: "AI Study Helper",
      desc: "An intelligent platform that uses NLP to generate flashcards, summaries, and quizzes from lecture notes, helping students learn more efficiently.",
      tech: ["Python", "OpenAI API", "React", "Node.js", "MongoDB"],
      link: "https://github.com/codewithyash28"
    },
    {
      title: "Neon E-Commerce",
      desc: "A futuristic shopping experience with real-time inventory management, 3D product previews, and a seamless checkout process.",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
      link: "https://github.com/codewithyash28"
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-6 md:px-20 relative">
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-dark/90 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-white">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            A selection of my recent work in web development and artificial intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-[80vh] py-20 px-6 md:px-20 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 z-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-6 leading-tight">
            Let's Build <br/> The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Future</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Whether you have a project in mind, need a full-stack developer, or just want to chat about AI tech, I'm always open to new opportunities.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/50 transition-colors">
                <Mail className="text-gray-300 group-hover:text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Email</span>
                <a href="mailto:codewithyash28@gmail.com" className="text-white hover:text-accent transition-colors">codewithyash28@gmail.com</a>
                <a href="mailto:codewithyash28@outlook.com" className="text-sm text-gray-400 hover:text-accent transition-colors">codewithyash28@outlook.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                <Smartphone className="text-gray-300 group-hover:text-purple-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Phone</span>
                <span className="text-white">7758844409</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-colors">
                <Github className="text-gray-300 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Social</span>
                <a href="https://github.com/codewithyash28" target="_blank" rel="noreferrer" className="text-white hover:text-accent transition-colors">
                  github.com/codewithyash28
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border-t border-l border-white/10 border-b-4 border-r-4 border-b-black/50 border-r-black/50">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Tell me about your project..."></textarea>
            </div>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-secondary to-accent font-bold text-white shadow-lg hover:shadow-accent/30 transition-shadow">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#030014] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="text-xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent animate-pulse">
        LOADING SYSTEM
      </div>
    </div>
  );
};

// --- AI Chatbot Component ---

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    {role: 'model', text: "System Online. I am Yash's AI Assistant. How can I help you explore this universe?"}
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `You are an intelligent AI assistant for Yash's personal portfolio website. 
      Yash is a skilled AI & Web Developer proficient in React, Three.js, Node.js, Python, and the MERN Stack.
      
      Key Information:
      - Skills: Frontend (React, Tailwind, Three.js), Backend (Node, SQL, NoSQL), AI/ML (PyTorch, Python).
      - Projects: '3D Portfolio Website' (Immersive, React Three Fiber), 'AI Study Helper' (NLP, Flashcards), 'Neon E-Commerce'.
      - Contact: codewithyash28@gmail.com, Phone: 7758844409.
      
      Your personality: Futuristic, professional, concise, and helpful. Use space/tech metaphors occasionally (e.g., "Scanning database...", "Trajectory aligned").
      Answer questions about Yash's background, skills, and contact info. If asked about something unrelated, politely steer back to Yash's portfolio.`;

      // Create Chat Session
      // We pass the history excluding the very last message we just added locally, 
      // but simpler is to pass the current state history and then send the new message.
      const history = messages.map(m => ({ 
        role: m.role, 
        parts: [{ text: m.text }] 
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: { systemInstruction },
        history: history
      });

      const result = await chat.sendMessage({ message: userText });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error: Neural link disrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-secondary to-accent shadow-[0_0_20px_rgba(168,85,247,0.5)] text-white hover:scale-110 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] glass-card rounded-2xl flex flex-col overflow-hidden border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-accent to-secondary">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-white text-sm">AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-secondary to-primary text-white rounded-tr-none' 
                        : 'bg-white/10 border border-white/5 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-black/20 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Yash..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors placeholder-gray-500"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="p-2 rounded-xl bg-accent/20 text-accent border border-accent/50 hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- App Root ---

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading heavy 3D assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-dark text-white min-h-screen selection:bg-accent selection:text-black">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <BackgroundScene />
          <Navbar />
          
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          <ChatBot />

          <footer className="py-8 text-center text-gray-600 text-sm glass-card border-none bg-black/80">
            <p>© {new Date().getFullYear()} Yash. Built with React & Three.js</p>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}