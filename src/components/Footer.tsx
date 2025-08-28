import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <h3 className="footer-title">ITOCH QR Generator</h3>
            <p className="footer-description">
              URL'lerinizi, metinlerinizi ve verilerinizi hızlıca QR kodlara dönüştürün. 
              Özelleştirilebilir tasarımlar ve kolay indirme seçenekleri.
            </p>
          </div>
          
          <div className="footer-section" id="features">
            <h4 className="footer-subtitle">Özellikler</h4>
            <ul className="footer-links">
              <li>QR Kod Oluşturma</li>
              <li>Logo Ekleme</li>
              <li>Renk Özelleştirme</li>
              <li>Kolay İndirme</li>
              <li>Mobil Uyumlu</li>
              <li>Paylaşım Özellikleri</li>
            </ul>
          </div>
          
          <div className="footer-section" id="about">
            <h4 className="footer-subtitle">Hakkında</h4>
            <div className="footer-description">
              <p>
                ITOCH QR Generator, modern ve kullanıcı dostu bir QR kod oluşturma aracıdır. 
                Hızlı, güvenli ve özelleştirilebilir QR kodlar oluşturmanızı sağlar.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Teknolojiler: React, TypeScript, QRCode.js
              </p>
            </div>
          </div>
          
          <div className="footer-section" id="contact">
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
            <p>&copy; 2024 ITOCH QR Generator. Tüm hakları saklıdır.</p>
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
