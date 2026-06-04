<div align="center">
  <a href="https://istinye.edu.tr">
    <img src="https://upload.wikimedia.org/wikipedia/tr/6/6f/Istinye_Universitesi_logo.png" alt="İstinye Üniversitesi" width="180"/>
  </a>

  # Android IPC SecOps Dashboard

  ![GitHub](https://img.shields.io/badge/GitHub-Private-red?style=flat-square&logo=github)
  ![Dil](https://img.shields.io/badge/Dil-TypeScript-blue?style=flat-square)
  ![Durum](https://img.shields.io/badge/Durum-Devam%20Ediyor-yellow?style=flat-square)
  ![Ders](https://img.shields.io/badge/Ders-BGT006-purple?style=flat-square)
</div>

---

### Danışman Bilgisi
| | |
|---|---|
| **Ad Soyad** | Keyvan Arasteh |
| **GitHub** | [@keyvanarasteh](https://github.com/keyvanarasteh) |
| **E-posta** | keyvan.arasteh@istinye.edu.tr |
| **LinkedIn** | [keyvanarasteh](https://linkedin.com/in/keyvanarasteh) |
| **Web Sitesi** | [qline.tech](https://qline.tech) |

### Öğrenci Bilgisi
| | |
|---|---|
| **Ad Soyad** | [Adınız Soyadınız] |
| **Öğrenci No** | [İlk 4]****[Son 4] |

### Ders Bilgileri
| | |
|---|---|
| **Ders Adı** | Sızma Testi |
| **Ders Kodu** | BGT006 |
| **Kredi** | 3 AKTS |
| **Ön Koşullar** | Ağ Temelleri, Linux CLI |
| **Dönem** | 2025-2026 Bahar |

---

## 📑 Proje Özeti (Abstract)

Bu akademik proje, Android ekosistemindeki Inter-Process Communication (IPC) ve Binder üzerinden gerçekleşen kritik **Deserialization RCE (Uzaktan Kod Çalıştırma)** zafiyetinin çok boyutlu teknik analizini simüle eder. Sıradan bir statik rapor hazırlamak yerine, **Glassmorphism**, **Cyberpunk estetiği** ve modern web teknolojileri harmanlanarak bir **"Güvenlik Gösterge Paneli" (SecOps Dashboard)** geliştirilmiştir.

## 📄 Teslim Edilen Zafiyet Raporları
Hocanın talep ettiği hedef sistem analiz ve değerlendirme raporlarına aşağıdaki bağlantılardan ulaşabilirsiniz:
- 📊 **[Vulnerability Assessment Report](reports/Vulnerability_Assessment_Report.md)** *(CVE eşleştirme, Risk Matrisi, Düzeltme Önerileri)*
- 🟢 **[Simulated Nessus Scan Results](reports/Nessus_Scan_Results.csv)** *(Nessus/OpenVAS Tarama Çıktısı)*
- 🗺️ **[Proje Yol Haritası (Roadmap)](ROADMAP.md)**

## 🛡️ Hızlı Kurulum

Projeyi ayağa kaldırmak ve interaktif gösterge panelini (dashboard) görüntülemek için:

### Docker ile:
```bash
docker-compose up -d
# Go to http://localhost:8080
```

### Node.js (Vite) ile:
```bash
npm install
npm run dev
# Go to http://localhost:5173
```
