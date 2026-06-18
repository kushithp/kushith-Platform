import dbConnect from '@/lib/dbConnect';
export const dynamic = 'force-dynamic';
import Project from '@/models/Project';
import ProjectsListing from '@/components/ProjectsListing';

export const metadata = {
  title: 'Portfolio Projects | Kushith - Full Stack Developer',
  description: 'Explore a detailed portfolio of custom web applications, SaaS dashboards, automation pipelines, and software tools built by Kushith.',
};

export default async function ProjectsPage() {
  await dbConnect();

  // Fetch all projects sorted by display order
  const projects = await Project.find({}).sort({ displayOrder: 1 });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      <span className="glow-glow glow-orange w-[500px] h-[500px] -left-32 -top-32 opacity-10"></span>

      {/* Page Header */}
      <div className="max-w-2xl space-y-4 mb-16">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">My Workspace</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
          Portfolio Projects
        </h1>
        <p className="text-zinc-500 text-sm md:text-base font-medium">
          A deep dive into the systems, dashboards, and custom integrations I have built to solve real-world problems. Use the controls below to filter by category or technologies.
        </p>
      </div>

      {/* Project Listings component */}
      <ProjectsListing initialProjects={JSON.parse(JSON.stringify(projects))} />
    </div>
  );
}
