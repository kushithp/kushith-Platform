import { MetadataRoute } from 'next';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import Blog from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = 'https://kushith.com';

  await dbConnect();
  
  let projects: any[] = [];
  let blogs: any[] = [];

  try {
    projects = await Project.find({}, '_id');
    blogs = await Blog.find({ published: true }, 'slug');
  } catch (e) {
    // Safe fallback if database is empty
  }

  const staticUrls = [
    { url: `${domain}/`, lastModified: new Date() },
    { url: `${domain}/projects`, lastModified: new Date() },
    { url: `${domain}/blog`, lastModified: new Date() },
  ];

  const projectUrls = projects.map((proj) => ({
    url: `${domain}/projects/${proj._id.toString()}`,
    lastModified: new Date(),
  }));

  const blogUrls = blogs.map((post) => ({
    url: `${domain}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
export const dynamic = 'force-dynamic';
