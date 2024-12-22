/**
 * * Ativando uma animação
 *
 * Neste exemplo, o sistema externo é a biblioteca de animação em animation.js. Ele fornece uma classe JavaScript chamada FadeInAnimation que recebe um nó DOM como argumento e expõe start() métodos stop() para controlar a animação. Este componente usa uma ref para acessar o nó DOM subjacente. O Effect lê o nó DOM da ref e inicia automaticamente a animação para esse nó quando o componente aparece.
 */

import { useEffect, useRef, useState } from "react";
import { FadeInAnimation } from "./animation";

function Welcome() {
  const ref = useRef<HTMLDivElement | null>(null);

  //`useEffect`é um React Hook que permite sincronizar um componente com um sistema externo.
  //o sistema externo é a biblioteca de animação em animation.js.
  useEffect(
    //Uma função de configuração com código de configuração que se conecta a esse sistema.
    //que iniciar a animação na montagem do componnente
    () => {
      const animation = new FadeInAnimation(ref.current as HTMLDivElement);
      animation.start(1000);

      // função de limpeza com código de limpeza que se desconecta desse sistema.
      //que para a animação quando o componente sai da pagina
      return () => {
        animation.stop();
      };
    },
    [],
  );

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        color: "white",
        padding: 50,
        textAlign: "center",
        fontSize: 50,
        backgroundImage:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
      }}
    >
      Welcome
    </div>
  );
}

export default function AppUsoEffect3() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? "Remove" : "Show"}</button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
