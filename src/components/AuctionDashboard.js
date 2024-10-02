import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";
import PlayerList from './PlayerList';
import Notification from './Notification';
import Sponsors from './Sponsors';
import LiveStream from './LiveStream';
import AuctionOverlay from './AuctionOverlay';
import { doc, updateDoc } from "firebase/firestore"; // Adjust the import statement based on your Firebase SDK version


const AuctionDashboard = () => {
 
  const currentDateTime = new Date(); // Current date and time
  const auctionEndTime = new Date(currentDateTime.getTime() + 3600000); // Example: 1 hour from now
  const timeRemaining = auctionEndTime - currentDateTime;
  
  const [auctions, setAuctions] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState('');
  const streamUrl = "https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"; // Update with your channel ID
  


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "auctions"), (snapshot) => {
      const auctionData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAuctions(auctionData);
    });
    return () => unsubscribe();
  }, []);

  const placeBid = async (playerId) => {
    if (selectedPlayer && Number(currentBid) > (selectedPlayer.currentBid || 0)) {
      // Update player with new bid
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        currentBid: Number(currentBid),
        // Update the team or user who placed the bid if required
      });
      setCurrentBid(''); // Clear the input after placing the bid
    } else {
      alert(`Bid must be greater than the current bid of ${selectedPlayer.currentBid || 0}`);
    }
  };

  return (
    <div>
      <h2>Auction Dashboard</h2>
      <Notification />
      <Sponsors />
      <LiveStream streamUrl={streamUrl} />
      <AuctionOverlay 
        currentBid={currentBid} 
        selectedPlayer={selectedPlayer} 
        timeRemaining={timeRemaining} 
      />
      {auctions.map(auction => (
        <div key={auction.id}>
          <h3>{auction.auctionName}</h3>
          <p>Sport Type: {auction.sportType}</p>
          {/* Auction details */}
        </div>
      ))}

      <h2>Available Players</h2>
      <PlayerList onSelectPlayer={setSelectedPlayer} />
      {selectedPlayer && (
        <div>
          <h3>Bidding on: {selectedPlayer.playerName}</h3>
          <p>Current Bid: {selectedPlayer.currentBid || 0}</p>
          <input
            type="number"
            placeholder="Your Bid"
            value={currentBid}
            onChange={(e) => setCurrentBid(e.target.value)}
          />
          <button onClick={() => placeBid(selectedPlayer.id)}>Place Bid</button>
        </div>
      )}
    </div>
  );
};

export default AuctionDashboard;
