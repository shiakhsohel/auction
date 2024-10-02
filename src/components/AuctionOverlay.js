// src/components/AuctionOverlay.js
import React from 'react';

const AuctionOverlay = ({ currentBid, selectedPlayer, timeRemaining }) => {
  return (
    <div className="overlay">
      <h3>Current Bid: {currentBid}</h3>
      <h4>Player: {selectedPlayer ? selectedPlayer.playerName : 'None'}</h4>
      <p>Time Remaining: {timeRemaining} seconds</p>
    </div>
  );
};

export default AuctionOverlay;
