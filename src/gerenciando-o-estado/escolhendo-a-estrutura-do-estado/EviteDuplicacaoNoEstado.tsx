/**
 * * EVITE DUPLICAÇÃO NO ESTADO
 *
 *  Evite duplicação no estado. Quando os mesmos dados são duplicados entre várias variáveis de estado, ou dentro de objetos aninhados, é difícil mantê-los sincronizados. Reduza a duplicação quando puder.
 */

import { useState } from "react";

const initialItems = [
  { title: "pretzels", id: 0 },
  { title: "alga crocante", id: 1 },
  { title: "barra de granola", id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find((item) => item.id === selectedId) as {
    id: number;
    title: string;
  };

  function handleItemChange(
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: e.target.value,
          };
        } else {
          return item;
        }
      }),
    );
  }

  return (
    <>
      <h2>Qual o seu lanche de viagem?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={(e) => {
                handleItemChange(item.id, e);
              }}
            />{" "}
            <button
              onClick={() => {
                setSelectedId(item.id);
              }}
            >
              Escolha
            </button>
          </li>
        ))}
      </ul>
      <p>Você selecionou {selectedItem.title}.</p>
    </>
  );
}
