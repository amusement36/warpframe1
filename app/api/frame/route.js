import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Disable caching

export async function POST(request) {
    const { untrustedData } = await request.json();
    const rawUrl = untrustedData?.inputText?.trim() || '';

    // Enhanced URL validation
    const videoId = validateShortsUrl(rawUrl);

    if (!videoId) {
        return getErrorFrame('Please enter a valid YouTube Shorts URL');
    }

    return getVideoFrame(videoId);
}

// Improved URL validation
function validateShortsUrl(url) {
    try {
        const parsed = new URL(url);
        if (!['youtube.com', 'youtu.be'].includes(parsed.hostname)) return null;

        const pathMatch = parsed.pathname.match(/\/(shorts\/|watch\?v=)([a-zA-Z0-9_-]{11})/);
        return pathMatch ? pathMatch[2] : null;
    } catch {
        return null;
    }
}

function getVideoFrame(videoId) {
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                aspectRatio: '9:16'
            },
            buttons: [
                { label: 'Watch Short ↗', action: 'post_redirect' }
            ],
            postUrl: `${process.env.NEXT_PUBLIC_URL}/api/redirect?vid=${videoId}`,
        })
    );
}

function getErrorFrame(message) {
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${process.env.NEXT_PUBLIC_URL}/assets/invalid-url.png`,
                aspectRatio: '1:1'
            },
            buttons: [
                { label: 'Retry', action: 'post' }
            ],
            postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame`,
        })
    );
}