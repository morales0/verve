// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWFkdLm3ip4KDKV6Je82bMo-HHchAGy7g",
  authDomain: "workout-app-37a10.firebaseapp.com",
  databaseURL: "https://workout-app-37a10.firebaseio.com",
  projectId: "workout-app-37a10",
  storageBucket: "workout-app-37a10.appspot.com",
  messagingSenderId: "645282706661",
  appId: "1:645282706661:web:ad9a702c2c012dc54bd00c",
  measurementId: "G-26WXTMBPLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);