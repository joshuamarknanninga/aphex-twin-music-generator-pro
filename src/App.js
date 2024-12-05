// src/App.js
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/Header';
import MusicGenerator from './components/MusicGenerator';
import About from './components/About';
import Contact from './components/Contact';
import AppFooter from './components/Footer';

function App() {
  return (
    <div>
      <AppHeader />
      <Container style={{ marginTop: '7em', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<MusicGenerator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;
