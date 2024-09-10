/**
 * * O mesmo componente na mesma posição preserva o estado
 *
 * Neste exemplo, há duas <Counter />tags diferentes:
 *
 * Quando você marca ou desmarca a caixa de seleção, o estado do contador não é redefinido. Seja isFancyis trueou false, você sempre tem a <Counter />como o primeiro filho do divretornado do Appcomponente raiz:
 *
 * É o mesmo componente na mesma posição, então, da perspectiva do React, é o mesmo contador.
 *
 * Lembre-se de que é a posição na árvore da IU — não na marcação JSX — que importa para o React!
 *
 * React não sabe onde você coloca as condições na sua função. Tudo o que ele "vê" é a árvore que você retorna.
 */

import { useState } from "react";

export default function App() {
  const [isFancy, setIsFancy] = useState(false);

  return (
    <div>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }: { isFancy: boolean }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }
  if (isFancy) {
    className += " fancy";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
