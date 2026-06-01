
import React from 'react';
import { Crosshair } from 'lucide-react';
export default function AttackVector() {
  return (
    <div className="glass-panel">
      <h2><Crosshair size={24} style={{verticalAlign: 'middle', marginRight: '8px'}} />2. Attack Vector & Risk</h2>
      <ul>
        <li><strong>Reconnaissance:</strong> Hedef uygulamanın <code>AndroidManifest.xml</code> dosyası üzerinden dışa açık (exported) IPC uç noktaları keşfedilir.</li>
        <li><strong>Exploitation:</strong> Saldırgan, özel hazırlanmış bir <code>Parcelable</code> nesnesini Intent Extras ile hedefe yollar.</li>
        <li><strong>Impact:</strong> Uygulama yetkileri kapsamında Uzaktan Kod Çalıştırma (RCE) sağlanır.</li>
      </ul>
    </div>
  );
}
