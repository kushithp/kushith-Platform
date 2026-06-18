import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Lead from '@/models/Lead';
import Analytics from '@/models/Analytics';

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, budget, projectType, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    await dbConnect();

    // Create the Lead record
    const newLead = await Lead.create({
      name,
      email,
      phone: phone || '',
      company: company || '',
      budget: budget || '',
      projectType: projectType || '',
      message,
      status: 'Pending',
    });

    // Extract headers for analytics logging
    const ip = request.headers.get('x-forwarded-for') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Log the lead submission in analytics
    await Analytics.create({
      eventType: 'click',
      target: 'lead_submitted',
      ip,
      userAgent,
    });

    return NextResponse.json({ success: true, leadId: newLead._id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error processing contact request' }, { status: 500 });
  }
}
