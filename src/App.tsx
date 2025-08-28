import React, { useState } from 'react';
import './App.css';
import QRGenerator from './components/QRGenerator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <div className="site-logo">
              <div className="logo-icon">🔢</div>
              <div className="logo-text">
                <h1 className="hero-title">QR Kod Oluşturucu</h1>
                <p className="site-url">qr.itoch.tr</p>
              </div>
            </div>
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
