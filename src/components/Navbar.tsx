'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setIsAdminLoggedIn(data.authenticated);
        }
      } catch (e) {
        // Safe fail
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkAdmin();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 bg-black/60 backdrop-blur-md border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-orange-red flex items-center justify-center font-bold text-black text-lg transition-transform duration-300 group-hover:scale-105">
              K
            </span>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
              Kushith<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
            {isAdminLoggedIn && (
              <Link
                href="/admin"
                className="text-xs flex items-center gap-1 bg-red-950/40 text-red-400 border border-red-900/50 px-2.5 py-1 rounded-full hover:bg-red-900/50 transition-colors"
              >
                <ShieldAlert size={12} />
                CMS Panel
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/#contact"
              className="text-sm font-semibold text-white bg-zinc-900 border border-white/10 px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/#contact"
              className="group text-sm font-semibold text-black bg-gradient-orange-red px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
            >
              Hire Me
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Burger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/90 z-40 md:hidden backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 w-80 h-full bg-zinc-950 border-l border-white/5 p-8 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-8 mt-16">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="font-bold text-lg text-white">Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  {isAdminLoggedIn && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                    >
                      <ShieldAlert size={18} />
                      Admin CMS Dashboard
                    </Link>
                  )}
                </nav>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-full border border-white/10 text-white font-medium hover:bg-zinc-900 transition-colors"
                >
                  Contact Me
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-full bg-gradient-orange-red text-black font-semibold flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  Hire Me
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
