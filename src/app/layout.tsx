import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kushith | Full-Stack Web Developer & Software Engineer Portfolio',
  description:
    'Personal brand platform of Kushith, Computer Science Engineering student and Full Stack Freelancer. Custom web applications, SaaS dashboards, and workflow automation systems.',
  keywords: [
    'Kushith',
    'Full Stack Developer',
    'Software Engineer India',
    'Next.js 15 Developer',
    'SaaS Developer',
    'React Portfolio',
    'Karnataka Freelancer',
  ],
  authors: [{ name: 'Kushith' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kushith.com',
    title: 'Kushith | Full-Stack Web Developer & Software Engineer Portfolio',
    description:
      'I Build Modern Web Applications That Solve Real Business Problems. Custom SaaS dashboards, automation tools, and scalable web apps.',
    siteName: 'Kushith Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kushith | Full-Stack Web Developer',
    description:
      'Computer Science Engineering student and Full Stack Freelancer building custom digital products and SaaS systems.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kushith',
    jobTitle: 'Full-Stack Software Engineer & Freelancer',
    url: 'https://kushith.com',
    sameAs: [
      'https://github.com/kushithp',
      'https://www.linkedin.com/in/kushith-p132006/',
    ],
    knowsAbout: [
      'Full Stack Web Development',
      'React.js',
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'SaaS Architectures',
      'API Engineering',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-black text-foreground">
        {children}
      </body>
    </html>
  );
}
