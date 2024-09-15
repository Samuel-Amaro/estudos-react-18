/**
 * * OBTENDO UMA REFERÊNCIA PARA O NÓ
 */

import { useRef } from "react"; //Para acessar um nó DOM gerenciado pelo React, primeiro importe o useRefHook:

export default function Form() {
  //Em seguida, use-o para declarar uma referência dentro do seu componente:
  //O useRefHook retorna um objeto com uma única propriedade chamada current. Inicialmente, myRef.current será null. Quando o React cria um nó DOM para este <input>, o React colocará uma referência a este nó em myRef.current. Você pode então acessar este nó DOM a partir dos seus manipuladores de eventos e usar as APIs de navegador integradas definidas nele.
  const inputRef = useRef<null | HTMLInputElement>(null);

  function handleClick() {
    //acessando o NO dom
    //lendo o nó DOM
    inputRef.current?.focus();
  }

  return (
    <>
      <input
        ref={
          inputRef
        } /*Por fim, passe sua referência como ref atributo para a tag JSX para a qual você deseja obter o nó DOM, Isso diz ao React para colocar <input> o nó DOM deste em inputRef.current.*/
      />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
