'use client';

import { motion } from 'framer-motion';
import Icon from './Icon';

interface SkillCardProps {
  name: string;
  category: string;
  progress: number;
  icon: string;
}

export default function SkillCard({ name, progress, icon }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-5 rounded-2xl flex flex-col justify-between min-h-[120px] transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/40 group relative overflow-hidden"
    >
      {/* Background glow hover */}
      <span className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></span>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon name={icon} size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-white group-hover:text-primary transition-colors text-sm">{name}</h4>
          <span className="text-xs text-zinc-500 font-medium">Expertise</span>
        </div>
        <span className="ml-auto text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{progress}%</span>
      </div>

      <div className="mt-4">
        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            className="h-full bg-gradient-orange-red rounded-full"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
}
