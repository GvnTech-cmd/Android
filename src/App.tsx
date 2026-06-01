import { useState } from 'react'
import NetworkGraph from './NetworkGraph'

function App() {

  return (
    <div className="dashboard-container">
      <h1 className="cyber-title">Android IPC SecOps Dashboard</h1>
      
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <span className="badge badge-critical">CVSS: 9.8 Critical</span>
        <span className="badge badge-info">Target: Android Binder IPC</span>
        <span className="badge badge-critical">Vector: Deserialization RCE</span>
      </div>

      <div className="grid">
        <div className="glass-panel">
          <h2>1. Technical Summary</h2>
          <p>
            Zafiyetin kök nedeni (root-cause), Android'in Inter-Process Communication (IPC) mekanizması olan Binder üzerinden aktarılan serileştirilmiş verilerin hedef uygulama tarafından güvensiz bir şekilde tersine serileştirilmesidir.
          </p>
          <p>
            Özellikle <code>readSerializable()</code> çağrıları, gelen verinin tipini doğrulamadan bellekte yeniden inşa etmesi sonucu Type Confusion ve memory corruption hatalarına yol açar.
          </p>
        </div>

        <div className="glass-panel">
          <h2>2. Attack Vector & Risk</h2>
          <ul>
            <li><strong>Reconnaissance:</strong> Hedef uygulamanın <code>AndroidManifest.xml</code> dosyası üzerinden dışa açık (exported) IPC uç noktaları keşfedilir.</li>
            <li><strong>Exploitation:</strong> Saldırgan, özel hazırlanmış bir <code>Parcelable</code> nesnesini Intent Extras ile hedefe yollar.</li>
            <li><strong>Impact:</strong> Uygulama yetkileri kapsamında Uzaktan Kod Çalıştırma (RCE) sağlanır.</li>
          </ul>
        </div>
      </div>

      <NetworkGraph />

      <div className="glass-panel">
        <h2>3. Remediation (Hardening)</h2>
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

      <div className="glass-panel">
        <h2>4. Red/Blue Team Scripts</h2>
        <div className="grid">
          <div>
            <h3 style={{ color: 'var(--neon-red)' }}>Red Team PoC</h3>
            <pre>
{`adb shell am broadcast \\
  -n com.example.app/.Receiver \\
  --es payload_extra "QUFB..."`}
            </pre>
          </div>
          <div>
            <h3 style={{ color: 'var(--neon-blue)' }}>Blue Team IDS (Frida)</h3>
            <pre>
{`Parcel.readSerializable.overload().implementation = function() {
  var result = this.readSerializable();
  // Check for malicious gadget classes
  return result;
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
