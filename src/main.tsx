import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './assets/components/auth/Login.tsx'
import Signup from './assets/components/auth/Signup.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import AuthRoute from './assets/components/auth/AuthRoute.tsx'

const firebaseConfig = {
  apiKey: "AIzaSyCK4MsecfdAYYQxejmkeLWp5z4TQertKCg",
  authDomain: "balanse-53baf.firebaseapp.com",
  databaseURL: "https://balanse-53baf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "balanse-53baf",
  storageBucket: "balanse-53baf.firebasestorage.app",
  messagingSenderId: "254186408413",
  appId: "1:254186408413:web:a06e33513683fac6e3ce34",
  measurementId: "G-P53GRHCJN3"
};

initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
