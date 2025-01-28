"use client";  // This directive marks this component as a client-side component

import React, { useState } from "react";

const VideoFrame = ({ videoUrl }: { videoUrl: string }) => {
  const getVideoId = (url: string) => {
    // Check for YouTube Shorts URL
    const shortsRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const matchShorts = url.match(shortsRegex);
    if (matchShorts) {
      return matchShorts[1];
    }

    // Check for regular YouTube video URL
    const regularRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|v\/|e\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const matchRegular = url.match(regularRegex);
    if (matchRegular) {
      return matchRegular[1];
    }

    return null; // Return null if no valid video ID is found
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <p>Invalid YouTube URL</p>;
  }

  return (
    <div className="w-full h-64 sm:h-96">
      <iframe
        className="w-full h-full"
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

    // Validate YouTube URL (Shorts or regular)
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:shorts\/[a-zA-Z0-9_-]{11}|watch\?v=[a-zA-Z0-9_-]{11}))/;
    setIsValid(regex.test(url));
  };

  return (
    <div className="grid gap-8 p-8">
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
