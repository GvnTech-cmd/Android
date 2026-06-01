
import React from 'react';
import { ShieldCheck } from 'lucide-react';
export default function Remediation() {
  return (
    <div className="glass-panel">
      <h2><ShieldCheck size={24} style={{verticalAlign: 'middle', marginRight: '8px'}} />3. Remediation (Hardening)</h2>
      <div className="grid">
        <div>
          <h3>Ağ & IPC İzolasyonu</h3>
          <p>Bileşenleri <code>android:exported="false"</code> yapın veya sıkı <code>signature</code> izinleriyle koruyun.</p>
        </div>
        <div>
          <h3>Girdi Doğrulama</h3>
          <p>Yeni Type-Safe Android API'leri kullanarak (<code>getSerializableExtra(String, Class)</code>) deserialization öncesi whitelist kontrolü yapın.</p>
        </div>
      </div>
    </div>
  );
}
