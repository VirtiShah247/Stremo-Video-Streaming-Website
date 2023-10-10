// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEl2r1VX9702L9f3mJHepMN3PuKbWvBKs",
  authDomain: "movie-streaming-website-99c47.firebaseapp.com",
  projectId: "movie-streaming-website-99c47",
  storageBucket: "movie-streaming-website-99c47.appspot.com",
  messagingSenderId: "60132497241",
  appId: "1:60132497241:web:0f5b8770b68c1c009bde48",
  measurementId: "G-GPRTXQC9LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);