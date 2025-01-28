import { NextResponse } from 'next/server';

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('vid');

    // Mobile-optimized embed URL
    const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
    embedUrl.searchParams.append('autoplay', '1');
    embedUrl.searchParams.append('playsinline', '1');
    embedUrl.searchParams.append('rel', '0'); // Hide related videos

    return NextResponse.redirect(embedUrl.toString(), {
        status: 302,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    });
}