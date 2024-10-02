// src/components/LiveStream.js
import React from 'react';

const LiveStream = ({ streamUrl }) => {
  return (
    <div className="live-stream-container">
      <h2>Live Auction Stream</h2>
      <iframe
        width="560"
        height="315"
        src={streamUrl}
        title="Live Stream"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default LiveStream;
