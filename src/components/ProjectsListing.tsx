'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  coverImage: string;
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
}

interface ProjectsListingProps {
  initialProjects: Project[];
}

export default function ProjectsListing({ initialProjects }: ProjectsListingProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  // Extract unique categories for filter dropdown
  const categories = ['All', ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  // Filtering logic
  const filtered = initialProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = category === 'All' || project.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'az') return a.title.localeCompare(b.title);
    if (sort === 'za') return b.title.localeCompare(a.title);
    if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0; // Default Mongo sort order
  });

  return (
    <div className="space-y-12">
      {/* Controls Container */}
      <div className="glass-panel p-5 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search size={18} className="absolute left-4 top-3.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, tech stack..."
            className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-zinc-950 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none transition-colors appearance-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="md:col-span-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-zinc-950 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none transition-colors appearance-none"
          >
            <option value="default">Sort: Default</option>
            <option value="featured">Sort: Featured First</option>
            <option value="az">Sort: Alphabetical (A-Z)</option>
            <option value="za">Sort: Alphabetical (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Grid of Results */}
      {sorted.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {sorted.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project._id}
              >
                <ProjectCard
                  id={project._id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  technologies={project.technologies}
                  coverImage={project.coverImage}
                  featured={project.featured}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-zinc-950/20 border border-dashed border-white/5 rounded-3xl">
          <SlidersHorizontal size={36} className="text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-sm text-zinc-500">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}
