/**
 * *  Atualizando o mesmo estado várias vezes antes da próxima renderização
 *
 * É um caso de uso incomum, mas se você quiser atualizar a mesma variável de estado várias vezes antes da próxima renderização, em vez de passar o próximo valor de estado como setNumber(number + 1), você pode passar uma função que calcula o próximo estado com base no anterior na fila, como setNumber(n => n + 1). É uma maneira de dizer ao React para "fazer algo com o valor de estado" em vez de apenas substituí-lo.
 */

import { useState } from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          //o callback passado para setNumber, calcula o proximo estado com base no anterior na fila
          //isso diz ao react para fazer algo com o valor de estado em vez de apenas substituilo
          //Aqui, n => n + 1 é chamada de função de atualização.
          setNumber((n) => n + 1); //1
          setNumber((n) => n + 1); //2
          setNumber((n) => n + 1); //3 O React armazena 3 como resultado final e o retorna de useState.
        }}
      >
        +3
      </button>
    </>
  );
}
