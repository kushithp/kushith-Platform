'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  FileCode,
  BookOpen,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Sparkles,
  Upload,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Modal / Form States
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<any>({});

  const sidebarLinks = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'leads', name: 'Leads Inbox', icon: Inbox },
    { id: 'projects', name: 'Projects', icon: FileCode },
    { id: 'blogs', name: 'Blogs', icon: BookOpen },
    { id: 'skills', name: 'Skills', icon: Sparkles },
    { id: 'services', name: 'Services', icon: Layers },
    { id: 'personal', name: 'Personal & SEO', icon: Settings },
  ];

  // Fetch data depending on active tab
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = activeTab === 'overview' ? '/api/admin/analytics' : `/api/admin/${activeTab}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        if (res.status === 401) {
          router.push('/admin/login');
        } else {
          setError('Failed to fetch data');
        }
      }
    } catch (err) {
      setError('Connection failed. Please retry.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/${activeTab}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Network error during delete');
    }
  };

  const handleEditClick = (item: any) => {
    setEditingId(item._id);
    setFormState({ ...item });
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingId(null);
    // Initialize default fields based on tab
    if (activeTab === 'projects') {
      setFormState({
        title: '',
        description: '',
        problem: '',
        solution: '',
        results: '',
        category: 'SaaS Platform',
        technologies: '',
        coverImage: '',
        galleryImages: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        displayOrder: 0,
      });
    } else if (activeTab === 'blogs') {
      setFormState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Web Development',
        tags: '',
        slug: '',
        coverImage: '',
        seoTitle: '',
        seoDescription: '',
        published: false,
      });
    } else if (activeTab === 'skills') {
      setFormState({
        name: '',
        category: 'Frontend',
        progress: 80,
        icon: 'ReactIcon',
      });
    } else if (activeTab === 'services') {
      setFormState({
        title: '',
        description: '',
        icon: 'Globe',
      });
    }
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    setSaving(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const result = await res.json();
        setFormState((prev: any) => ({ ...prev, [fieldName]: result.url }));
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Upload connection failed');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Prepare fields that need serialization (like technologies and tags as arrays)
    const payload = { ...formState };
    if (activeTab === 'projects' && typeof payload.technologies === 'string') {
      payload.technologies = payload.technologies.split(',').map((t: string) => t.trim());
    }
    if (activeTab === 'blogs' && typeof payload.tags === 'string') {
      payload.tags = payload.tags.split(',').map((t: string) => t.trim());
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId
        ? `/api/admin/${activeTab}/${editingId}`
        : `/api/admin/${activeTab}`;

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
      } else {
        const errorJson = await res.json();
        alert(`Save failed: ${errorJson.error}`);
      }
    } catch (err) {
      alert('Network error saving details');
    } finally {
      setSaving(false);
    }
  };

  const handlePersonalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // id doesn't matter for personal as we use findOneAndUpdate({}, ...)
      const res = await fetch('/api/admin/personal/all', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data[0] || data),
      });

      if (res.ok) {
        alert('Profile saved successfully!');
        fetchData();
      } else {
        alert('Failed to save profile');
      }
    } catch (err) {
      alert('Network error saving profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex text-zinc-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-zinc-950 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-2 pb-6 border-b border-white/5">
            <span className="w-8 h-8 rounded-lg bg-gradient-orange-red flex items-center justify-center font-bold text-black text-sm">
              K
            </span>
            <span className="font-bold text-lg text-white">Admin CMS</span>
          </div>

          <nav className="space-y-1.5">
            {sidebarLinks.map((link) => {
              const IconComp = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setShowModal(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === link.id
                      ? 'bg-zinc-900 text-white border-l-2 border-primary'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                  }`}
                >
                  <IconComp size={18} />
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-all"
        >
          <LogOut size={18} />
          Logout Panel
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        
        {/* Top Header bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white capitalize tracking-tight">{activeTab}</h1>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Control Panel & Content Settings
            </p>
          </div>
          <div className="flex items-center gap-3">
            {['projects', 'blogs', 'skills', 'services'].includes(activeTab) && (
              <button
                onClick={handleAddClick}
                className="bg-gradient-orange-red text-black font-semibold px-4.5 py-2 rounded-xl text-xs flex items-center gap-1.5 hover:shadow-lg transition-all"
              >
                <Plus size={16} /> Add New
              </button>
            )}
            <button
              onClick={handleLogout}
              className="md:hidden p-2.5 rounded-xl border border-white/10 hover:bg-zinc-900 text-zinc-400"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-2">
            <Loader2 className="animate-spin text-primary" size={30} />
            <span className="text-xs font-semibold uppercase tracking-wider">Retrieving details...</span>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400 font-semibold">{error}</div>
        ) : (
          <div className="space-y-8">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && data && (
              <div className="space-y-8">
                {/* Stats Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-3xl">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Page Views</p>
                    <h2 className="text-4xl font-black text-white mt-2">{data.pageViews}</h2>
                  </div>
                  <div className="glass-panel p-6 rounded-3xl">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Leads Submissions</p>
                    <h2 className="text-4xl font-black text-white mt-2">{data.contactCount}</h2>
                  </div>
                  <div className="glass-panel p-6 rounded-3xl">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Resume Downloads</p>
                    <h2 className="text-4xl font-black text-white mt-2">{data.resumeCount}</h2>
                  </div>
                </div>

                {/* Recent Leads inbox list */}
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-white tracking-tight">Recent Active Proposals</h3>
                  <div className="space-y-4">
                    {data.recentLeads.map((lead: any) => (
                      <div key={lead._id} className="p-4 bg-zinc-950/60 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <div>
                          <h4 className="font-bold text-white text-sm">{lead.name} ({lead.company || 'Individual'})</h4>
                          <p className="text-xs text-zinc-500 mt-1">{lead.email} | {lead.projectType} ({lead.budget})</p>
                        </div>
                        <span className="text-[10px] font-bold text-black bg-white px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. LEADS TAB */}
            {activeTab === 'leads' && data && (
              <div className="space-y-4">
                {data.map((lead: any) => (
                  <div key={lead._id} className="glass-panel p-6 rounded-3xl space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/5 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                        <p className="text-xs text-zinc-500">{lead.company || 'No Company'} | {lead.email} | {lead.phone}</p>
                      </div>
                      <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-sm text-zinc-300 leading-relaxed font-medium">
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Project Message</p>
                      {lead.message}
                    </div>
                    <div className="text-xs text-zinc-500 font-semibold flex justify-between pt-2">
                      <span>Budget estimate: {lead.budget || 'Not specified'}</span>
                      <span>Type: {lead.projectType || 'Not specified'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. PROJECTS LIST */}
            {activeTab === 'projects' && data && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((proj: any) => (
                  <div key={proj._id} className="glass-panel p-5 rounded-3xl flex justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{proj.category}</span>
                      <h3 className="text-lg font-bold text-white tracking-tight">{proj.title}</h3>
                      <p className="text-zinc-500 text-xs font-medium line-clamp-2">{proj.description}</p>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleEditClick(proj)}
                          className="text-xs font-semibold text-zinc-300 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-zinc-800"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id)}
                          className="text-xs font-semibold text-red-400 bg-red-950/20 border border-red-900/35 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-red-900/50"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                    {proj.coverImage && (
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={proj.coverImage} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. BLOGS LIST */}
            {activeTab === 'blogs' && data && (
              <div className="space-y-4">
                {data.map((blog: any) => (
                  <div key={blog._id} className="glass-panel p-5 rounded-3xl flex justify-between items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{blog.title}</h3>
                      <p className="text-xs text-zinc-500 mt-1">Slug: {blog.slug} | Category: {blog.category}</p>
                      <div className="flex gap-2 pt-4">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="text-xs font-semibold text-zinc-300 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-zinc-800"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-xs font-semibold text-red-400 bg-red-950/20 border border-red-900/35 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-red-900/50"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      blog.published ? 'bg-green-500/10 text-green-400 border border-green-950' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 5. SKILLS / SERVICES */}
            {['skills', 'services'].includes(activeTab) && data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item: any) => (
                  <div key={item._id} className="glass-panel p-5 rounded-3xl space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white">{item.name || item.title}</h3>
                      <div className="flex gap-1">
                        <button onClick={() => handleEditClick(item)} className="p-1.5 text-zinc-400 hover:text-white"><Edit3 size={14} /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    {item.progress !== undefined && <p className="text-xs text-zinc-500">Progress: {item.progress}% | Cat: {item.category}</p>}
                    {item.description && <p className="text-xs text-zinc-500 line-clamp-2">{item.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* 6. PERSONAL & SEO SETTINGS */}
            {activeTab === 'personal' && data && (
              <form onSubmit={handlePersonalSave} className="glass-panel p-8 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Display Name</label>
                    <input
                      type="text"
                      required
                      value={data[0]?.name || data.name || ''}
                      onChange={(e) => {
                        const updated = Array.isArray(data) ? [...data] : { ...data };
                        if (Array.isArray(updated)) updated[0].name = e.target.value;
                        else updated.name = e.target.value;
                        setData(updated);
                      }}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Profile Tagline</label>
                    <input
                      type="text"
                      required
                      value={data[0]?.tagline || data.tagline || ''}
                      onChange={(e) => {
                        const updated = Array.isArray(data) ? [...data] : { ...data };
                        if (Array.isArray(updated)) updated[0].tagline = e.target.value;
                        else updated.tagline = e.target.value;
                        setData(updated);
                      }}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Description Bio</label>
                  <textarea
                    rows={4}
                    required
                    value={data[0]?.description || data.description || ''}
                    onChange={(e) => {
                      const updated = Array.isArray(data) ? [...data] : { ...data };
                      if (Array.isArray(updated)) updated[0].description = e.target.value;
                      else updated.description = e.target.value;
                      setData(updated);
                    }}
                    className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Active Email</label>
                    <input
                      type="email"
                      value={data[0]?.email || data.email || ''}
                      onChange={(e) => {
                        const updated = Array.isArray(data) ? [...data] : { ...data };
                        if (Array.isArray(updated)) updated[0].email = e.target.value;
                        else updated.email = e.target.value;
                        setData(updated);
                      }}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Phone</label>
                    <input
                      type="text"
                      value={data[0]?.phone || data.phone || ''}
                      onChange={(e) => {
                        const updated = Array.isArray(data) ? [...data] : { ...data };
                        if (Array.isArray(updated)) updated[0].phone = e.target.value;
                        else updated.phone = e.target.value;
                        setData(updated);
                      }}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Resume PDF Path or URL</label>
                    <input
                      type="text"
                      value={data[0]?.resumeUrl || data.resumeUrl || ''}
                      onChange={(e) => {
                        const updated = Array.isArray(data) ? [...data] : { ...data };
                        if (Array.isArray(updated)) updated[0].resumeUrl = e.target.value;
                        else updated.resumeUrl = e.target.value;
                        setData(updated);
                      }}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="bg-zinc-900 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer hover:bg-zinc-800 flex items-center gap-1.5">
                      <Upload size={14} /> Upload Resume PDF
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          setSaving(true);
                          const res = await fetch('/api/upload', { method: 'POST', body: formData });
                          if (res.ok) {
                            const resJson = await res.json();
                            const updated = Array.isArray(data) ? [...data] : { ...data };
                            if (Array.isArray(updated)) updated[0].resumeUrl = resJson.url;
                            else updated.resumeUrl = resJson.url;
                            setData(updated);
                          } else {
                            alert('Upload failed');
                          }
                          setSaving(false);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-orange-red text-black font-semibold px-6 py-3 rounded-xl text-xs hover:shadow-lg disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Update Settings'}
                  </button>
                </div>
              </form>
            )}

          </div>
        )}
      </main>

      {/* POPUP MODAL FOR CRUD CREATION & EDITING */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto space-y-6"
          >
            <h3 className="text-xl font-bold text-white">
              {editingId ? 'Edit Entry' : 'Create New Entry'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Dynamic inputs based on activeTab */}
              {activeTab === 'projects' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={formState.title}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Short Description</label>
                    <textarea
                      required
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm h-20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Problem / Challenge</label>
                      <textarea
                        value={formState.problem || ''}
                        onChange={(e) => setFormState({ ...formState, problem: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm h-16"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Solution</label>
                      <textarea
                        value={formState.solution || ''}
                        onChange={(e) => setFormState({ ...formState, solution: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm h-16"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Cover Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formState.coverImage}
                          onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
                          className="flex-1 bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs"
                        />
                        <label className="bg-zinc-900 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-zinc-800 shrink-0 flex items-center justify-center">
                          <Upload size={14} />
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'coverImage')} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(formState.technologies) ? formState.technologies.join(', ') : formState.technologies}
                        onChange={(e) => setFormState({ ...formState, technologies: e.target.value })}
                        placeholder="Next.js, Tailwind, MongoDB"
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Live Demo Link</label>
                      <input
                        type="text"
                        value={formState.liveUrl}
                        onChange={(e) => setFormState({ ...formState, liveUrl: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">GitHub Repo Link</label>
                      <input
                        type="text"
                        value={formState.githubUrl}
                        onChange={(e) => setFormState({ ...formState, githubUrl: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Featured</label>
                      <select
                        value={formState.featured ? 'true' : 'false'}
                        onChange={(e) => setFormState({ ...formState, featured: e.target.value === 'true' })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'blogs' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Slug</label>
                      <input
                        type="text"
                        required
                        value={formState.slug}
                        onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                        placeholder="title-slug-format"
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Cover Image</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formState.coverImage}
                          onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
                          className="flex-1 bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs"
                        />
                        <label className="bg-zinc-900 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-zinc-800 shrink-0 flex items-center justify-center">
                          <Upload size={14} />
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'coverImage')} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Excerpt</label>
                    <textarea
                      required
                      value={formState.excerpt}
                      onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm h-16"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Content (supports Markdown)</label>
                    <textarea
                      required
                      value={formState.content}
                      onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm h-40 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(formState.tags) ? formState.tags.join(', ') : formState.tags}
                        onChange={(e) => setFormState({ ...formState, tags: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Status</label>
                      <select
                        value={formState.published ? 'true' : 'false'}
                        onChange={(e) => setFormState({ ...formState, published: e.target.value === 'true' })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      >
                        <option value="false">Draft</option>
                        <option value="true">Publish</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'skills' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Skill Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Category</label>
                      <select
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Programming Languages">Programming Languages</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Tools">Tools</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Progress (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={formState.progress}
                        onChange={(e) => setFormState({ ...formState, progress: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Icon mapping key</label>
                      <input
                        type="text"
                        value={formState.icon}
                        onChange={(e) => setFormState({ ...formState, icon: e.target.value })}
                        placeholder="ReactIcon / NodeIcon / FigmaIcon"
                        className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Description</label>
                    <textarea
                      required
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Icon Name</label>
                    <input
                      type="text"
                      value={formState.icon}
                      onChange={(e) => setFormState({ ...formState, icon: e.target.value })}
                      placeholder="Globe / Layers / Cpu / Briefcase"
                      className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-orange-red text-black font-bold px-6 py-2.5 rounded-xl text-xs hover:shadow-lg disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Entry'}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
