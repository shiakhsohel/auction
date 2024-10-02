// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDcVLt2MIzwuMVA5hpzHoTUtXxn2kzvkEA",
  authDomain: "auction-3fe5a.firebaseapp.com",
  databaseURL: "https://auction-3fe5a-default-rtdb.firebaseio.com",
  projectId: "auction-3fe5a",
  storageBucket: "auction-3fe5a.appspot.com",
  messagingSenderId: "1099210506457",
  appId: "1:1099210506457:web:1ff5f7c6a35a460252bec8",
  measurementId: "G-4E3385LGZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // Initialize Firestore
