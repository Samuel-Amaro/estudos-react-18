/**
 * * OQUE ACONTECE SE VOCÊ SUBSTITUIR O ESTADO APOS ATUALIZALO
 *
 */

import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          //O React processa atualizações de estado depois que os manipuladores de eventos terminam de executar. Isso é chamado de batching.(lote)
          //Definir o estado não altera a variável na renderização existente, mas solicita uma nova renderização.
          //Para atualizar um estado várias vezes em um evento, você pode usar setNumber(n => n + 1)a função de atualização.
          //Convenções de nomenclatura
          //É comum nomear o argumento da função de atualização pelas primeiras letras da variável de estado correspondente:
          //durante a proxima renderização o react percorre a fila de estado
          //Se você preferir um código mais detalhado, outra convenção comum é repetir o nome completo da variável de estado, como setEnabled(enabled => !enabled), ou usar um prefixo como setEnabled(prevEnabled => !prevEnabled).
          setNumber(number + 5); //substitui por 5
          setNumber((n) => n + 1); //usa a função de atualização que usa o valor do estado anterior 5 + 1 = 6
          setNumber(42); //substitui por 42, Em seguida, o React armazena 42, como resultado final e o retorna de useState.

          /**
           * Para resumir, veja como você pode pensar no que está passando para o set Numberdefinidor de estado:
           *
           * Uma função de atualização (por exemplo n => n + 1) é adicionada à fila.
           * Qualquer outro valor (por exemplo, número 5) adiciona “substituir por 5” à fila, ignorando o que já está na fila.
           *
           * Após a conclusão do manipulador de eventos, o React acionará uma nova renderização. Durante a nova renderização, o React processará a fila. As funções do atualizador são executadas durante a renderização, portanto, as funções do atualizador devem ser puras e retornar apenas o resultado. Não tente definir o estado de dentro delas ou executar outros efeitos colaterais. No Modo Estrito, o React executará cada função do atualizador duas vezes (mas descartará o segundo resultado) para ajudar você a encontrar erros.
           */
        }}
      >
        Increase the number
      </button>
    </>
  );
}
