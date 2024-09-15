/**
 * * ACESSANDO NÓS DOM DE OUTRO COMPONENTE
 *
 *  Quando você coloca uma referência em um componente integrado que gera um elemento do navegador como <input />, o React definirá a current propriedade dessa referência para o nó DOM correspondente (como o real <input /> no navegador).
 *
 * No entanto, se você tentar colocar uma ref no seu próprio componente, como <MyInput />, por padrão você obterá null. Aqui está um exemplo demonstrando isso
 *
 * Isso acontece porque, por padrão, o React não deixa um componente acessar os nós DOM de outros componentes. Nem mesmo para seus próprios filhos! Isso é intencional. Refs são uma saída de emergência que deve ser usada com moderação. Manipular manualmente os nós DOM de outro componente torna seu código ainda mais frágil.
 *
 * Em vez disso, os componentes que desejam expor seus nós DOM precisam optar por esse comportamento. Um componente pode especificar que ele “encaminha” sua referência para um de seus filhos.
 *
 * Em sistemas de design, é um padrão comum para componentes de baixo nível, como botões, entradas e assim por diante, encaminhar suas referências para seus nós DOM. Por outro lado, componentes de alto nível, como formulários, listas ou seções de página, geralmente não expõem seus nós DOM para evitar dependências acidentais na estrutura DOM.
 */

import { forwardRef, useRef } from "react";

type PropsMyInput = React.ComponentPropsWithRef<"input">;
type RefMyInput = HTMLInputElement;

//O MyInput componente é declarado usando forwardRef. Isso o opta por receber o inputRef from acima como o segundo ref argumento que é declarado depois de props.
//MyInput ele próprio passa o ref que recebeu para o <input> seu interior.
export const MyInput = forwardRef<RefMyInput, PropsMyInput>((props, ref) => (
  <input {...props} ref={ref} />
));

export default function MyForm() {
  //referencia o componente
  const inputRef = useRef<null | HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <>
      <MyInput
        ref={
          inputRef
        } /*diz ao React para colocar o nó DOM correspondente em inputRef.current. No entanto, cabe ao MyInput componente optar por isso — por padrão, ele não o faz.*/
      />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
