'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillCard from './SkillCard';

interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming Languages' | 'DevOps' | 'Cloud' | 'AI' | 'Tools';
  progress: number;
  icon: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'Programming Languages',
    'DevOps',
    'Tools',
  ];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-semibold px-4.5 py-2.5 rounded-full border transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gradient-orange-red border-transparent text-black shadow-lg shadow-primary/10'
                : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Skill Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={skill._id}
            >
              <SkillCard
                name={skill.name}
                category={skill.category}
                progress={skill.progress}
                icon={skill.icon}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
