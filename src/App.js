// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuctionCreation from './components/AuctionCreation';
import AuctionDashboard from './components/AuctionDashboard';
import TeamManagement from './components/TeamManagement';
import PlayerManagement from './components/PlayerManagement';
import AdminLogin from './components/AdminLogin';
import PostAuction from './components/PostAuction';


const App = () => {
  const currentDateTime = new Date(); // Current date and time
  const auctionEndTime = new Date(currentDateTime.getTime() + 3600000); // 1 hour from now
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin access

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAdmin ? <AuctionDashboard /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/create-auction" element={<AuctionCreation />} />
        <Route path="/manage-teams" element={isAdmin ? <TeamManagement /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/manage-players" element={isAdmin ? <PlayerManagement /> : <AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/post-auction" element={currentDateTime < auctionEndTime ? <PostAuction /> : null} />
      </Routes>
    </Router>
  );
};

export default App;
