'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    projectType: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    'Custom Web App',
    'SaaS Platform',
    'Business Website',
    'Admin Dashboard',
    'Automation System',
    'AI Integration',
    'College/Academic Project',
    'Other',
  ];

  const budgets = [
    'Under $1k',
    '$1k - $3k',
    '$3k - $5k',
    '$5k - $10k',
    '$10k+',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          projectType: '',
          message: '',
        });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
      <span className="absolute -right-28 -top-28 w-56 h-56 rounded-full bg-primary/5 blur-3xl pointer-events-none"></span>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-6 animate-bounce">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
            Thank you for reaching out, Kushith will review your project details and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs font-semibold bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full transition-all"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 99999 99999"
                className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google / Freelance / Startup"
                className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Select Project Type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Select Budget Range</option>
                {budgets.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your product idea, timeline, and goals..."
              className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-semibold bg-red-950/20 border border-red-900/35 p-3.5 rounded-xl">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full group font-semibold text-black bg-gradient-orange-red py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>Send Proposal</span>
                <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
