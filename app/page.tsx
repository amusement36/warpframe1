// app/page.tsx

import React, { useState } from "react";

const VideoFrame = ({ videoUrl }: { videoUrl: string }) => {
  const getVideoId = (url: string) => {
    // Extract the video ID from YouTube Shorts URL
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);

  if (!videoId) {
    return <p>Invalid YouTube Shorts URL</p>;
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

    // Validate YouTube Shorts URL
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/shorts\/)[a-zA-Z0-9_-]{11}/;
    setIsValid(regex.test(url));
  };

  return (
    <div className="grid gap-8 p-8">
      <h1>Welcome to the YouTube Shorts Viewer</h1>
      <input
        type="text"
        placeholder="Enter YouTube Shorts URL"
        value={videoUrl}
        onChange={handleUrlChange}
        className="border p-2"
      />
      {!isValid && <p className="text-red-500">Please enter a valid YouTube Shorts URL</p>}
      {isValid && videoUrl && <VideoFrame videoUrl={videoUrl} />}
    </div>
  );
}
