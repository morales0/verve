import { initializeApp } from "firebase/app";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import FirebaseProviders from "./context/firebase";
// core styles are required for all packages
import "@mantine/core/styles.layer.css";
import "@mantine/carousel/styles.layer.css";
import "@mantine/charts/styles.layer.css";

import "./index.css";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAWFkdLm3ip4KDKV6Je82bMo-HHchAGy7g",
  authDomain: "workout-app-37a10.firebaseapp.com",
  databaseURL: "https://workout-app-37a10.firebaseio.com",
  projectId: "workout-app-37a10",
  storageBucket: "workout-app-37a10.appspot.com",
  messagingSenderId: "645282706661",
  appId: "1:645282706661:web:ad9a702c2c012dc54bd00c",
  measurementId: "G-26WXTMBPLN",
};

const app = initializeApp(firebaseConfig);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseProviders app={app}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseProviders>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
