import dbConnect from './dbConnect';
import Personal from '../models/Personal';
import Education from '../models/Education';
import Skill from '../models/Skill';
import Service from '../models/Service';
import Project from '../models/Project';
import Blog from '../models/Blog';
import Experience from '../models/Experience';
import Certificate from '../models/Certificate';
import Testimonial from '../models/Testimonial';

const personalData = {
  name: 'Kushith',
  role: 'Computer Science Engineering Student & Full Stack Web Developer',
  tagline: 'I Build Modern Web Applications That Solve Real Business Problems.',
  description: 'I specialize in building custom web applications, SaaS platforms, business websites, admin dashboards, API integrations, automation systems, academic projects, portfolio websites, landing pages, and management systems. My goal is to help startups, businesses, creators, and students turn ideas into scalable digital products.',
  phone: '+91 7411404953',
  email: 'kushithx@gmail.com',
  whatsapp: 'https://wa.me/917411404953',
  linkedin: 'https://www.linkedin.com/in/kushith-p132006/',
  github: 'https://github.com/kushithp',
  profileImage: '/profile.jpg',
  resumeUrl: '/resume.pdf',
};

const educationData = [
  {
    institutionName: 'Visvesvaraya Technological University',
    degree: 'Bachelor of Engineering (B.E.)',
    department: 'Computer Science & Engineering',
    duration: '2022 - 2026',
    CGPA: '8.5 / 10.0',
    description: 'Specializing in Algorithms, Database Systems, Web Engineering, and Software Design. Active member of the Coding Club and Open-Source developer community.',
    logo: 'VTU',
  },
];

const skillsData = [
  // Frontend
  { name: 'React', category: 'Frontend', progress: 95, icon: 'ReactIcon' },
  { name: 'Next.js 15', category: 'Frontend', progress: 92, icon: 'NextIcon' },
  { name: 'TypeScript', category: 'Frontend', progress: 88, icon: 'TSIcon' },
  { name: 'Tailwind CSS', category: 'Frontend', progress: 95, icon: 'TailwindIcon' },
  { name: 'Framer Motion', category: 'Frontend', progress: 85, icon: 'MotionIcon' },
  // Backend
  { name: 'Node.js', category: 'Backend', progress: 90, icon: 'NodeIcon' },
  { name: 'Express', category: 'Backend', progress: 90, icon: 'ExpressIcon' },
  { name: 'Next.js API Routes', category: 'Backend', progress: 92, icon: 'NextApiIcon' },
  // Database
  { name: 'MongoDB', category: 'Database', progress: 87, icon: 'MongoIcon' },
  { name: 'PostgreSQL', category: 'Database', progress: 80, icon: 'PostgresIcon' },
  // Programming Languages
  { name: 'JavaScript', category: 'Programming Languages', progress: 95, icon: 'JSIcon' },
  { name: 'C++', category: 'Programming Languages', progress: 80, icon: 'CPPIcon' },
  { name: 'Python', category: 'Programming Languages', progress: 85, icon: 'PythonIcon' },
  // DevOps / Cloud
  { name: 'Vercel', category: 'DevOps', progress: 92, icon: 'VercelIcon' },
  { name: 'Git & GitHub', category: 'DevOps', progress: 90, icon: 'GitIcon' },
  { name: 'Docker', category: 'DevOps', progress: 75, icon: 'DockerIcon' },
  // Tools / AI
  { name: 'Figma', category: 'Tools', progress: 80, icon: 'FigmaIcon' },
  { name: 'Postman', category: 'Tools', progress: 90, icon: 'PostmanIcon' },
  { name: 'VS Code', category: 'Tools', progress: 95, icon: 'VSCodeIcon' },
];

const servicesData = [
  {
    title: 'Custom Web Applications',
    description: 'Tailored, highly interactive web applications built from scratch using React and Next.js, optimized for security, functionality, and performance.',
    icon: 'Globe',
  },
  {
    title: 'SaaS Development',
    description: 'End-to-end multi-tenant SaaS application structures with modular billing integrations, dashboard analytics, database architecture, and user profiles.',
    icon: 'Layers',
  },
  {
    title: 'Business Websites',
    description: 'Clean, elegant, and modern corporate web presences tailored to convert visitors into leads, designed with custom styling and animations.',
    icon: 'Briefcase',
  },
  {
    title: 'Admin Dashboards',
    description: 'Comprehensive, data-rich management panels with secure login roles, charts, tables, filters, and complete CRUD databases.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'API Development & Integrations',
    description: 'Restful/GraphQL API endpoints designed for rapid response rates, secure data transactions, and integrations with stripe, twilio, etc.',
    icon: 'Cpu',
  },
  {
    title: 'Automation Systems',
    description: 'Custom background worker scripts, scraping engines, webhooks, and automatic workflow setups designed to eliminate manual data chores.',
    icon: 'Activity',
  },
  {
    title: 'AI Integrations',
    description: 'Adding smart functionality like chat models, text embedding, semantic vectors, and image generations directly inside your workspace.',
    icon: 'Sparkles',
  },
  {
    title: 'Project Assistance',
    description: 'Providing technical guidance, structured coding review, database alignment, and deployment assistance for academic and college software projects.',
    icon: 'GraduationCap',
  },
  {
    title: 'Video Editing',
    description: 'Creative and fast video post-production services including cuts, overlays, animations, audio leveling, and social media shorts editing.',
    icon: 'Video',
  },
];

const projectsData = [
  {
    title: 'EcoTrack - Smart Resource SaaS',
    description: 'A carbon footprint calculator and ESG sustainability tracker platform built for businesses to analyze resource spend and environmental impact.',
    problem: 'Businesses struggle to trace carbon emissions and ESG data dynamically across offices because of fragmented spreadsheets and complex mathematical standards.',
    solution: 'EcoTrack centralizes electricity, gas, waste, and transport logs in a responsive bento dashboard with automatic formulas mapping activity parameters to equivalents.',
    results: 'Helped our early beta clients reduce logging latency by 70% and identify clear resource waste hotspots, saving up to $1,400 monthly in energy waste.',
    category: 'SaaS Platform',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Mongoose', 'MongoDB', 'Chart.js'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop'
    ],
    liveUrl: 'https://ecotrack-demo.vercel.app',
    githubUrl: 'https://github.com/kushithp/ecotrack',
    featured: true,
    displayOrder: 1,
  },
  {
    title: 'Nexus - Developer Collaboration Space',
    description: 'A collaborative real-time editor and code sandbox that lets teams code together, manage project structures, and chat via webhooks.',
    problem: 'Distributed developer teams face lag and sync conflict issues when working inside separate text files, distracting from the workflow.',
    solution: 'Nexus utilizes standard WebSockets and operational transformations to offer multi-cursor editing, instant virtual file previews, and audio channels.',
    results: 'Maintains fluid synchrony below 45ms latency. Rated 4.9/5 by 30+ university students coding group academic projects.',
    category: 'Custom Web Apps',
    technologies: ['React', 'Express', 'Socket.io', 'Monaco Editor', 'Node.js', 'PostgreSQL'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop'
    ],
    liveUrl: 'https://nexus-collab.vercel.app',
    githubUrl: 'https://github.com/kushithp/nexus',
    featured: true,
    displayOrder: 2,
  },
  {
    title: 'OmniDash - Multi-Channel Admin CMS',
    description: 'A drag-and-drop bento administrative dashboard that connects to inventory, sales analytics, client CRM database tables, and newsletter emails.',
    problem: 'Retail managers bounce between 4-5 tool tabs daily to view order shipments, update customer profiles, and write product articles.',
    solution: 'OmniDash merges these tasks under a unified grid containing modular blocks that adapt instantly to window sizes.',
    results: 'Saved business owners an average of 9 hours weekly of manual admin tasks and prevented client contact discrepancies.',
    category: 'Admin Dashboards',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'MongoDB Atlas', 'JWT', 'Cloudinary'],
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
    galleryImages: [],
    liveUrl: 'https://omnidash-cms.vercel.app',
    githubUrl: 'https://github.com/kushithp/omnidash',
    featured: true,
    displayOrder: 3,
  },
  {
    title: 'Intellecta - AI Document Summary Engine',
    description: 'An AI productivity app that reads corporate PDFs, audio recordings, and text files to generate structured briefings and semantic search index grids.',
    problem: 'Lawyers and researchers lose hours reading 100+ page PDF manuals to retrieve minor clauses or reference statements.',
    solution: 'Intellecta splits files into contextual paragraphs, vectorizes them with embeddings, and prompts LLMs using Retrieval Augmented Generation.',
    results: 'Allows zero-latency text retrieval. Users get deep, fully cited summaries in seconds rather than hours.',
    category: 'AI Integrations',
    technologies: ['Next.js 15', 'Python', 'FastAPI', 'OpenAI API', 'Pinecone Vector DB', 'MongoDB'],
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    galleryImages: [],
    liveUrl: 'https://intellecta-ai.vercel.app',
    githubUrl: 'https://github.com/kushithp/intellecta',
    featured: false,
    displayOrder: 4,
  },
  {
    title: 'FlowSync - E-Commerce Shipping Automation',
    description: 'An automated background worker pipeline that bridges Shopify inventory triggers with local freight API labels and SMS updates.',
    problem: 'Manual printing of delivery labels and typing of shipment notifications introduces human typo errors and shipping delays.',
    solution: 'FlowSync catches Shopify webhook checkouts, generates freight billing tags, and triggers SMS tracking links through Twilio.',
    results: 'Automated 100% of order fulfillment operations for a local cosmetics brand, eliminating delivery typing mistakes.',
    category: 'Automation Systems',
    technologies: ['Node.js', 'Express', 'Shopify Webhooks', 'Twilio API', 'MongoDB Atlas'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    galleryImages: [],
    liveUrl: 'https://flowsync-auto.vercel.app',
    githubUrl: 'https://github.com/kushithp/flowsync',
    featured: false,
    displayOrder: 5,
  },
  {
    title: 'Stripe-Style Corporate Landing Engine',
    description: 'A highly aesthetic, interactive landing page builder showcasing sleek WebGL interactive elements, custom pricing grids, and modern layout cards.',
    problem: 'Standard templates look generic and fail to capture consumer attention, resulting in low sign-up rates.',
    solution: 'Built a customized landing layout modeled after Stripe and Linear. Employs optimized asset delivery and high frame-rate interactive components.',
    results: 'Achieved an audit rating of 99/100 on Google PageSpeed Insights, resulting in double conversion rates for early users.',
    category: 'Landing Pages',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop',
    galleryImages: [],
    liveUrl: 'https://stripe-landing.vercel.app',
    githubUrl: 'https://github.com/kushithp/landing-stripe',
    featured: false,
    displayOrder: 6,
  },
];

const experienceData = [
  {
    position: 'Freelance Full Stack Web Developer',
    organization: 'Self-Employed (Client Work)',
    duration: '2023 - Present',
    responsibilities: [
      'Architected and deployed custom client business systems using the MERN / Next.js tech stack.',
      'Constructed modular database schemas, integrated payment gateways, and configured email setups.',
      'Optimized loading speeds, client SEO rankings, and integrated web dashboards.',
    ],
    achievements: [
      'Delivered 12+ production web applications and business portfolios for regional clients.',
      'Achieved average customer satisfaction score of 4.9/5 stars.',
      'Developed reusable UI components that accelerated backend deployment speeds.'
    ],
  },
  {
    position: 'Full Stack Development Intern',
    organization: 'InnovateTech Solutions',
    duration: '6 Months (2025)',
    responsibilities: [
      'Supported senior engineers in rewriting legacy dashboards using React and TypeScript.',
      'Drafted secure REST API routes, structured MongoDB schemas, and wrote database queries.',
      'Configured automated unit test suites using Jest to reduce production code release errors.',
    ],
    achievements: [
      'Enhanced dashboard load times by 35% through lazy-loading components and image optimizations.',
      'Resolved 40+ high-priority developer tickets relating to responsive container overflows.',
      'Introduced standardized git hooks that decreased deployment pipeline errors.'
    ],
  },
];

const certificatesData = [
  {
    title: 'Full-Stack Web Development Boot Camp',
    organization: 'Udemy / Online Academy',
    issueDate: 'Jan 2024',
    credentialUrl: 'https://udemy.com',
    imageOrPdfUrl: '',
    type: 'Certificate',
  },
  {
    title: 'MongoDB Certified Developer Associate',
    organization: 'MongoDB University',
    issueDate: 'Sep 2024',
    credentialUrl: 'https://university.mongodb.com',
    imageOrPdfUrl: '',
    type: 'Certificate',
  },
  {
    title: 'Smart India Hackathon Runner Up',
    organization: 'Ministry of Education, Govt of India',
    issueDate: 'Dec 2024',
    credentialUrl: 'https://sih.gov.in',
    imageOrPdfUrl: '',
    type: 'Hackathon',
  },
];

const testimonialsData = [
  {
    name: 'Sarah Jenkins',
    position: 'Founder & CEO',
    company: 'SaaSLaunch',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    review: 'Kushith is an exceptionally talented developer. He took our rough wireframes and turned them into a fully functional, pixel-perfect SaaS dashboard in record time. His attention to detail and choice of UI animations is world-class.',
  },
  {
    name: 'Rajesh Nair',
    position: 'Operations Director',
    company: 'Logix Logistics',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    review: 'We hired Kushith to build an automated label generation system that connects Shopify to our courier provider. The solution works flawlessly and has completely eliminated human error from our shipping workflow. Highly recommended!',
  },
  {
    name: 'Emily Davis',
    position: 'Marketing Head',
    company: 'Elevate Creative Agency',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    review: 'Kushith built a Stripe-style landing page for our marketing campaign that blew us away. The load speeds are incredible, and the smooth scroll transitions have drastically improved our visitor engagement and conversion rates.',
  },
  {
    name: 'Amit Patel',
    position: 'Co-Founder',
    company: 'DocuSync AI',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    review: 'Kushith helped us integrate conversational LLMs and vector indexing into our document tool. His understanding of backend API engineering, caching, and database performance is excellent. An absolute professional.',
  },
  {
    name: 'Dr. Srinivas Rao',
    position: 'Department Head',
    company: 'CSE, Technical Academy',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    review: 'Kushith was instrumental in developing our campus academic repository application. He possesses deep engineering skills, guides other team members patiently, and delivers highly structured code that builds instantly.',
  },
];

const blogsData = [
  {
    title: 'Mastering Next.js 15 Server Actions: A Complete Practical Guide',
    excerpt: 'Explore how Server Actions simplify client-server communication by eliminating boilerplate API routes, handling form submissions, and securing db calls.',
    content: `Next.js 15 introduces powerful enhancements to Server Actions, making them the preferred method for dealing with data mutations, database updates, and server operations. In this deep dive, we will construct a robust lead generation contact form and explore standard security measures.

### Why Server Actions?
Historically, interacting with a database from a React page required:
1. Setting up an API route (\`pages/api/contact.ts\` or \`app/api/contact/route.ts\`).
2. Creating an fetch handler on the client side.
3. Serializing inputs to JSON and writing boilerplate try/catch logic.

With Next.js 15 Server Actions, we can define asynchronous operations that execute directly on the server, marked by the \`"use server"\` directive.

\`\`\`typescript
// src/app/actions.ts
"use server"

import dbConnect from '@/lib/dbConnect';
import Lead from '@/models/Lead';

export async function submitLead(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  await dbConnect();
  await Lead.create({ name, email, message });
  return { success: true };
}
\`\`\`

### Form Setup
We can bind this function directly to our standard HTML form. Next.js handles the POST payload under the hood, even supporting progressive enhancement when JavaScript is disabled:

\`\`\`typescript
<form action={submitLead}>
  <input name="name" placeholder="Name" required />
  <input name="email" type="email" placeholder="Email" required />
  <textarea name="message" placeholder="Message" required />
  <button type="submit">Submit Form</button>
</form>
\`\`\`

### Security Checklists
When writing server actions:
1. **Always Validate Input**: Utilize validator packages (like Zod) to filter parameters before writing database entries.
2. **Authorize User Roles**: Verify authentication states (JWT cookies) inside the action for admin activities.
3. **Limit Call Frequency**: Implement rate-limiting middleware to avoid bots overloading endpoints.`,
    category: 'Web Development',
    tags: ['Next.js 15', 'React', 'Server Actions', 'Web Security'],
    slug: 'mastering-nextjs-15-server-actions',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    seoTitle: 'Next.js 15 Server Actions Complete Developer Guide',
    seoDescription: 'Learn how to construct secure, high-performance database mutations using Next.js 15 Server Actions without boilerplate REST API routes.',
    published: true,
  },
  {
    title: 'Why MongoDB Atlas is the Perfect Choice for Agile Freelancers',
    excerpt: 'A look at how MongoDB Atlas simplifies developer setups, facilitates flexible schemas for clients, and accelerates database deployment cycles.',
    content: `When working as a freelancer, speed, agility, and cost-efficiency are critical to survival. When bootstrapping web apps for startups, clients frequently change requirements mid-way. In this post, we'll discuss why MongoDB is a developer's secret weapon.

### Flexible Document Schemas
Relational databases (SQL) require rigid schema structures and painful migrations whenever a new field is introduced. If a client suddenly asks to support "multiple project budgets" or "dynamic social links" inside their profile page, SQL requires modifying database tables and writing migration SQL.

With MongoDB, documents are stored as flexible BSON files. Adding a new key-value pair is as simple as inserting it from your Node code. Mongoose handles schemas in code, making updates fast and safe.

### MongoDB Atlas Free Tier
Atlas provides a fully managed database cluster in the cloud for free. It handles:
- Automatic backups and connection pools.
- Built-in analytics trackers.
- Network IP Whitelisting and end-to-end data encryption.

### Easy Mongoose Connectivity
Integrating MongoDB into your Next.js application takes less than 30 lines of code. The Mongoose driver manages connections efficiently in a serverless function context, making it ideal for Vercel deployment.`,
    category: 'Database',
    tags: ['MongoDB', 'Database Design', 'Mongoose', 'Freelancing'],
    slug: 'mongodb-atlas-for-agile-freelancers',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop',
    seoTitle: 'MongoDB Atlas Database Design for Agile Developers',
    seoDescription: 'Why MongoDB Atlas schema flexibility makes it the ideal database selection for rapid freelancing development and quick customer delivery.',
    published: true,
  },
  {
    title: 'Designing Sleek Apple-Style Animations using Framer Motion',
    excerpt: 'Master scroll-reveals, smooth hover layouts, spring transitions, and interactive visual effects that make website templates feel premium.',
    content: `Apple and Stripe websites look outstanding because of their fluid micro-animations. Elements don't just appear; they drift, scale, and respond dynamically. Let's learn how to recreate these premium transitions in React with Framer Motion.

### Springs vs. Tweens
Standard CSS transitions use linear or cubic-bezier curves (tweens). Framer Motion allows spring-based physics, mimicking real-world inertia.

\`\`\`typescript
import { motion } from 'framer-motion';

export const AppleCard = () => (
  <motion.div
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
  >
    <h3>Premium Component</h3>
  </motion.div>
);
\`\`\`

### Scroll-Triggered Reveals
To fade elements in dynamically as the visitor scrolls down:

\`\`\`typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  <h2>Section Heading</h2>
</motion.div>
\`\`\`

### Bento Grid Animations
By using staggered transitions, we can fade bento cells in sequentially for a polished presentation:

\`\`\`typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};
\`\`\`

Combine these animations with custom CSS backdrop-blur layers to create a premium glassmorphic feel that keeps visitors engaged.`,
    category: 'Design & UI',
    tags: ['Framer Motion', 'React Animations', 'UI/UX Design', 'CSS Styling'],
    slug: 'apple-style-animations-framer-motion',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    seoTitle: 'Apple-Style Animations using Framer Motion React Guide',
    seoDescription: 'Master how to program responsive scroll-reveals, bouncy springs, and sleek web transitions that capture user interest using Framer Motion.',
    published: true,
  },
  {
    title: 'The Bento Grid Design Pattern: A Detailed Breakdown',
    excerpt: 'An architectural review of bento grid layout designs in modern SaaS products, Apple devices, and developer profile cards.',
    content: `Have you noticed how products like Linear, Framer, and Apple store websites arrange information? Rather than using standard lists or basic columns, they display features in a mosaic of interconnected boxes. This is called the "Bento Grid Layout".

### Origin
Named after traditional Japanese bento lunch boxes which keep dishes separated in clean, neat compartments, this layout style allows you to present a wide variety of information (stats, images, buttons, blocks) within a unified structural grid.

### Designing a Bento Grid in Tailwind CSS
Tailwind makes building these grids incredibly simple with CSS Grid:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
  <!-- Large Hero Cell (Spans 2 columns on desktop) -->
  <div class="col-span-1 md:col-span-2 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl min-h-[300px]">
    <h2>Main Feature</h2>
  </div>
  
  <!-- Smaller Stats Cell -->
  <div class="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
    <p class="text-zinc-500 font-medium">Projects Done</p>
    <h3 class="text-5xl font-bold">12+</h3>
  </div>
</div>
\`\`\`

### Best Practices
1. **Contrast is Key**: Mix text-only cells with image-heavy cells or code-block illustrations.
2. **Prioritize Hierarchy**: Make the most important metric or service card span multiple rows/columns.
3. **Add Hover States**: Give cells a slight scale, border color shift, or gradient glow when hovered.`,
    category: 'Design & UI',
    tags: ['Bento Grid', 'Tailwind CSS', 'Web Architecture', 'UI/UX Design'],
    slug: 'bento-grid-design-pattern-breakdown',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
    seoTitle: 'Bento Grid Web Layout Design Guide with Tailwind CSS',
    seoDescription: 'A complete breakdown of bento grid layout systems. Learn how to structure modern SaaS landing pages with Tailwind CSS grid blocks.',
    published: true,
  },
  {
    title: 'How to Turn Academic College Projects Into Real Client Products',
    excerpt: 'Learn the exact steps to refine student assignments, upgrade database structures, improve UI styling, and build a resume-defining product.',
    content: `Every semester, Computer Science students write thousands of compilers, inventory managers, and web apps, only to leave them in github repositories once grading finishes. This is a massive wasted opportunity! 

Here is the exact playbook to convert your class projects into real client products that will jumpstart your freelance business.

### Step 1: Replace Default Styling
Most class projects use standard browser tables, plain blue buttons, or default templates. 
- **Action**: Implement a curated dark mode palette. Apply rounded borders (\`rounded-xl\`), subtle box shadows, and font pairings like Inter and General Sans.

### Step 2: Transition from Localhost to the Cloud
Academic projects typically rely on a local SQL instance or mock JSON files.
- **Action**: Host your database on MongoDB Atlas. Deploy your frontend to Vercel. Introduce security keys to separate dev and production modes.

### Step 3: Implement User Auth
Many student web apps skip login dashboards or use hardcoded check statements.
- **Action**: Introduce JWT cookie authentication, role validation headers, and rate-limiting scripts.

### Step 4: Track Business Value
A class project focuses on features. A production product focuses on business results.
- **Action**: Add analytics tracking. Include call-to-action buttons. Rewrite your descriptions to highlight how the software solves a real operational problem.

By following this template, you will build a freelance portfolio that demonstrates real-world software engineering capabilities to potential high-paying clients.`,
    category: 'Freelancing',
    tags: ['Academic Projects', 'Software Engineering', 'Portfolio Tips', 'Career'],
    slug: 'academic-projects-to-real-client-products',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    seoTitle: 'Convert Student Coding Projects into Production Portfolios',
    seoDescription: 'Learn how to refactor your college CS coding projects into commercial software, boost your resume, and launch your freelance business.',
    published: true,
  },
];

export async function seedDatabase() {
  await dbConnect();

  console.log('Clearing database collection tables...');
  await Promise.all([
    Personal.deleteMany({}),
    Education.deleteMany({}),
    Skill.deleteMany({}),
    Service.deleteMany({}),
    Project.deleteMany({}),
    Blog.deleteMany({}),
    Experience.deleteMany({}),
    Certificate.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  console.log('Seeding Personal Details...');
  await Personal.create(personalData);

  console.log('Seeding Education Timeline...');
  await Education.insertMany(educationData);

  console.log('Seeding Skills Progress...');
  await Skill.insertMany(skillsData);

  console.log('Seeding Services Offerings...');
  await Service.insertMany(servicesData);

  console.log('Seeding Portfolio Projects...');
  await Project.insertMany(projectsData);

  console.log('Seeding Professional Experience...');
  await Experience.insertMany(experienceData);

  console.log('Seeding Certificates & Awards...');
  await Certificate.insertMany(certificatesData);

  console.log('Seeding Client Testimonials...');
  await Testimonial.insertMany(testimonialsData);

  console.log('Seeding Blog Posts...');
  await Blog.insertMany(blogsData);

  console.log('Seed Operations Completed Successfully!');
}
