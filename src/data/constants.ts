
export const APP_TITLE = "Android IPC SecOps Dashboard";
export const CVSS_SCORE = "9.8 Critical";
export const TARGET_NAME = "Android Binder IPC (AIDL)";
export const VECTOR_NAME = "Deserialization RCE";

export const RED_TEAM_SCRIPT = `adb shell am broadcast \\
  -n com.example.app/.Receiver \\
  --es payload_extra "QUFB..."`;

export const BLUE_TEAM_SCRIPT = `Parcel.readSerializable.overload().implementation = function() {
  var result = this.readSerializable();
  // Check for malicious gadget classes
  return result;
};`;
