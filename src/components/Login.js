// src/components/Login.js
import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successful sign-in
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Login to Auction App</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
