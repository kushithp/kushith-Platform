'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Redirect to admin portal dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative">
      <span className="glow-glow glow-orange w-[400px] h-[400px] -left-20 top-20 opacity-10"></span>
      <span className="glow-glow glow-red w-[400px] h-[400px] -right-20 bottom-20 opacity-10"></span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-md relative z-10 space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin CMS Access</h1>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
            Authorize credentials to manage platform content
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User size={18} className="absolute left-4 top-3.5 text-zinc-600" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-3.5 text-zinc-600" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-zinc-950/80 border border-white/5 focus:border-primary/55 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-semibold bg-red-950/20 border border-red-900/35 p-3 rounded-xl">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold text-black bg-gradient-orange-red py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <span>Verify credentials</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
            Return to home page
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
