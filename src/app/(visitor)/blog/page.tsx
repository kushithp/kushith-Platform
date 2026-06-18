import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Insights & Technical Blog | Kushith',
  description: 'Technical articles, developer insights, and tutorials on Next.js, React, Node, database management, and freelance engineering written by Kushith.',
};

export default async function BlogPage() {
  await dbConnect();

  // Fetch only published blogs sorted by newest
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });

  // Helper to calculate approximate reading time
  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / 225); // Average reading speed 225 wpm
    return `${time} min read`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      <span className="glow-glow glow-red w-[500px] h-[500px] -right-32 -top-32 opacity-10"></span>

      {/* Page Header */}
      <div className="max-w-2xl space-y-4 mb-16">
        <span className="text-primary font-bold text-xs uppercase tracking-widest">My Library</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
          Technical Insights
        </h1>
        <p className="text-zinc-500 text-sm md:text-base font-medium">
          Writing about full-stack engineering patterns, Next.js optimization strategies, database design, and lessons learned building real-world digital products.
        </p>
      </div>

      {/* Blog Cards Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post._id.toString()}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/40"
            >
              {/* Blog Cover Image */}
              <div className="aspect-video relative overflow-hidden bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Blog Details */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date and Read time */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary" />
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-primary" />
                      {getReadTime(post.content)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6 font-medium line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold text-zinc-400 bg-zinc-900 border border-white/5 px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary flex items-center gap-1 group/btn"
                  >
                    Read More
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-950/20 border border-dashed border-white/5 rounded-3xl">
          <BookOpen size={36} className="text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Articles Published</h3>
          <p className="text-sm text-zinc-500">Kushith is drafting new write-ups, check back shortly.</p>
        </div>
      )}
    </div>
  );
}
export const dynamic = 'force-dynamic';
