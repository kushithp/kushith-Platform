'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  coverImage: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  category,
  technologies,
  coverImage,
  featured = false,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`glass-panel rounded-3xl overflow-hidden group transition-all duration-500 hover:border-white/10 ${
        featured ? 'md:col-span-2 flex flex-col md:flex-row' : 'flex flex-col'
      }`}
    >
      {/* Cover Image Container */}
      <div className={`relative overflow-hidden bg-zinc-950 ${
        featured ? 'md:w-1/2 aspect-video md:aspect-auto min-h-[250px]' : 'aspect-video'
      }`}>
        {/* Hover zoom cover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Details Container */}
      <div className={`p-8 flex flex-col justify-between flex-1 ${
        featured ? 'md:w-1/2' : ''
      }`}>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
            {description}
          </p>

          {/* Technology Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-semibold text-zinc-400 bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          <Link
            href={`/projects/${id}`}
            className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 border border-white/10 px-3.5 py-2 rounded-full transition-all"
          >
            Case Study
          </Link>
          
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-black bg-white hover:bg-zinc-200 px-3.5 py-2 rounded-full flex items-center gap-1 transition-all"
            >
              Demo <ArrowUpRight size={14} />
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-auto"
              title="GitHub Repo"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
