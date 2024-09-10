/**
 * * AGRUPE ESTADOS RELACIONADOS
 *
 *  Agrupe estados relacionados: Se você sempre atualiza duas ou mais variáveis de estado ao mesmo tempo, considere uni-las em uma única variável de estado.
 *
 * As vezes você pode ficar em dúvida entre usar uma única variável de estado, ou várias.
 *
 * Tecnicamente, você pode usar qualquer uma dessas abordagens. Mas se duas variáveis de estado sempre mudam juntas, pode ser uma boa ideia uní-las em uma única variável de estado. Assim você não esquecerá de sempre mantê-las sincronizadas, como neste exemplo onde mover o cursor atualiza ambas as coordenadas do ponto vermelho:
 *
 * Outro caso em que você agrupará dados em um objeto ou em um array é quando você não sabe quantas variáveis de estado vai precisar. Por exemplo, é útil quando você tem um formulário onde o usuário pode adicionar campos personalizados.
 */

import { useState } from "react";

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.5s",
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}
