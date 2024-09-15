export function createConnection() {
  // Uma implementação real realmente se conectaria ao servidor
  return {
    connect() {
      console.log("✅ Connecting...");
    },
    disconnect() {
      console.log("❌ Disconnected.");
    },
  };
}
