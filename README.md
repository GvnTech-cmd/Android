<div align="center">

# 📱 Android IPC SecOps Dashboard PoC
### 🎓 **Academic Research Project on Mobile Cyber Security**

```text
    _    _   _ ____  ____   ___ ___ ____  
   / \  | \ | |  _ \|  _ \ / _ \_ _|  _ \ 
  / _ \ |  \| | | | | |_) | | | | || | | |
 / ___ \| |\  | |_| |  _ <| |_| | || |_| |
/_/   \_\_| \_|____/|_| \_\\___/___|____/ 
                                          
```

**Department:** Bilişim Güvenliği Teknolojileri
**Course Code:** BGT006
**Course Name:** Sızma Testi
**Instructor:** Keyvan Arasteh Abbasabad

[![Vulnerability](https://img.shields.io/badge/CVE-Hypothetical--XXXX-red?style=for-the-badge)](https://github.com/)
[![Target](https://img.shields.io/badge/Target-Android%20Binder%20IPC-blue?style=for-the-badge)](https://github.com/)
[![Status](https://img.shields.io/badge/Status-Research%20Only-success?style=for-the-badge)](https://github.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/)
[![Python](https://img.shields.io/badge/Python-Red/Blue_Team-yellow?style=for-the-badge&logo=python&logoColor=white)](https://github.com/)

</div>

---

## 📑 1. Abstract (Proje Özeti)

Bu akademik proje, Android ekosistemindeki Inter-Process Communication (IPC) ve Binder üzerinden gerçekleşen kritik **Deserialization RCE (Uzaktan Kod Çalıştırma)** zafiyetinin çok boyutlu teknik analizini simüle eder.

Sıradan bir statik rapor hazırlamak yerine, **Glassmorphism**, **Cyberpunk estetiği** ve modern **Vite/React/TypeScript** teknolojileri harmanlanarak, ağ ve yazılım zafiyetlerinin modern web teknolojileri ile nasıl dinamik bir **"Güvenlik Gösterge Paneli" (SecOps Dashboard)** üzerinden raporlanabileceği kanıtlanmıştır. Tıpkı Tesla projesindeki gibi!

---

## 📊 2. Visualization & Interface (Dashboard Önizlemesi)

Geliştirilen interaktif Cybersecurity Dashboard, veriyi yalnızca metin olarak sunmaz; neon paneller ve cam efektleriyle destekler.
*(Proje `npm run dev` veya `docker-compose up` ile ayağa kaldırıldığında arayüz görüntülenebilir.)*

---

## ⚙️ 3. Vulnerability Mechanics (Zafiyetin Anatomisi)

Bu projenin simüle ettiği saldırı vektörü (Attack Vector), güvensiz deserialization zafiyetine dayanmaktadır:

| Faz | Açıklama | CVSS Puanı |
| :--- | :--- | :--- |
| **1. Reconnaissance** | `AndroidManifest.xml` analiz edilerek dışa açık, izinsiz IPC uç noktaları (Activity, Service) bulunur. | `N/A` |
| **2. Exploitation** | Özel hazırlanmış (crafted) `Parcelable` gadget zinciri, Intent Extras içerisine gömülerek hedefe gönderilir. Tersine serileştirme işlemi sırasında bellek bozulması ve RCE tetiklenir. | `9.8 / 10` |

---

## 🛡️ 4. Quick Start (Hızlı Kurulum)

Projeyi ayağa kaldırmak ve dashboard'u görüntülemek için:

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
\n\n## 📄 License\nThis project is for academic purposes only.\n\n## 🤝 Contributing\nFeel free to open a PR!\n\n## 🛠️ Stack\n- React\n- Vite\n- TypeScript\n> **Note:** Requires Docker or Node.js 18+\n
## 📐 Architecture
See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed project structure.

## 🔒 Security
See [SECURITY.md](docs/SECURITY.md) for our security policy.
