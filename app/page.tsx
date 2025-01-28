import Head from 'next/head';

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

  const metaTags = `
    <meta property="og:video" content="https://www.youtube.com/watch?v=${videoId}" />
    <meta property="og:video:secure_url" content="https://www.youtube.com/watch?v=${videoId}" />
    <meta property="og:image" content="https://img.youtube.com/vi/${videoId}/0.jpg" />
    <meta property="og:title" content="YouTube Video Embed" />
    <meta property="og:description" content="A short description of the YouTube video" />
  `;

  return (
    <>
      <Head>
        <meta property="og:video" content={`https://www.youtube.com/watch?v=${videoId}`} />
        <meta property="og:image" content={`https://img.youtube.com/vi/${videoId}/0.jpg`} />
        <meta property="og:title" content="YouTube Video Embed" />
        <meta property="og:description" content="A short description of the YouTube video" />
      </Head>
      <div className="video-frame-container">
        <iframe
          className="video-frame"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};
