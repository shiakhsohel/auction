// src/components/AuctionCreation.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; // Firestore imports

const AuctionCreation = () => {
  const [auctionName, setAuctionName] = useState('');
  const [sportType, setSportType] = useState('');
  const [minBid, setMinBid] = useState('');
  const [bidIncrement, setBidIncrement] = useState('');
  const [playersPerTeam, setPlayersPerTeam] = useState('');

  const createAuction = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "auctions"), {
        auctionName,
        sportType,
        minBid: Number(minBid),
        bidIncrement: Number(bidIncrement),
        playersPerTeam: Number(playersPerTeam),
        currentBid: 0, // Initialize current bid
      });
      // Clear form after submission
      setAuctionName('');
      setSportType('');
      setMinBid('');
      setBidIncrement('');
      setPlayersPerTeam('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={createAuction}>
      <h2>Create Auction</h2>
      <input type="text" placeholder="Auction Name" value={auctionName} onChange={(e) => setAuctionName(e.target.value)} required />
      <select value={sportType} onChange={(e) => setSportType(e.target.value)} required>
        <option value="">Select Sport</option>
        <option value="Cricket">Cricket</option>
        <option value="Football">Football</option>
        <option value="Kabaddi">Kabaddi</option>
        <option value="Volleyball">Volleyball</option>
      </select>
      <input type="number" placeholder="Minimum Bid" value={minBid} onChange={(e) => setMinBid(e.target.value)} required />
      <input type="number" placeholder="Bid Increment" value={bidIncrement} onChange={(e) => setBidIncrement(e.target.value)} required />
      <input type="number" placeholder="Players per Team" value={playersPerTeam} onChange={(e) => setPlayersPerTeam(e.target.value)} required />
      <button type="submit">Create Auction</button>
    </form>
  );
};

export default AuctionCreation;
