import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import QRGenerator from './components/QRGenerator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h1 className="hero-title">ITOCH QR Generator</h1>
            <p className="hero-subtitle">
              URL'lerinizi, metinlerinizi ve verilerinizi hızlıca QR kodlara dönüştürün. 
              Özelleştirilebilir tasarımlar ve kolay indirme seçenekleri.
            </p>
          </div>
          <QRGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
