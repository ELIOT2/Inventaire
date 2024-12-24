// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH--W6-bJQEmbvPPYEIY2bIBtLpqWNM4M",
  authDomain: "iventairelpn.firebaseapp.com",
  projectId: "iventairelpn",
  storageBucket: "iventairelpn.firebasestorage.app",
  messagingSenderId: "828438498749",
  appId: "1:828438498749:web:ddb373c25371d258e5d6d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);