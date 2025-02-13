import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import Home from './Pages/Home';
import Aktuelles from './Pages/Aktuelles';
import AktuellesDetail from './Components/AktuellesDetail';
import Gasteltern from './Pages/Gasteltern';
import Gastschueler from './Pages/Gastschueler';
import Berlintour from './Pages/Berlintour';
import Partner from './Pages/Partner';
import Organisation from './Pages/Organisation';
import Kontakt from './Pages/Kontakt';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  // Store the token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);  // Save token in localStorage
    } else {
      localStorage.removeItem('token');  // Remove token from localStorage if it's null
    }
  }, [token]);

  return (
    <Router>
      <Header />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/aktuelles" element={<Aktuelles />} />
        <Route path="/aktuelles/:id" element={<AktuellesDetail />} />
        <Route path="/informationen-fuer-gasteltern" element={<Gasteltern />} />
        <Route path="/informationen-fuer-gastschueler" element={<Gastschueler />} />
        <Route path="/berlintour" element={<Berlintour />} />
        <Route path="/partnerschulen" element={<Partner />} />
        <Route path="/organisation" element={<Organisation />} />
        <Route path="/kontakt" element={<Kontakt />} />

        <Route 
          path='/dashboard' 
          element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />} 
        />
        <Route path='/login' element={<Login setToken={setToken} />} />
        
      </Routes>
    </Router>
  )
}

export default App
