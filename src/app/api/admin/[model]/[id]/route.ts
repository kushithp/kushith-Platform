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
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const { model, id } = await params;

  // Verify token first
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const MongooseModel = MODEL_MAP[model];
  if (!MongooseModel) {
    return NextResponse.json({ error: 'Invalid model name' }, { status: 400 });
  }

  await dbConnect();

  try {
    const body = await request.json();
    let data;
    
    if (model === 'personal') {
      // For personal info, update the only existing document or create one
      data = await MongooseModel.findOneAndUpdate({}, body, { new: true, upsert: true });
    } else {
      data = await MongooseModel.findByIdAndUpdate(id, body, { new: true });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const { model, id } = await params;

  // Verify token first
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const MongooseModel = MODEL_MAP[model];
  if (!MongooseModel || model === 'personal') {
    return NextResponse.json({ error: 'Invalid model operation' }, { status: 400 });
  }

  await dbConnect();

  try {
    const data = await MongooseModel.findByIdAndDelete(id);
    if (!data) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Document deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
