// src/components/Sponsors.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sponsors"), (snapshot) => {
      const sponsorData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSponsors(sponsorData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="sponsor-container">
      <h2>Sponsors</h2>
      {sponsors.map(sponsor => (
        <img key={sponsor.id} src={sponsor.logoUrl} alt={sponsor.name} width="100" />
      ))}
    </div>
  );
};

export default Sponsors;
