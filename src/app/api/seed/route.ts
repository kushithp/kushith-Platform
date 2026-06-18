import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Allow in development, or if the secret matches JWT_SECRET
  const isDev = process.env.NODE_ENV === 'development';
  const secretMatches = secret && secret === process.env.JWT_SECRET;

  if (!isDev && !secretMatches) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await seedDatabase();
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error seeding database' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
