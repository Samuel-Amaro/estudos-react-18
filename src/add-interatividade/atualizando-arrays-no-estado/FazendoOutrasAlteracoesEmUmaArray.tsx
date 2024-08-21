/**
 * * FAZENDO OUTRAS ALTERAÇÕES EM UMA ARRAY
 *
 * Há algumas coisas que você não pode fazer com a sintaxe de propagação e métodos não mutantes como map() e filter() sozinho. Por exemplo, você pode querer reverter ou classificar um array. Os métodos JavaScript reverse()e sort()estão mutando o array original, então você não pode usá-los diretamente.
 *
 * No entanto, você pode copiar o array primeiro e depois fazer alterações nele.
 */

import { useState } from "react";

const initialList = [
  { id: 0, title: "Big Bellies" },
  { id: 1, title: "Lunar Landscape" },
  { id: 2, title: "Terracotta Army" },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    //Aqui, você usa a [...list]sintaxe de spread para criar uma cópia do array original primeiro. Agora que você tem uma cópia, você pode usar métodos de mutação como nextList.reverse()or nextList.sort(), ou até mesmo atribuir itens individuais com nextList[0] = "something".
    //No entanto, mesmo se você copiar um array, não poderá mutar itens existentes dentro dele diretamente. Isso ocorre porque a cópia é superficial — o novo array conterá os mesmos itens que o original. Então, se você modificar um objeto dentro do array copiado, estará mutando o estado existente.
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>Reverse</button>
      <ul>
        {list.map((artwork) => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
