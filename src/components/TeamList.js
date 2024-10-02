// src/components/TeamList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {
      const teamData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeams(teamData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      {teams.map(team => (
        <div key={team.id}>
          <h3>{team.teamName}</h3>
          <img src={team.teamLogo} alt={team.teamName} width="100" />
        </div>
      ))}
    </div>
  );
};

export default TeamList;
