'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';

const Home = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [videoId, setVideoId] = useState<string | null>(null);

  const getVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/)([\w\-]+)|youtu\.be\/([\w\-]+))/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  useEffect(() => {
    if (videoUrl) {
      const id = getVideoId(videoUrl);
      setVideoId(id);
    }
  }, [videoUrl]);

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
        <meta property="og:video" content={videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''} />
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

      {isValid && videoUrl && videoId && (
        <div className="w-full h-64 sm:h-96">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {isValid && videoUrl && !videoId && <p>Invalid YouTube URL</p>}
    </div>
  );
};

export default Home;
