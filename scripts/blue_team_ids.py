# --- BLUE TEAM SCRIPT ---
# Bu betik, hedef uygulamaya bağlanarak Parcelable verilerini 
# tersine serileştirme aşamasında yakalayan bir IDS/IPS simülasyonudur.

import frida
import sys

DEVICE_IP = "XX:XX:XX:XX" # Hedef cihaz IP'si maskelenmiştir

# Frida JavaScript Hook Kodu
# Gelen Parcel nesnelerinin okunmasını dinler ve anomali tespiti yapar.
js_code = """
Java.perform(function() {
    var Parcel = Java.use('android.os.Parcel');
    
    Parcel.readSerializable.overload().implementation = function() {
        var result = this.readSerializable();
        if (result != null) {
            var className = result.getClass().getName();
            console.log("[BlueTeam-IDS] Tersine serileştirilen nesne tespit edildi: " + className);
            
            // Kara listeye alınmış potansiyel zararlı gadget sınıflarının kontrolü
            if (className.indexOf('InvokerTransformer') !== -1 || className.indexOf('Runtime') !== -1) {
                console.warn("[!] KRİTİK ALARM: Zararlı deserialization denemesi engellendi!");
                return null; // Zafiyeti önlemek ve akışı bozmak için null döndür
            }
        }
        return result;
    };
});
"""

def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(f"HATA: {message['stack']}")

def monitor_app():
    print(f"[*] {DEVICE_IP} üzerindeki hedef uygulama izlemeye alınıyor...")
    
    try:
        # Cihaza bağlanma ve process'e enjekte olma (Simülasyon ortamı varsayımıyla)
        device = frida.get_usb_device()
        pid = device.spawn(["com.example.vulnerableapp"])
        session = device.attach(pid)
        
        script = session.create_script(js_code)
        script.on('message', on_message)
        script.load()
        
        device.resume(pid)
        print("[+] IDS Aktif: Gelen IPC çağrıları bekleniyor...\\n")
        sys.stdin.read()
    except Exception as e:
        print(f"[!] İlgili process izlenemedi: {e}")

if __name__ == "__main__":
    monitor_app()
