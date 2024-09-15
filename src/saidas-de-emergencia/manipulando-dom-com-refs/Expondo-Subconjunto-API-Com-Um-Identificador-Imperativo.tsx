/**
 * * EXPONDO UM SUBCONJUNTO DA API COM UM IDENTIFCADOR IMPERATIVO
 *
 *  No exemplo acima, MyInput expõe o elemento de entrada DOM original. Isso permite que o componente pai chame focus() nele. No entanto, isso também permite que o componente pai faça outra coisa — por exemplo, alterar seus estilos CSS. Em casos incomuns, você pode querer restringir a funcionalidade exposta. Você pode fazer isso com useImperativeHandle
 *
 * Aqui, realInputRefinside MyInputcontém o nó DOM de entrada real. No entanto, useImperativeHandleinstrui o React a fornecer seu próprio objeto especial como o valor de uma ref para o componente pai. Então, inputRef.currentdentro do Formcomponente, só terá o focusmétodo. Neste caso, o ref “handle” não é o nó DOM, mas o objeto personalizado que você cria dentro useImperativeHandleda chamada.
 */

import { forwardRef, useImperativeHandle, useRef } from "react";

type PropsMyInput = React.ComponentPropsWithRef<"input">;
type RefMyInput = { focus: (options?: FocusOptions) => void };

//O MyInput componente é declarado usando forwardRef. Isso o opta por receber o inputRef from acima como o segundo ref argumento que é declarado depois de props.
//MyInput ele próprio passa o ref que recebeu para o <input> seu interior.
export const MyInput = forwardRef<RefMyInput, PropsMyInput>((props, ref) => {
  const realInputRef = useRef<null | HTMLInputElement>(null);
  //No entanto, useImperativeHandleinstrui o React a fornecer seu próprio objeto especial como o valor de uma ref para o componente pai. Então, inputRef.currentdentro do Formcomponente, só terá o focusmétodo. Neste caso, o ref “handle” não é o nó DOM, mas o objeto personalizado que você cria dentro useImperativeHandleda chamada.
  useImperativeHandle(ref, () => ({
    //Apenas exponha o foco e nada mais
    focus(options) {
      realInputRef.current?.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function MyForm() {
  //referencia o componente
  const inputRef = useRef<null | RefMyInput>(null);

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
