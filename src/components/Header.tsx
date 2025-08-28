import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">
          <img src="/itoch-logo.svg" alt="ITOCH Logo" className="logo-image" />
          <span className="logo-text">ITOCH QR Generator</span>
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#features">Özellikler</a></li>
            <li><a href="#about">Hakkında</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
