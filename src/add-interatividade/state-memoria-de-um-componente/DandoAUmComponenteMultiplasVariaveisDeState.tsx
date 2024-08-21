/**
 * * DANDO A UM COMPONENTE MULTIPLAS VARIAVEIS DE STATE
 *
 *  Você pode ter quantas variáveis de state de quantos tipos quiser em um componente. Esse componente tem duas variáveis de state, um número index e um boleano showMore o qual é acionado quando você clica em “Show details”:
 *
 * É uma boa ideia ter múltiplas variáveis de state se estas não for relacionadas, como index e showMore nesse exemplo. Mas se você perceber que frequentemente altera duas variáveis de estado juntas, pode ser mais fácil combiná-las em uma. Por exemplo, se você tem um formulário com vários campos, é mais conveniente ter uma única variável de state a qual armazena um objeto do que uma variável por campo.
 */

import { useState } from "react";
import { sculptureList } from "../../data";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];

  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
