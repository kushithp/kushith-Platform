import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Personal from '@/models/Personal';
import ResumeDownload from '@/models/ResumeDownload';
import Analytics from '@/models/Analytics';

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Retrieve personal info to find the active resume URL
    const personal = await Personal.findOne({});
    const resumeUrl = personal?.resumeUrl || '/resume.pdf';

    // Log the download details
    const ip = request.headers.get('x-forwarded-for') || '';
    const userAgent = request.headers.get('user-agent') || '';

    await ResumeDownload.create({ ip, userAgent });

    await Analytics.create({
      eventType: 'click',
      target: 'resume_download',
      ip,
      userAgent,
    });

    // If it's a relative path, construct absolute URL, otherwise redirect directly
    if (resumeUrl.startsWith('http')) {
      return NextResponse.redirect(resumeUrl);
    }
    
    // Fallback: if it's a relative path on our domain
    const origin = new URL(request.url).origin;
    return NextResponse.redirect(`${origin}${resumeUrl}`);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error tracking download' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
