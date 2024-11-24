import { useDebugValue, useSyncExternalStore } from "react";

/**
 * * useDebugValue
 *
 * useDebugValue é um React Hook que permite adicionar um rótulo(label) a um Hook personalizado no React DevTools.
 *
 * useDebugValue(value, format?)
 *
 * Chame useDebugValue no nível superior do seu Hook personalizado para exibir um valor de depuração legível:
 *
 * * Parâmetros
 *
 * value: O valor que você quer exibir no React DevTools. Ele pode ter qualquer tipo.
 * opcional format : Uma função de formatação. Quando o componente é inspecionado, o React DevTools chamará a função de formatação com o value como argumento e, em seguida, exibirá o valor formatado retornado (que pode ter qualquer tipo). Se você não especificar a função de formatação, o original value em si será exibido.
 *
 * * Devoluções
 *
 * useDebugValue não retorna nada.
 *
 * * Adicionando um rótulo a um Hook personalizado
 *
 * Não adicione valores de depuração a cada Hook personalizado. É mais valioso para Hooks personalizados que fazem parte de bibliotecas compartilhadas e que têm uma estrutura de dados interna complexa que é difícil de inspecionar.
 */

function subscribe(onStoreChange: () => void) {
  window.addEventListener("online", onStoreChange);
  window.addEventListener("offline", onStoreChange);
  return () => {
    window.removeEventListener("online", onStoreChange);
    window.removeEventListener("offline", onStoreChange);
  };
}

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
  //add um label a o custom hook, para o devtools do react
  //ira exibir um valor de depuração legivel para o react dev toools
  useDebugValue(isOnline ? "Online" : "Offline");
  return isOnline;
}
