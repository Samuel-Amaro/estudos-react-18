/**
 * * O que acontece se você atualizar o estado após substituí-lo
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
          //durante a proxima renderização o react percorre a fila de estados
          setNumber(number + 5); //substitui por 5
          setNumber((n) => n + 1); // utiliza o valor do estado anterior 5 + 1 = 6
        }}
      >
        Increase the number
      </button>
    </>
  );
}
