'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Social Media Dock */}
      <div className="flex flex-col gap-2.5 bg-black/70 backdrop-blur-md border border-white/10 p-2 rounded-2xl shadow-2xl">
        <a
          href="mailto:kushithx@gmail.com"
          className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105"
          title="Email Kushith"
        >
          <Mail size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/kushith-p132006/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-[#0a66c2] transition-all hover:scale-105"
          title="LinkedIn Profile"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
          </svg>
        </a>
        <a
          href="https://github.com/kushithp"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105"
          title="GitHub Profile"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/917411404953"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-xl hover:shadow-[#25d366]/30 transition-all duration-300"
        title="Chat on WhatsApp"
      >
        <span className="absolute -left-36 bg-black/90 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
        <span className="absolute inset-0 rounded-full border-2 border-[#25d366] animate-ping opacity-35"></span>
        {/* Custom SVG for WhatsApp icon (standard, beautiful) */}
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.421 1.451 5.408 0 9.808-4.39 9.811-9.797.001-2.618-1.01-5.08-2.858-6.93C17.173 2.028 14.707.973 12.01.973c-5.41 0-9.813 4.39-9.817 9.798-.001 1.996.523 3.946 1.52 5.684l-.999 3.648 3.733-.978zM17.65 14.86c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-1.35-.68-2.22-1.21-3.04-2.61-.22-.37-.03-.56.15-.74.16-.16.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.48-.5-.68-.5-.2 0-.42-.03-.63-.03-.21 0-.56.08-.85.4-.29.3-1.11 1.08-1.11 2.64 0 1.56 1.13 3.07 1.29 3.28.16.2 2.23 3.41 5.4 4.77.75.32 1.34.52 1.8.66.76.24 1.45.2 2 .12.61-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </motion.a>
    </div>
  );
}
