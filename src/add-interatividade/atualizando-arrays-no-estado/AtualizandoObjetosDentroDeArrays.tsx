/**
 * * ATUALIZANDO OBJETOS DENTRO DE ARRAYS
 *
 *  Objetos não estão realmente localizados “dentro” de arrays. Eles podem parecer estar “dentro” no código, mas cada objeto em um array é um valor separado, para o qual o array “aponta”. É por isso que você precisa ter cuidado ao alterar campos aninhados como list[0]. A lista de arte de outra pessoa pode apontar para o mesmo elemento do array!
 *
 * Ao atualizar o estado aninhado, você precisa criar cópias do ponto onde deseja atualizar, e todo o caminho até o nível superior. Vamos ver como isso funciona.
 *
 * Neste exemplo, duas listas de artwork separadas têm o mesmo estado inicial. Elas deveriam estar isoladas, mas, por causa de uma mutação, seu estado é acidentalmente compartilhado, e marcar uma caixa em uma lista afeta a outra lista:
 */

import { useState } from "react";

let nextId = 3;
const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);

  function handleToggleMyList(artworkId: number, nextSeen: boolean) {
    //Embora o myNextList array em si seja novo, os itens em si são os mesmos do myList array original. Então, a alteração artwork.seen altera o item de arte original. Esse item de arte também está em yourList, o que causa o bug. Bugs como esse podem ser difíceis de pensar, mas felizmente eles desaparecem se você evitar o estado de mutação.
    /*const myNextList = [...myList];
    const artwork = myNextList.find((a) => a.id === artworkId) as {
        id: number;
        title: string;
        seen: boolean;
    };
    artwork.seen = nextSeen;
    setMyList(myNextList);*/

    //Você pode usar map para substituir um item antigo por sua versão atualizada sem mutação.
    setMyList(
      myList.map((artwork) => {
        if (artwork.id === artworkId) {
          // Create a *new* object with changes
          return { ...artwork, seen: nextSeen };
        } else {
          // No changes
          return artwork;
        }
      }),
    );
  }

  function handleToggleYourList(artworkId: number, nextSeen: boolean) {
    //ocorrendo mutação no objeto que o item de um array
    /*const yourNextList = [...yourList];
    const artwork = yourNextList.find((a) => a.id === artworkId) as {
        id: number;
        title: string;
        seen: boolean;
    };
    artwork.seen = nextSeen;
    setYourList(yourNextList);*/

    setYourList(
      yourList.map((artwork) => {
        if (artwork.id === artworkId) {
          // Create a *new* object with changes
          return { ...artwork, seen: nextSeen };
        } else {
          // No changes
          return artwork;
        }
      }),
    );

    //Em geral, você deve mutar apenas objetos que você acabou de criar. Se você estivesse inserindo uma nova arte, você poderia mutar, mas se você estiver lidando com algo que já está em estado, você precisa fazer uma cópia.
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({
  artworks,
  onToggle,
}: {
  artworks: {
    id: number;
    title: string;
    seen: boolean;
  }[];
  onToggle: (rtworkId: number, nextSeen: boolean) => void;
}) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked);
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
