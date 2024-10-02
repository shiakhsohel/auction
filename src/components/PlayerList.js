// src/components/PlayerList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      const playerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(playerData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Players</h2>
      {players.map(player => (
        <div key={player.id}>
          <h3>{player.playerName}</h3>
          <img src={player.playerImage} alt={player.playerName} width="100" />
          <p>Category: {player.playerCategory}</p>
          <p>Base Price: {player.basePrice}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
