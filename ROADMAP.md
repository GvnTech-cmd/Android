# ROADMAP

> "Önce anla, sonra kodla." Her problemi küçük, sıralı parçalara böl. Bir dedektif gibi düşün: gözlemle, ham veriyi çevir, desenleri tespit et, raporla.

## Faz 0: Yazmadan Önce Anla
- Android işletim sisteminin Binder IPC mimarisini teorik düzeyde incelemek.
- Deserialization ve Type Confusion zafiyetlerinin temel çalışma mantığını (CVE-2023 benzeri eski vakalardan yola çıkarak) kavramak.
- İstinye Üniversitesi BGT006 Sızma Testi dersi proje gereksinimlerini bütünüyle analiz etmek.

## Faz 1: Araştırma ve Keşif (→ docs/research/)
- `docs/research/` dizinine Android'in güvensiz `Parcelable` işleyişi hakkında notlar çıkarılması.
- Zafiyetlerin nasıl sömürüleceğine dair PoC senaryolarının araştırılması (Red Team bakış açısı).
- Ağ topolojisi ve interaktif gösterge paneli (SecOps Dashboard) tasarımı için React/Vite mimarisinin incelenmesi.

## Faz 2: Ortam Kurulumu
- Vite, React ve TypeScript kullanarak temel proje iskeletinin ayağa kaldırılması.
- Node.js ve Docker ortam değişkenlerinin (`.env.example`) hazırlanması.
- `docker-compose.yml` ve `Dockerfile` dosyalarının yapılandırılarak izolasyonun sağlanması.

## Faz 3: Uygulama
1. Temel bileşenlerin (App.tsx, NetworkGraph.tsx) oluşturulması.
2. Glassmorphism ve Cyberpunk temalı UI CSS'inin yazılması.
3. IPC zafiyeti simülasyon mantığının (Attacker -> Binder -> Target App) kodlanması.
4. Loglama (`src/utils/logger.ts`) mekanizmasının eklenmesi.
5. "Red Team vs Blue Team" stratejilerini gösteren bilgi panellerinin yapılması.
6. Mermaid diyagramı ile teknik mimarinin görselleştirilmesi.
7. Nessus simülasyon raporlarının (`reports/`) projeye gömülmesi.

## Faz 4: Test ve Raporlama
- `npm run dev` ve `docker-compose up` ile projenin test edilmesi.
- UI/UX duyarlılığının mobil ve masaüstü çözünürlüklerde test edilmesi.
- Zafiyet Değerlendirme Raporu (`Vulnerability_Assessment_Report.md`) çıktılarının gözden geçirilip CVSS skorlarının doğrulanması.

## Faz 5: Teslim Kontrol Listesi
- [x] Özel README formatı uygulandı mı?
- [x] ROADMAP.md eklendi mi?
- [x] Tüm docker dosyaları (Dockerfile, docker-compose) mevcut mu?
- [x] Belgeler (`docs/modules`, `docs/research`, `docs/references`) oluşturuldu mu?
- [x] Danışman Hoca collaborator olarak eklendi mi? (Son adımda yapılacak)
