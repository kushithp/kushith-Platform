'use client';

import { useState, useEffect } from 'react';
import { Calendar, Loader2 } from 'lucide-react';

export default function CalendlyWidget() {
  const [loading, setLoading] = useState(true);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/kushithx/15min';

  useEffect(() => {
    // Hide the loader after 1.5 seconds or once iframe is ready
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col h-full min-h-[500px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Calendar size={20} />
        </div>
        <div>
          <h3 className="font-bold text-white tracking-tight">Book a Consultation</h3>
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Select a convenient time slot</p>
        </div>
      </div>

      <div className="flex-1 bg-zinc-950/40 rounded-2xl border border-white/5 relative overflow-hidden min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 gap-3 z-10">
            <Loader2 className="animate-spin text-primary" size={30} />
            <span className="text-xs font-semibold uppercase tracking-wider">Loading Scheduler...</span>
          </div>
        )}
        <iframe
          src={`${calendlyUrl}?embed_domain=${encodeURIComponent(
            typeof window !== 'undefined' ? window.location.hostname : ''
          )}&embed_type=Inline&background_color=000000&text_color=ffffff&primary_color=ff4d00`}
          width="100%"
          height="100%"
          frameBorder="0"
          className="w-full h-full min-h-[400px]"
          title="Schedule meeting with Kushith"
        ></iframe>
      </div>
    </div>
  );
}
