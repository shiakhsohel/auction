// src/components/PostAuction.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";

const PostAuction = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "auctionResults"), (snapshot) => {
      const resultData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(resultData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Auction Results</h2>
      {results.map(result => (
        <div key={result.id}>
          <h3>{result.playerName} sold to {result.teamName} for {result.finalPrice}</h3>
        </div>
      ))}
    </div>
  );
};

export default PostAuction;
