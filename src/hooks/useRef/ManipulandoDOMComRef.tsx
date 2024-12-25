/**
 * * MANIPULANDO O DOM COM UMA REF
 *
 * É particularmente comum usar um ref para manipular o DOM. O React tem suporte integrado para isso.
 *
 */

import { useRef } from "react";

export default function Form() {
  //useRef é um React Hook que permite referenciar um valor que não é necessário para renderização.
  //declarando uma referencia para um no DOM, para poder manipular o no DOM
  //É particularmente comum usar um ref para manipular o DOM. O React tem suporte integrado para isso.
  //1. Primeiro, declare um objeto ref com um valor inicial de null:
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    //3. Depois que o React cria o nó DOM e o coloca na tela, o React definirá a current propriedade do seu objeto ref para esse nó DOM. Agora você pode acessar o <input> nó DOM do e chamar métodos como focus():
    //4. O React redefinirá a current propriedade para null quando o nó for removido da tela.
    inputRef.current?.focus();
  }

  return (
    <>
      {/* 2. Em seguida, passe seu objeto ref como ref atributo para o JSX do nó DOM que você deseja manipular: */}
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
