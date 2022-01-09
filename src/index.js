import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { FirebaseAppProvider } from 'reactfire';
import { AuthProvider } from './context/auth';
import FirebaseProviders from 'context/firebaseProviders';

import NewApp from 'NewApp';

// Firebase config
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

// Root render
ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProviders>
        <NewApp />
      </FirebaseProviders>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
