import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = React.ComponentPropsWithoutRef<"input">;

export type Ref = HTMLInputElement;

type MyInputHandle = {
  focus: () => void;
  scrollIntoView: () => void;
};

/**
 * * Expondo um identificador de referência customizado ao componente pai
 *
 * Por padrão, os componentes não expõem seus nós DOM aos componentes pai. Por exemplo, se você deseja que o componente pai de MyInput tenha acesso ao nó DOM <input>, você deve optar por forwardRef:
 *
 * Com o código acima, uma referência(ref) para MyInput receberá o nó DOM <input>. No entanto, você pode expor um valor customizado. Para customizar o identificador exposto, chame useImperativeHandle no nível superior do seu componente:
 *
 * Note que no código, a ref não é mais encaminhado para o <input>.
 *
 * Por exemplo, suponha que você não queira expor todo o nó DOM <input>, mas você deseja expor dois de seus métodos: focus e scrollIntoView. Para fazer isso, mantenha o DOM real do navegador em uma referência separada. Em seguida, use useImperativeHandle para expor um identificador com apenas os métodos que você deseja que o componente pai chame:
 */

const MyInput = forwardRef<MyInputHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  //useImperativeHandle é um React Hook que permite customizar o identificador exposto como ref.
  //vamos customizar o ref que iremos expor para somente retornar algo customizado e não  o acesso total ao no dom, no caso vamos export somente dois metodos uteis
  useImperativeHandle(ref, () => {
    return {
      focus() {
        if (inputRef.current) inputRef.current.focus();
      },
      scrollIntoView() {
        if (inputRef.current) inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});

//Agora, se o componente pai obtiver uma referência para MyInput, ele será capaz de chamar os métodos focus e scrollIntoView nele. No entanto, ele não terá acesso total ao nó DOM <input> subjacente.
export default function FormRef() {
  //Não abuse das referências. Você deve apenas usar referências para comportamentos imperativos que você não pode expressar como propriedades: por exemplo, rolar até um nó, focar em um nó, disparar uma animação, selecionar texto e assim por diante.
  const ref = useRef<{ focus: () => void; scrollIntoView: () => void } | null>(
    null,
  );

  function handleClick() {
    if (ref.current) ref.current.focus();
    // Isso não funcionará porque o nó DOM não está exposto:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form>
      <MyInput placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
