import React from "react";
import { createRoot } from "react-dom/client"
import "./index.css";

import { FirebaseAppProvider } from "reactfire";
import { AuthProvider } from "./context/auth";
import FirebaseProviders from "./context/firebaseProviders";

import App from "./app/App";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";

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

// explore this method later?
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
const root = createRoot(document.getElementById("root")!)
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
