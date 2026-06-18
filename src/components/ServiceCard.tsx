'use client';

import { motion } from 'framer-motion';
import Icon from './Icon';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="glass-panel p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:bg-zinc-950 hover:border-primary/20"
    >
      {/* Glow Effect */}
      <span className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></span>

      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-105 group-hover:border-primary/20 transition-all duration-300 shadow-inner">
        <Icon name={icon} size={24} />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed font-medium">
        {description}
      </p>

      {/* Decorative arrow on hover */}
      <div className="absolute bottom-6 right-6 text-zinc-600 group-hover:text-primary transition-colors duration-300">
        <svg
          className="w-5 h-5 transform translate-y-2 translate-x-2 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </motion.div>
  );
}
