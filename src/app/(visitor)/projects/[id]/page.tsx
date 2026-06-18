import dbConnect from '@/lib/dbConnect';
export const dynamic = 'force-dynamic';
import Project from '@/models/Project';
import Analytics from '@/models/Analytics';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Code, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  await dbConnect();
  const project = await Project.findById(id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  await dbConnect();

  const project = await Project.findById(id);
  if (!project) {
    notFound();
  }

  // Log page view in background analytics
  try {
    await Analytics.create({
      eventType: 'pageview',
      target: `/projects/${id}`,
    });
  } catch (e) {
    // Fail silently in dev
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      <span className="glow-glow glow-orange w-[500px] h-[500px] -right-32 -top-32 opacity-10"></span>

      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 text-sm font-semibold group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </Link>

      {/* Header Container */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/5 mb-12">
        <div className="space-y-4 max-w-3xl">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 border border-primary/15 px-3.5 py-1 rounded-full">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
            {project.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-black bg-white hover:bg-zinc-200 px-6 py-3.5 rounded-full flex items-center gap-1.5 transition-all shadow-lg shadow-white/5"
            >
              Live Demo <ArrowUpRight size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-white bg-zinc-950 border border-white/10 hover:bg-zinc-900 px-6 py-3.5 rounded-full flex items-center gap-1.5 transition-all"
            >
              GitHub Repository
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block align-middle ml-1">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Bento Layout content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column (Main details) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Screenshot / Cover */}
          <div className="glass-panel rounded-3xl overflow-hidden aspect-video bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bento Case Study blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Challenge */}
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-primary">
                <Zap size={20} />
                <h3 className="text-xl font-bold text-white tracking-tight">The Challenge</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {project.problem || 'Define the operational roadblocks or technical issues that this platform was created to resolve.'}
              </p>
            </div>

            {/* Solution */}
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-primary">
                <Code size={20} />
                <h3 className="text-xl font-bold text-white tracking-tight">The Solution</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {project.solution || 'Explain the code architecture, data pipeline, and UX design selection engineered to handle the problem.'}
              </p>
            </div>

            {/* Results */}
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden space-y-4 md:col-span-2">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle size={20} />
                <h3 className="text-xl font-bold text-white tracking-tight">Results & Outcome</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {project.results || 'Highlight key speed improvements, efficiency gains, sales logs, or customer conversion rates achieved.'}
              </p>
            </div>

          </div>

          {/* Screenshot Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Project Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.galleryImages.map((img: string, idx: number) => (
                  <div key={idx} className="glass-panel rounded-2xl overflow-hidden aspect-video bg-zinc-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.title} screen ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column (Metadata & tech) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Tech Stack widget */}
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight pb-3 border-b border-white/5">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs font-semibold text-zinc-300 bg-zinc-900 border border-white/5 px-3 py-1.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Summary stats card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight pb-3 border-b border-white/5">
              Project Information
            </h3>
            <div className="space-y-3.5 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase tracking-wider">Client Category</span>
                <span className="text-zinc-300">{project.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase tracking-wider">Status</span>
                <span className="text-green-400">Completed & Deployed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase tracking-wider">Repository</span>
                <span className="text-zinc-300">{project.githubUrl ? 'Public' : 'Private'}</span>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
