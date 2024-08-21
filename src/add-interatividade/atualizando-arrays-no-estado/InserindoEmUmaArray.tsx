/**
 * * INSERINDO EM UMA ARRAY
 *
 *  Às vezes, você pode querer inserir um item em uma posição específica que não está nem no começo nem no fim. Para fazer isso, você pode usar a ...sintaxe de propagação de array junto com o slice()método. O slice()método permite que você corte uma “fatia” do array. Para inserir um item, você criará um array que espalha a fatia antes do ponto de inserção, depois o novo item e depois o restante do array original.
 *
 * Neste exemplo, o botão Inserir sempre insere no índice 1:
 */

import { useState } from "react";

let nextId = 3;
const initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

export default function List() {
  const [name, setName] = useState("");
  const [artists, setArtists] = useState(initialArtists);

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt),
    ];
    setArtists(nextArtists);
    setName("");
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleClick}>Insert</button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
