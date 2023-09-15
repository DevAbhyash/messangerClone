// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATurCcRgq0mOpqm4bg-gaZhH_uBf8k1xs",
  authDomain: "messangerclone-01.firebaseapp.com",
  projectId: "messangerclone-01",
  storageBucket: "messangerclone-01.appspot.com",
  messagingSenderId: "1052526345257",
  appId: "1:1052526345257:web:7de2fa725f0583fdc23038",
  measurementId: "G-VLJWJVPEK9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
