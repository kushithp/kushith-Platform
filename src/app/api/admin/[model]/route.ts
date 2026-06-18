import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getAuthUser } from '@/lib/auth';

import Personal from '@/models/Personal';
import Education from '@/models/Education';
import Skill from '@/models/Skill';
import Service from '@/models/Service';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import Experience from '@/models/Experience';
import Certificate from '@/models/Certificate';
import Testimonial from '@/models/Testimonial';
import Lead from '@/models/Lead';
import ResumeDownload from '@/models/ResumeDownload';
import Analytics from '@/models/Analytics';

const MODEL_MAP: { [key: string]: any } = {
  personal: Personal,
  education: Education,
  skill: Skill,
  service: Service,
  project: Project,
  blog: Blog,
  experience: Experience,
  certificate: Certificate,
  testimonial: Testimonial,
  lead: Lead,
  analytics: Analytics,
};

export async function GET(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  
  // Verify token first
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const MongooseModel = MODEL_MAP[model];
  if (!MongooseModel) {
    return NextResponse.json({ error: `Invalid model name: ${model}` }, { status: 400 });
  }

  await dbConnect();

  try {
    if (model === 'analytics') {
      // Return stats summary for the dashboard
      const pageViews = await Analytics.countDocuments({ eventType: 'pageview' });
      const contactCount = await Lead.countDocuments({});
      const resumeCount = await ResumeDownload.countDocuments({});
      
      // Get page views grouped by target
      const topProjects = await Analytics.aggregate([
        { $match: { eventType: 'pageview', target: { $regex: '^\/projects\/' } } },
        { $group: { _id: '$target', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
      
      // Get lead submissions details
      const recentLeads = await Lead.find({}).sort({ createdAt: -1 }).limit(5);

      return NextResponse.json({
        pageViews,
        contactCount,
        resumeCount,
        topProjects,
        recentLeads,
      });
    }

    // Standard list return
    const data = await MongooseModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  
  // Verify token first
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const MongooseModel = MODEL_MAP[model];
  if (!MongooseModel || model === 'analytics') {
    return NextResponse.json({ error: 'Invalid model action' }, { status: 400 });
  }

  await dbConnect();

  try {
    const body = await request.json();
    const data = await MongooseModel.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
