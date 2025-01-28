"use client";

import React, { useState } from "react";

const VideoFrame = ({ videoUrl }: { videoUrl: string }) => {
  const getVideoId = (url: string) => {
    const shortsRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const matchShorts = url.match(shortsRegex);
    if (matchShorts) {
      return matchShorts[1];
    }

    const regularRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|v\/|e\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const matchRegular = url.match(regularRegex);
    if (matchRegular) {
      return matchRegular[1];
    }

    return null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <p>Invalid YouTube URL</p>;
  }

  // Here, you need to inject the meta tags
  const metaTags = `
    <meta property="og:video" content="https://www.youtube.com/watch?v=${videoId}" />
    <meta property="og:video:secure_url" content="https://www.youtube.com/watch?v=${videoId}" />
    <meta property="og:image" content="https://img.youtube.com/vi/${videoId}/0.jpg" />
    <meta property="og:title" content="YouTube Video Embed" />
    <meta property="og:description" content="A short description of the YouTube video" />
  `;

  // Inject the meta tags to the head of the document or use the preferred method in Warpcast for dynamic content

  return (
    <div className="video-frame-container">
      <iframe
        className="video-frame"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
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
    <div className="main-container">
      <h1 className="title">Welcome to the YouTube Video Viewer</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={handleUrlChange}
        className="url-input"
      />
      {!isValid && <p className="text-red-500">Please enter a valid YouTube URL</p>}
      {isValid && videoUrl && <VideoFrame videoUrl={videoUrl} />}
    </div>
  );
}
