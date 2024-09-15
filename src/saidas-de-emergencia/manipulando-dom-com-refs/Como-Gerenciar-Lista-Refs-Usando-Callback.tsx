/**
 * * COMO GERENCIAR UMA LISTA DE REFERÊNCIAS USANDO UM CALLBACK DE REF
 *
 * Nos exemplos acima, há um número predefinido de refs. No entanto, às vezes você pode precisar de uma ref para cada item na lista, e você não sabe quantas você terá.
 *
 * Isso ocorre porque Hooks devem ser chamados somente no nível superior do seu componente. Você não pode chamar useRef em um loop, em uma condição ou dentro de uma map() chamada.
 *
 * Outra solução é passar uma função para o ref atributo. Isso é chamado de ref callback. O React chamará seu callback ref com o nó DOM quando for hora de definir o ref, e com nullquando for hora de limpá-lo. Isso permite que você mantenha seu próprio array ou um Map , e acesse qualquer ref por seu índice ou algum tipo de ID.
 */

import { useRef, useState } from "react";

export default function CatFriends() {
  //Neste exemplo, itemsRe fnão contém um único nó DOM. Em vez disso, ele contém um array de item para um nó DOM. ( Refs podem conter quaisquer valores! )
  const itemsRef = useRef<{ cat: string; node: null | HTMLLIElement }[] | null>(
    null,
  );
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat: string) {
    const arr = getArray();
    const foundIdItemRef = arr.findIndex((item) => item.cat === cat);
    const node = arr[foundIdItemRef].node;
    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getArray() {
    if (!itemsRef.current) {
      // Initialize the ARRAY on first usage.
      itemsRef.current = [];
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Tom</button>
        <button onClick={() => scrollToCat(catList[5])}>Maru</button>
        <button onClick={() => scrollToCat(catList[9])}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              //O ref retorno de chamada em cada item da lista cuida para atualizar o array:
              ref={(node) => {
                const arr = getArray();
                if (node) {
                  arr.push({ cat, node });
                } else {
                  const foundId = arr.findIndex((item) => item.cat === cat);
                  arr.splice(foundId, 1);
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}
