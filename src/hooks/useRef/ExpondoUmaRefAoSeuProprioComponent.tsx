/**
 * * EXPONDO UMA REF AO SEU PROPRIO COMPONENT
 *
 * Às vezes, você pode querer deixar o componente pai manipular o DOM dentro do seu componente. Por exemplo, talvez você esteja escrevendo um MyInput componente, mas quer que o pai consiga focar a entrada (à qual o pai não tem acesso). Você pode usar uma combinação de useRef para manter a entrada e forwardRef expô-la ao componente pai.
 */

import { forwardRef, useRef } from "react";

type Props = React.ComponentPropsWithoutRef<"input">;

export type Ref = HTMLInputElement;

//usando forwardRef expô-la o DOM ao componente pai.
const MyInput = forwardRef<Ref, Props>((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  //useRef é um React Hook que permite referenciar um valor que não é necessário para renderização.
  //declarando uma referencia para um no DOM de um componente, para poder manipular o no DOM do component
  //É particularmente comum usar um ref para manipular o DOM. O React tem suporte integrado para isso.
  //iremos obter uma referencia do dom do component filho MyInput
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <>
      {/* Em seguida, passe seu objeto ref como ref prop para o component que você deseja manipular: */}
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
