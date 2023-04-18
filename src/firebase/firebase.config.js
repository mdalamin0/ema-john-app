// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK0_o1sfX3J6xG3MOhRYnKAtL_0m39wsI",
  authDomain: "ema-john-with-firebase-a-a9cf0.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-a9cf0",
  storageBucket: "ema-john-with-firebase-a-a9cf0.appspot.com",
  messagingSenderId: "575541356491",
  appId: "1:575541356491:web:554d71b9a3f4d1e060f84e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;