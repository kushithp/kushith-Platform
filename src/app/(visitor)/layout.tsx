import Navbar from '@/components/Navbar';
import FloatingContact from '@/components/FloatingContact';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-foreground">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-24 md:pt-28">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/5 py-16 px-6 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-orange-red flex items-center justify-center font-bold text-black text-lg">
                K
              </span>
              <span className="font-bold text-xl tracking-tight text-white">
                Kushith<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              I build modern, scalable web applications and SaaS dashboards that solve real business problems. Helping startups and creators turn ideas into code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigations</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="text-zinc-500 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/#services" className="text-zinc-500 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-500 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3.5 text-sm text-zinc-500">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />
                <a href="mailto:kushithx@gmail.com" className="hover:text-white transition-colors">kushithx@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <a href="tel:+917411404953" className="hover:text-white transition-colors">+91 7411404953</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>Karnataka, India</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-xs text-zinc-600 hover:text-primary flex items-center gap-1 transition-colors"
                >
                  Admin Area <ArrowUpRight size={10} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 font-medium">
          <p>© {new Date().getFullYear()} Kushith. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Designed & Engineered with Next.js 15
          </p>
        </div>
      </footer>

      {/* Floating Widgets */}
      <FloatingContact />
    </div>
  );
}
