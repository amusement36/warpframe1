import Head from 'next/head';
import { useState, useEffect } from 'react';

const VideoFrame = ({ videoUrl }: { videoUrl: string }) => {
  const getVideoId = (url: string) => {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:shorts\/[a-zA-Z0-9_-]{11}|watch\?v=[a-zA-Z0-9_-]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);

  useEffect(() => {
    if (videoId) {
      // Dynamically add meta tags for Warpcast
      document.head.querySelector('meta[property="og:video"]')?.setAttribute('content', `https://www.youtube.com/watch?v=${videoId}`);
      document.head.querySelector('meta[property="og:title"]')?.setAttribute('content', "Video Title");
      document.head.querySelector('meta[property="og:description"]')?.setAttribute('content', "Video description goes here.");
      // Add any other meta tags you need here as per the Warpcast docs
    }
  }, [videoId]);

  return (
    <div className="w-full h-64 sm:h-96">
      {videoId ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
    </div>
  );
};

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setVideoUrl(url);

    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:shorts\/[a-zA-Z0-9_-]{11}|watch\?v=[a-zA-Z0-9_-]{11}))/;
    setIsValid(regex.test(url));
  };

  return (
    <div className="grid gap-8 p-8">
      <Head>
        <meta property="og:type" content="video.other" />
        <meta property="og:video" content={`https://www.youtube.com/watch?v=${getVideoId(videoUrl)}`} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:title" content="Video Title" />
        <meta property="og:description" content="Video description goes here." />
      </Head>
      
      <h1>Welcome to the YouTube Video Viewer</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={handleUrlChange}
        className="border p-2"
      />
      {!isValid && <p className="text-red-500">Please enter a valid YouTube URL</p>}
      {isValid && videoUrl && <VideoFrame videoUrl={videoUrl} />}
    </div>
  );
}
