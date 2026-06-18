'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  profileImage: string;
  rating: number;
  review: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <div className="relative glass-panel p-8 md:p-14 rounded-3xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
      {/* Decorative quote back icon */}
      <div className="absolute top-6 left-6 text-zinc-800/20 z-0">
        <Quote size={80} className="fill-current stroke-none" />
      </div>

      {/* Profile Photo */}
      <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-950 border border-white/10 shrink-0 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'}
          alt={active.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Testimonial Content */}
      <div className="flex-1 relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Stars */}
          <div className="flex gap-1 text-primary mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < active.rating ? 'fill-primary stroke-none' : 'text-zinc-700'}
              />
            ))}
          </div>

          {/* Review Text */}
          <div className="min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-300 italic text-sm md:text-base leading-relaxed mb-6 font-medium"
              >
                "{active.review}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Client Name & Navigation */}
        <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
          <div>
            <h4 className="font-bold text-white text-sm md:text-base tracking-tight">{active.name}</h4>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              {active.position}, <span className="text-zinc-400">{active.company}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Next Testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
