/**
 * * Substituindo itens em uma matriz
 *
 * É particularmente comum querer substituir um ou mais itens em um array. Atribuições como arr[0] = 'bird'estão mutando o array original, então, em vez disso, você vai querer usar mappara isso também.
 *
 * Para substituir um item, crie um novo array com map. Dentro da sua mapchamada, você receberá o índice do item como o segundo argumento. Use-o para decidir se deve retornar o item original (o primeiro argumento) ou outra coisa:
 */

import { useState } from "react";

const initialCounters = [0, 0, 0];

export default function CounterList() {
  const [counters, setCounters] = useState(initialCounters);

  function handleIncrementClick(index: number) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button
            onClick={() => {
              handleIncrementClick(i);
            }}
          >
            +1
          </button>
        </li>
      ))}
    </ul>
  );
}
