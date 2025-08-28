import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">
          <span className="logo-icon">🔢</span>
          <span className="logo-text">QR Kod Oluşturucu</span>
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Ana Sayfa</a></li>
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
