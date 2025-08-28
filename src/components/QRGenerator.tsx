import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Share2, Palette, Image, Settings, Upload } from 'lucide-react';

interface QRConfig {
  text: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  includeLogo: boolean;
  logoFile?: File;
  logoUrl?: string;
  logoSize: number;
  logoCornerRadius: number;
}

const QRGenerator: React.FC = () => {
  const [config, setConfig] = useState<QRConfig>({
    text: '',
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    includeLogo: false,
    logoSize: 15,
    logoCornerRadius: 8,
  });
  
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateQR = async () => {
    if (!config.text.trim()) {
      alert('Lütfen bir URL veya metin girin!');
      return;
    }

    setIsGenerating(true);
    try {
      const qrOptions = {
        width: config.size,
        margin: 1,
        color: {
          dark: config.foregroundColor,
          light: config.backgroundColor,
        },
        errorCorrectionLevel: 'H' as const, // Logo için en yüksek hata düzeltme
      };

      const qrDataUrl = await QRCode.toDataURL(config.text, qrOptions);
      
      // Logo ekleme işlemi
      let finalQRUrl = qrDataUrl;
      if (config.includeLogo && logoPreview) {
        finalQRUrl = await addLogoToQR(qrDataUrl, logoPreview);
      }
      
      setQrCodeUrl(finalQRUrl);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('QR kod oluşturulurken hata:', error);
      alert('QR kod oluşturulurken bir hata oluştu!');
    } finally {
      setIsGenerating(false);
    }
  };

  const addLogoToQR = async (qrDataUrl: string, logoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Canvas context alınamadı');
        resolve(qrDataUrl);
        return;
      }

      const qrImage = new window.Image();
      const logoImage = new window.Image();

      qrImage.onload = () => {
        canvas.width = qrImage.width;
        canvas.height = qrImage.height;

        // QR kodunu çiz
        ctx.drawImage(qrImage, 0, 0);

        logoImage.onload = () => {
          try {
            // Logo boyutunu hesapla
            const logoSize = (config.logoSize / 100) * qrImage.width;
            const logoX = (qrImage.width - logoSize) / 2;
            const logoY = (qrImage.height - logoSize) / 2;

            // Logo için beyaz arka plan
            ctx.fillStyle = config.backgroundColor;
            ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

            // Logoyu çiz
            ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);

            resolve(canvas.toDataURL('image/png'));
          } catch (error) {
            console.error('Logo ekleme hatası:', error);
            resolve(qrDataUrl);
          }
        };

        logoImage.onerror = () => {
          console.error('Logo yüklenemedi');
          resolve(qrDataUrl);
        };

        logoImage.src = logoUrl;
      };

      qrImage.onerror = () => {
        console.error('QR kod yüklenemedi');
        resolve(qrDataUrl);
      };

      qrImage.src = qrDataUrl;
    });
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return;
    
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      alert('QR kod URL\'si panoya kopyalandı!');
    } catch (error) {
      console.error('Kopyalama hatası:', error);
      alert('Kopyalama işlemi başarısız oldu!');
    }
  };

  const shareQR = async () => {
    if (!qrCodeUrl) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Kod',
          text: 'Oluşturduğum QR kod',
          url: qrCodeUrl,
        });
      } catch (error) {
        console.error('Paylaşım hatası:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (1MB'dan küçük olmalı)
    if (file.size > 1024 * 1024) {
      alert('Logo dosyası 1MB\'dan küçük olmalıdır!');
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası seçin!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoPreview(result);
      setConfig(prev => ({ 
        ...prev, 
        logoFile: file,
        logoUrl: result 
      }));
    };
    reader.onerror = () => {
      alert('Logo dosyası okunamadı!');
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview('');
    setConfig(prev => ({ 
      ...prev, 
      logoFile: undefined,
      logoUrl: undefined 
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearQR = () => {
    setQrCodeUrl('');
    setConfig(prev => ({ ...prev, text: '' }));
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="qr-generator">
      <div className="generator-header">
        <h2 className="generator-title">QR Kod Oluşturucu</h2>
        <p className="generator-subtitle">
          URL'lerinizi, metinlerinizi ve verilerinizi hızlıca QR kodlara dönüştürün
        </p>
      </div>

      <div className="generator-content">
        {/* Sol taraf - Giriş ve ayarlar */}
        <div className="input-section">
          <div className="input-group">
            <label className="input-label">URL veya Metin</label>
            <textarea
              className="input-field textarea-field"
              placeholder="https://example.com veya herhangi bir metin girin..."
              value={config.text}
              onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
            />
          </div>

          <div className="input-group">
            <label className="input-label">QR Kod Boyutu: {config.size}px</label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={config.size}
              onChange={(e) => setConfig(prev => ({ ...prev, size: parseInt(e.target.value) }))}
              className="size-slider"
            />
          </div>

          <div className="customization-section">
            <h3 className="customization-title">
              <Palette size={20} />
              Özelleştirme
            </h3>
            
            <div className="customization-grid">
              <div className="customization-item">
                <label className="input-label">Ön Plan Rengi</label>
                <input
                  type="color"
                  value={config.foregroundColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, foregroundColor: e.target.value }))}
                  className="color-input"
                />
              </div>

              <div className="customization-item">
                <label className="input-label">Arka Plan Rengi</label>
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="color-input"
                />
              </div>
            </div>

            {/* Logo Ayarları */}
            <div className="input-group" style={{ marginTop: '1rem' }}>
              <label className="input-label">
                <input
                  type="checkbox"
                  checked={config.includeLogo}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeLogo: e.target.checked }))}
                  style={{ marginRight: '0.5rem' }}
                />
                Logo Ekle
              </label>
              
              {config.includeLogo && (
                <div className="logo-settings">
                  {/* Logo Yükleme Alanı */}
                  <div className="logo-upload-area">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                    />
                    
                    {!logoPreview ? (
                      <div className="logo-upload-placeholder" onClick={triggerFileUpload}>
                        <Upload size={32} style={{ marginBottom: '0.5rem', color: '#6b7280' }} />
                        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                          Logo yüklemek için tıklayın
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                          PNG, JPG, SVG (Max: 1MB)
                        </p>
                      </div>
                    ) : (
                      <div className="logo-preview-container">
                        <img 
                          src={logoPreview} 
                          alt="Logo önizleme" 
                          className="logo-preview-image"
                        />
                        <div className="logo-preview-actions">
                          <button 
                            className="logo-action-btn"
                            onClick={triggerFileUpload}
                          >
                            Değiştir
                          </button>
                          <button 
                            className="logo-action-btn remove"
                            onClick={removeLogo}
                          >
                            Kaldır
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Logo Kontrolleri */}
                  {logoPreview && (
                    <div className="logo-controls">
                      <div className="input-group">
                        <label className="input-label">Logo Boyutu: {config.logoSize}%</label>
                        <input
                          type="range"
                          min="8"
                          max="25"
                          step="1"
                          value={config.logoSize}
                          onChange={(e) => setConfig(prev => ({ ...prev, logoSize: parseInt(e.target.value) }))}
                          className="size-slider"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className="generate-btn"
            onClick={generateQR}
            disabled={isGenerating}
          >
            {isGenerating ? 'Oluşturuluyor...' : 'QR Kod Oluştur'}
          </button>

          {showSuccess && (
            <div className="success-message">
              QR kod başarıyla oluşturuldu! 🎉
            </div>
          )}
        </div>

        {/* Sağ taraf - QR kod görüntüleme */}
        <div className="qr-display">
          <div className="qr-container" ref={qrContainerRef}>
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Oluşturulan QR Kod"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ) : (
              <div className="qr-placeholder">
                <Settings size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>QR kodunuz burada görünecek</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Sol taraftan ayarları yapın ve "QR Kod Oluştur" butonuna tıklayın
                </p>
              </div>
            )}
          </div>

          {qrCodeUrl && (
            <div className="qr-actions">
              <button className="action-btn primary" onClick={downloadQR}>
                <Download size={16} />
                İndir
              </button>
              
              <button className="action-btn" onClick={copyToClipboard}>
                <Copy size={16} />
                Kopyala
              </button>
              
              <button className="action-btn" onClick={shareQR}>
                <Share2 size={16} />
                Paylaş
              </button>
              
              <button className="action-btn" onClick={clearQR}>
                Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
