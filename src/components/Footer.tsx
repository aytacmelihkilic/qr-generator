import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <h3 className="footer-title">QR Kod Oluşturucu</h3>
            <p className="footer-description">
              URL'lerinizi, metinlerinizi ve verilerinizi hızlıca QR kodlara dönüştürün. 
              Özelleştirilebilir tasarımlar ve kolay indirme seçenekleri.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Özellikler</h4>
            <ul className="footer-links">
              <li>QR Kod Oluşturma</li>
              <li>Logo Ekleme</li>
              <li>Renk Özelleştirme</li>
              <li>Kolay İndirme</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">İletişim</h4>
            <div className="footer-contact">
              <p>
                <a href="mailto:aytacmelihkilic@gmail.com" className="contact-link">
                  📧 aytacmelihkilic@gmail.com
                </a>
              </p>
              <p>
                <a href="https://www.linkedin.com/in/aytacmelihkilic/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  💼 LinkedIn
                </a>
              </p>
              <p>
                <a href="https://github.com/aytacmelihkilic" target="_blank" rel="noopener noreferrer" className="contact-link">
                  🐙 GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 QR Kod Oluşturucu. Tüm hakları saklıdır.</p>
          </div>
          <div className="footer-credits">
            <p>
              <span className="heart">❤️</span> 
              Aytaç Melih Kılıç tarafından yapılmıştır
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
