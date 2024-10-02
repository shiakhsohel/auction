// src/components/TeamManagement.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const TeamManagement = () => {
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState('');

  const addTeam = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "teams"), {
        teamName,
        teamLogo
      });
      setTeamName('');
      setTeamLogo('');
    } catch (error) {
      console.error("Error adding team: ", error);
    }
  };

  return (
    <form onSubmit={addTeam}>
      <h2>Add Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Team Logo URL"
        value={teamLogo}
        onChange={(e) => setTeamLogo(e.target.value)}
        required
      />
      <button type="submit">Add Team</button>
    </form>
  );
};

export default TeamManagement;
