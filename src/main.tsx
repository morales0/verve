import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import FirebaseProviders from "./context/firebase";
import { app } from "./firebase/config";

// core styles are required for all packages
import "@mantine/core/styles.layer.css";

import "@mantine/carousel/styles.layer.css";
import "@mantine/charts/styles.layer.css";
import "@mantine/dates/styles.css";

import "./index.css";

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
