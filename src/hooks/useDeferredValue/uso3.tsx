/**
 * * ADIANDO A NOVA RENDERIZAÇÃO DE UMA PARTE DA IU
 *
 *  Você também pode aplicar useDeferredValue como uma otimização de desempenho. É útil quando uma parte da sua UI é lenta para renderizar novamente, não há uma maneira fácil de otimizá-la e você quer evitar que ela bloqueie o resto da UI.
 *
 * Imagine que você tem um campo de texto e um componente (como um gráfico ou uma longa lista) que é renderizado novamente a cada pressionamento de tecla:
 */

import { memo, useDeferredValue, useState } from "react";

function SlowItem({ text }: { text: string }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Text: {text}</li>;
}

//Primeiro, otimize SlowList para pular a re-renderização quando seus props forem os mesmos. Para fazer isso, envolva-o em memo:
//No entanto, isso só ajuda se os SlowListprops forem os mesmos da renderização anterior. O problema que você está enfrentando agora é que fica lento quando eles são diferentes, e quando você realmente precisa mostrar uma saída visual diferente.
//Concretamente, o principal problema de desempenho é que sempre que você digita na entrada, o SlowListrecebe novos props, e renderizar novamente sua árvore inteira faz com que a digitação pareça instável. Neste caso, useDeferredValuepermite que você priorize a atualização da entrada (que deve ser rápida) em vez da atualização da lista de resultados (que pode ser mais lenta):
//Isso não torna a re-renderização SlowListmais rápida. No entanto, ele informa ao React que a re-renderização da lista pode ser despriorizada para que não bloqueie as teclas digitadas. A lista ficará "atrasada" em relação à entrada e então "recuperará o atraso". Como antes, o React tentará atualizar a lista o mais rápido possível, mas não bloqueará o usuário de digitar.
const SlowList = memo(function SlowList({ text }: { text: string }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log("[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />");

  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return <ul className="items">{items}</ul>;
});

export default function AppUso3() {
  //Neste exemplo, cada item no SlowListcomponente é desacelerado artificialmente para que você possa ver como useDeferredValuepermite que você mantenha a entrada responsiva. Digite na entrada e observe que a digitação parece rápida enquanto a lista "fica para trás".
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
