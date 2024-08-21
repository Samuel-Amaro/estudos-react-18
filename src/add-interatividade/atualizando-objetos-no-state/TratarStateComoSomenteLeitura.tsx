/**
 * *  Trate o state como somente leitura
 *
 * Em outras palavras, você deve tratar qualquer objeto JavaScript que você colocar no state como somente leitura.
 *
 * Este exemplo mantém um objeto no state para representar a posição atual do ponteiro. O ponto vermelho deve se mover quando você tocar ou mover o cursor sobre a área de visualização. Mas o ponto permanece na posição inicial:
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
        //Esse código modifica o objeto atribuído à position da renderização anterior. Mas sem usar a função de configuração de state, o React não tem ideia de que o objeto foi alterado. Portanto, o React não faz nada em resposta. É como tentar alterar o pedido depois que você já comeu a refeição. Embora a mutação de state possa funcionar em alguns casos, não a recomendamos. Você deve tratar o valor de state ao qual tem acesso em uma renderização como somente leitura.
        //Um código como esse é um problema porque modifica um objeto existente no state:
        //A mutação só é um problema quando você altera objetos existentes que já estão no state. A mutação de um objeto que você acabou de criar não tem problema porque nenhum outro código faz referência a ele ainda. Alterá-lo não afetará acidentalmente algo que depende dele. Isso é chamado de “mutação local”. Você pode até mesmo fazer a mutação local durante a renderização. Muito conveniente e completamente aceitável!
        //position.x = e.clientX;
        //position.y = e.clientY;

        //Para realmente acionar uma nova renderização nesse caso, crie um objeto novo e passe-o para a função de configuração de state:
        //Com setPosition, você está dizendo ao React:
        //Substitua position por este novo objeto
        //E renderize esse componente novamente
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
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}
