import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import Analytics from '@/models/Analytics';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import Link from 'next/link';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  await dbConnect();
  const post = await Blog.findOne({ slug });
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.seoTitle || post.title} | Kushith's Blog`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  await dbConnect();

  const post = await Blog.findOne({ slug, published: true });
  if (!post) {
    notFound();
  }

  // Log page view in background analytics
  try {
    await Analytics.create({
      eventType: 'pageview',
      target: `/blog/${slug}`,
    });
  } catch (e) {
    // Safe fail
  }

  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / 225);
    return `${time} min read`;
  };

  // Basic parser helper for markdown to render clean styled HTML elements
  const formatMarkdown = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      // Headers
      if (para.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-4 tracking-tight">{para.replace('### ', '')}</h3>;
      }
      if (para.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-black text-white mt-10 mb-4 tracking-tight">{para.replace('## ', '')}</h2>;
      }
      if (para.startsWith('# ')) {
        return <h1 key={i} className="text-3xl font-black text-white mt-12 mb-6 tracking-tight">{para.replace('# ', '')}</h1>;
      }
      
      // Quotes
      if (para.startsWith('> ')) {
        return (
          <blockquote key={i} className="border-l-2 border-primary bg-zinc-900/40 p-5 rounded-r-xl italic text-zinc-300 text-sm my-6 leading-relaxed">
            {para.replace('> ', '')}
          </blockquote>
        );
      }

      // Code blocks
      if (para.startsWith('```')) {
        const lines = para.split('\n');
        const code = lines.slice(1, -1).join('\n');
        return (
          <pre key={i} className="bg-zinc-950 border border-white/5 p-5 rounded-2xl text-xs text-zinc-300 font-mono overflow-x-auto my-6 leading-relaxed select-all">
            <code>{code}</code>
          </pre>
        );
      }

      // Standard list items (quick parse)
      if (para.startsWith('- ') || para.startsWith('* ')) {
        const items = para.split('\n');
        return (
          <ul key={i} className="space-y-2.5 my-6 text-sm text-zinc-300 list-disc list-inside leading-relaxed font-medium">
            {items.map((item, idx) => (
              <li key={idx}>{item.replace(/^[-*]\s+/, '')}</li>
            ))}
          </ul>
        );
      }

      // Standard text paragraph
      return (
        <p key={i} className="text-zinc-300 text-sm md:text-base leading-relaxed my-4 font-medium">
          {para}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 relative">
      <span className="glow-glow glow-red w-[500px] h-[500px] -left-32 -top-32 opacity-10"></span>

      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 text-sm font-semibold group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      {/* Article Header */}
      <div className="space-y-6 mb-12">
        <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 border border-primary/15 px-3.5 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Date and Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-zinc-500 pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary" />
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            {getReadTime(post.content)}
          </span>
          <span className="flex items-center gap-1.5 ml-auto text-zinc-400 hover:text-white cursor-pointer transition-colors">
            <Share2 size={14} /> Share
          </span>
        </div>
      </div>

      {/* Article Main Cover */}
      <div className="glass-panel rounded-3xl overflow-hidden aspect-video bg-zinc-950 mb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Prose Article Body */}
      <article className="prose prose-invert max-w-none pb-16 border-b border-white/5">
        {formatMarkdown(post.content)}
      </article>

      {/* Tags footer */}
      <div className="flex items-center gap-3 py-8">
        <Tag size={16} className="text-primary" />
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs font-semibold text-zinc-400 bg-zinc-950 border border-white/5 px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
