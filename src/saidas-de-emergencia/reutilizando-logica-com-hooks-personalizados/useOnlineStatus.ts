// custom Hook chamado useOnlineStatus
//hook embutido e os hooks que o react fornece
//Quando você extrai a lógica em Hooks personalizados, é possível ocultar os detalhes complicados de como lidar com algum sistema externo ou uma API do navegador. O código dos seus componentes expressa sua intenção, não a implementação.
//Os nomes do hooks devem começar com use seguido por uma letra maiúscula

/**
 * * Hooks personalizados permitem compartilhar lógica com estado, não o próprio estado
 * 
 * No exemplo anterior, quando você ligou e desligou a rede, ambos os componentes foram atualizados juntos. No entanto, é incorreto pensar que uma única variável de estado isOnline é compartilhada entre eles.
 * 
 * cada chamada ao custom hook criar um estado completamente independente onde e usado
 * 
 * Os Hooks personalizados permitem compartilhar lógica com estado e não o próprio estado. Cada chamada a um Hook é completamente independente de qualquer outra chamada ao mesmo Hook.
*/

import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
