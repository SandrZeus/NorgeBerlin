import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import Home from './Pages/Home';
import Aktuelles from './Pages/Aktuelles';
import Events from './Pages/Events';
import Gasteltern from './Pages/Gasteltern';
import Gastschueler from './Pages/Gastschueler';
import Berlintour from './Pages/Berlintour';
import Partner from './Pages/Partner';
import Organisation from './Pages/Organisation';
import Kontakt from './Pages/Kontakt';

function App() {

  return (
    <Router>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/aktuelles" element={<Aktuelles />} />
        <Route path="/events" element={<Events />} />
        <Route path="/informationen-fuer-gasteltern" element={<Gasteltern />} />
        <Route path="/informationen-fuer-gastschueler" element={<Gastschueler />} />
        <Route path="/berlintour" element={<Berlintour />} />
        <Route path="/partnerschulen" element={<Partner />} />
        <Route path="/organisation" element={<Organisation />} />
        <Route path="/kontakt" element={<Kontakt />} />
        
      </Routes>
    </Router>
  )
}

export default App
