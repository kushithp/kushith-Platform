'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Code2, Award, Briefcase, HeartHandshake } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const strings = ['Custom Web Apps', 'SaaS Platforms', 'Admin Dashboards', 'Automation Systems'];
  const [stringIdx, setStringIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeString = strings[stringIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeString.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText(activeString.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, 100);
    }

    if (!isDeleting && charIdx === activeString.length) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setStringIdx((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, stringIdx]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-12 px-6 overflow-hidden">
      {/* Background radial glows */}
      <span className="glow-glow glow-orange w-[500px] h-[500px] -top-32 -left-32 opacity-10 animate-pulse-glow"></span>
      <span className="glow-glow glow-red w-[500px] h-[500px] -bottom-32 -right-32 opacity-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></span>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left copy text block */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Available for Freelance Projects
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]"
            >
              I Build Modern <br className="hidden sm:inline" />
              <span className="text-gradient">Web Applications</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-zinc-400 min-h-[40px]"
            >
              Solving problems with <span className="text-primary font-mono">{typedText}</span>
              <span className="animate-pulse text-primary font-mono">|</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Full Stack Developer specializing in custom dashboards, multi-tenant SaaS structures, automated background operations, and highly responsive digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <Link
              href="#contact"
              className="group text-sm font-bold text-black bg-gradient-orange-red px-7 py-4 rounded-full flex items-center gap-1.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
            >
              Hire Me
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projects"
              className="text-sm font-bold text-white bg-zinc-950 border border-white/10 hover:bg-zinc-900 px-7 py-4 rounded-full transition-all duration-300"
            >
              View Projects
            </Link>
            <a
              href="/api/resume/download"
              className="text-sm font-bold text-zinc-400 hover:text-white px-5 py-4 rounded-full transition-all"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right graphic/photo block (Bento elements) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-2 glass-panel p-6 rounded-3xl relative overflow-hidden group aspect-square sm:aspect-auto sm:h-80"
          >
            {/* Background profile image wrapper */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Kushith"
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Bottom blur text */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-12">
              <span className="text-primary font-bold text-xs uppercase tracking-wider">Engineering Student</span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">Kushith</h3>
              <p className="text-zinc-500 text-xs font-semibold mt-0.5">Full Stack Web Developer</p>
            </div>
          </motion.div>

          {/* Stats Cell 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="glass-panel p-6 rounded-3xl flex flex-col justify-between"
          >
            <div className="text-primary bg-primary/10 w-9 h-9 rounded-xl flex items-center justify-center mb-4 border border-primary/25">
              <Briefcase size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Completed</p>
              <h4 className="text-3xl font-black text-white mt-1">12+</h4>
              <p className="text-[11px] font-semibold text-zinc-600 mt-1">Ready Projects</p>
            </div>
          </motion.div>

          {/* Stats Cell 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="glass-panel p-6 rounded-3xl flex flex-col justify-between"
          >
            <div className="text-primary bg-primary/10 w-9 h-9 rounded-xl flex items-center justify-center mb-4 border border-primary/25">
              <Code2 size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Tech Stack</p>
              <h4 className="text-3xl font-black text-white mt-1">15+</h4>
              <p className="text-[11px] font-semibold text-zinc-600 mt-1">Modern Tools</p>
            </div>
          </motion.div>

          {/* Stats Cell 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="glass-panel p-6 rounded-3xl flex flex-col justify-between"
          >
            <div className="text-primary bg-primary/10 w-9 h-9 rounded-xl flex items-center justify-center mb-4 border border-primary/25">
              <Award size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Academics</p>
              <h4 className="text-3xl font-black text-white mt-1">8.5</h4>
              <p className="text-[11px] font-semibold text-zinc-600 mt-1">VTU B.E. CGPA</p>
            </div>
          </motion.div>

          {/* Stats Cell 4 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="glass-panel p-6 rounded-3xl flex flex-col justify-between"
          >
            <div className="text-primary bg-primary/10 w-9 h-9 rounded-xl flex items-center justify-center mb-4 border border-primary/25">
              <HeartHandshake size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Client Rate</p>
              <h4 className="text-3xl font-black text-white mt-1">100%</h4>
              <p className="text-[11px] font-semibold text-zinc-600 mt-1">Satisfaction</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
