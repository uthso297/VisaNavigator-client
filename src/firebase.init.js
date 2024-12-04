// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtG-6vfyO8ifknH4AnK2aAVw9CxSlBdTQ",
  authDomain: "visa-navigator-portal-f4954.firebaseapp.com",
  projectId: "visa-navigator-portal-f4954",
  storageBucket: "visa-navigator-portal-f4954.firebasestorage.app",
  messagingSenderId: "1016131715035",
  appId: "1:1016131715035:web:8c89deabea67a80755b1fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);