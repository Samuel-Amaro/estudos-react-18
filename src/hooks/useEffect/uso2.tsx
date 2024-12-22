/**
 * * EXEMPLO 2 DE 5: Ouvindo um evento global do navegador
 *
 * Neste exemplo, o sistema externo é o próprio DOM do navegador. Normalmente, você especificaria ouvintes de eventos com JSX, mas não pode ouvir o window objeto global dessa forma. Um efeito permite que você se conecte ao window objeto e ouça seus eventos. Ouvir o pointermove evento permite que você rastreie a posição do cursor (ou dedo) e atualize o ponto vermelho para se mover com ele.
 */

import { useEffect, useState } from "react";

export default function AppUsoEffect2() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //`useEffect`é um React Hook que permite sincronizar um componente com um sistema externo.
  //neste exemplo o sistema externo e o proprio DOM, precisamos ouvir um evento global da window
  useEffect(
    //Uma função de configuração com código de configuração que se conecta a esse sistema.
    () => {
      function handleMove(e: PointerEvent) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
      window.addEventListener("pointermove", handleMove);

      // função de limpeza com código de limpeza que se desconecta desse sistema.
      return () => {
        window.removeEventListener("pointermove", handleMove);
      };
    },
    [],
  );

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "pink",
        borderRadius: "50%",
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }}
    />
  );
}
