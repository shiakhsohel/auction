// src/components/PlayerManagement.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const PlayerManagement = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerImage, setPlayerImage] = useState('');
  const [playerCategory, setPlayerCategory] = useState('');
  const [basePrice, setBasePrice] = useState('');

  const addPlayer = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "players"), {
        playerName,
        playerImage,
        playerCategory,
        basePrice: Number(basePrice)
      });
      setPlayerName('');
      setPlayerImage('');
      setPlayerCategory('');
      setBasePrice('');
    } catch (error) {
      console.error("Error adding player: ", error);
    }
  };

  return (
    <form onSubmit={addPlayer}>
      <h2>Add Player</h2>
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Player Image URL"
        value={playerImage}
        onChange={(e) => setPlayerImage(e.target.value)}
        required
      />
      <select value={playerCategory} onChange={(e) => setPlayerCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Batsman">Batsman</option>
        <option value="Bowler">Bowler</option>
        <option value="All-Rounder">All-Rounder</option>
        {/* Add more categories as needed */}
      </select>
      <input
        type="number"
        placeholder="Base Price"
        value={basePrice}
        onChange={(e) => setBasePrice(e.target.value)}
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerManagement;
