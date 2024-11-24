import { useOnlineStatus } from "./useDebugValue";

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

export default function AppExDebug() {
  return <StatusBar />;
}
