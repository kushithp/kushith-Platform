import dbConnect from '@/lib/dbConnect';
export const dynamic = 'force-dynamic';
import Personal from '@/models/Personal';
import Education from '@/models/Education';
import Skill from '@/models/Skill';
import Service from '@/models/Service';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Testimonial from '@/models/Testimonial';

import Hero from '@/components/Hero';
import SkillsSection from '@/components/SkillsSection';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ContactForm from '@/components/ContactForm';
import CalendlyWidget from '@/components/CalendlyWidget';

import { seedDatabase } from '@/lib/seed';
import { Briefcase, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  await dbConnect();

  let personal = await Personal.findOne({});
  if (!personal) {
    // Automatically seed database if empty
    await seedDatabase();
    personal = await Personal.findOne({});
  }

  const education = await Education.find({});
  const skills = await Skill.find({});
  const services = await Service.find({});
  const projects = await Project.find({ featured: true }).sort({ displayOrder: 1 });
  const experiences = await Experience.find({});
  const testimonials = await Testimonial.find({});

  return (
    <div className="space-y-32">
      {/* Hero */}
      <Hero />

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 scroll-mt-24 relative">
        <span className="glow-glow glow-orange w-[400px] h-[400px] -right-20 top-10 opacity-5"></span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              A Development Journey <br /> Driven by Curiosity
            </h2>
            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">
              Based in Karnataka, India
            </p>
          </div>
          <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-3xl space-y-6">
            <p className="text-zinc-300 text-base leading-relaxed font-medium">
              As a Computer Science Engineering student and active full-stack freelancer, I bridge the gap between academic theory and production-grade product delivery. I started coding to build apps that people use daily, and that drive has evolved into a freelance career helping businesses grow.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              I specialize in creating custom SaaS dash layouts, database routing schemas, background automation workers, and clean interfaces that simplify complex tasks. My core focus is writing readable, scalable code and deploying robust systems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-sm text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Custom SaaS & Web Apps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Automation Workflow Scripts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Clean API Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>Database Administration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">My Services</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How I Can Help Your Business
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium">
            From architecture to deployment, I build robust systems optimized for performance, conversion, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service._id.toString()}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Featured Work</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Selected Projects
            </h2>
            <p className="text-zinc-500 text-sm font-medium max-w-md">
              A curated showcase of applications built to solve operational constraints and drive real business values.
            </p>
          </div>
          <Link
            href="/projects"
            className="group font-bold text-white text-sm bg-zinc-950 border border-white/10 hover:bg-zinc-900 px-6 py-3.5 rounded-full flex items-center gap-2 transition-all self-start md:self-auto"
          >
            Explore All Projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project._id.toString()}
              id={project._id.toString()}
              title={project.title}
              description={project.description}
              category={project.category}
              technologies={project.technologies}
              coverImage={project.coverImage}
              featured={project.featured}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">My Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Professional Skill Set
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium">
            I continuously update my stack with modern frameworks and programming tools to ensure code standard consistency.
          </p>
        </div>

        <SkillsSection skills={JSON.parse(JSON.stringify(skills))} />
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Work Experience */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Briefcase size={20} />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Work Experience</h2>
            </div>

            <div className="space-y-6 border-l border-white/5 pl-6 ml-5">
              {experiences.map((exp, idx) => (
                <div key={exp._id.toString()} className="relative space-y-3 pb-8">
                  {/* Timeline point indicator */}
                  <span className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-primary border-4 border-black box-content"></span>
                  
                  <div>
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary" /> {exp.duration}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-1">
                      {exp.position}
                    </h3>
                    <p className="text-zinc-400 text-sm font-semibold">{exp.organization}</p>
                  </div>

                  <ul className="space-y-1.5 text-xs text-zinc-500 list-disc list-inside">
                    {exp.responsibilities.map((resp: string, rIdx: number) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.achievements.map((ach: string, aIdx: number) => (
                      <span key={aIdx} className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/15 px-2 py-0.5 rounded-full">
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <GraduationCap size={20} />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Education</h2>
            </div>

            <div className="space-y-6 border-l border-white/5 pl-6 ml-5">
              {education.map((edu, idx) => (
                <div key={edu._id.toString()} className="relative space-y-3 pb-8">
                  <span className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-primary border-4 border-black box-content"></span>
                  
                  <div>
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary" /> {edu.duration}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-1">
                      {edu.degree}
                    </h3>
                    <p className="text-zinc-400 text-sm font-semibold">
                      {edu.department}
                    </p>
                    <p className="text-zinc-500 text-xs font-medium mt-0.5">{edu.institutionName}</p>
                  </div>

                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                    {edu.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-black bg-white px-2.5 py-1 rounded-full">
                      CGPA: {edu.CGPA}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Client Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            What People Say About My Work
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Read direct feedback from clients, founders, and technical directors I have worked with.
          </p>
        </div>

        <TestimonialCarousel testimonials={JSON.parse(JSON.stringify(testimonials))} />
      </section>

      {/* Contact & Scheduling Booking */}
      <section id="contact" className="max-w-7xl mx-auto px-6 scroll-mt-24 pb-20">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Let's Connect</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Start a Project Together
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Submit your product brief below to request a budget estimate, or book a free 15-minute introductory consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
          <div className="lg:col-span-6 h-full">
            <CalendlyWidget />
          </div>
        </div>
      </section>
    </div>
  );
}
