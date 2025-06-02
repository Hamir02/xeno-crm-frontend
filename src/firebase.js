// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBC1LCQNzCRwdE-rl4f1A4i0LEn7JIOhn0",
  authDomain: "xeno-95194.firebaseapp.com",
  projectId: "xeno-95194",
  storageBucket: "xeno-95194.firebasestorage.app",
  messagingSenderId: "1047583457758",
  appId: "1:1047583457758:web:6ee531397588a791d05d4f",
  measurementId: "G-1BBSXZKB8V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
