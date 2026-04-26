import { NextRequest, NextResponse } from 'next/server';

// Mock data for approved testimonials
const APPROVED_TESTIMONIALS = [
  {
    _id: 'approved-1',
    name: 'Sarah Ahmed',
    role: 'CEO',
    company: 'TechFlow',
    quote: 'Working with RMAST was a game changer. The level of detail and execution is unmatched. Our platform is now lightning-fast and absolutely beautiful.',
    rating: 5,
    service: 'Web Development',
    metric: '+240%',
    metricLabel: 'user engagement',
    accent: '#52b788',
    accentDim: 'rgba(82,183,136,0.12)',
    avatar: 'SA',
  },
  {
    _id: 'approved-2',
    name: 'James Okafor',
    role: 'Founder',
    company: 'LuxeStore',
    quote: 'The 3D animations he built increased our conversion rate by 40%. This is creative excellence meeting technical perfection.',
    rating: 5,
    service: '3D & UI/UX',
    metric: '+40%',
    metricLabel: 'conversion rate',
    accent: '#00e5ff',
    accentDim: 'rgba(0,229,255,0.10)',
    avatar: 'JO',
  },
  {
    _id: 'approved-3',
    name: 'Layla Hassan',
    role: 'Operations Lead',
    company: 'StartupX',
    quote: 'Saved us 20+ hours per week with AI automation. Not only is he talented but he deeply understands business problems.',
    rating: 5,
    service: 'AI Automations',
    metric: '20hr',
    metricLabel: 'saved per week',
    accent: '#ffca28',
    accentDim: 'rgba(255,202,40,0.10)',
    avatar: 'LH',
  },
];

// GET /api/testimonials?approved=true
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const approved = searchParams.get('approved');

  if (approved === 'true') {
    return NextResponse.json({
      success: true,
      data: APPROVED_TESTIMONIALS,
    });
  }

  return NextResponse.json({
    success: false,
    error: 'Invalid request',
  });
}

// POST /api/testimonials
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.quote) {
      return NextResponse.json({
        success: false,
        error: 'Name and quote are required',
      }, { status: 400 });
    }

    // In a real app, you'd save to database
    // For now, just return success
    console.log('New testimonial submitted:', body);

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Invalid request body',
    }, { status: 400 });
  }
}