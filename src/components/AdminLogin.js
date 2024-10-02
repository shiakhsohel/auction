// src/components/AdminLogin.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdminLogin = ({ setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    // Predefined admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'password@123';

    // Check if the entered credentials match the predefined admin credentials
    if (email === adminEmail && password === adminPassword) {
      setIsAdmin(true); // Set admin state to true
      return; // Exit the function after successful login
    }

    // If using Firebase Authentication, uncomment this section for actual authentication
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAdmin(true); // Set admin state to true
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
    

    // If the credentials don't match
    alert("Invalid email or password");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
