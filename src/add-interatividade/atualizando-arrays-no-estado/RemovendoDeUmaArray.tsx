/**
 * * REMOVENDO DE UMA ARRAY
 *
 * A maneira mais fácil de remover um item de um array é filtrá -lo . Em outras palavras, você produzirá um novo array que não conterá esse item. Para fazer isso, use o filter método, por exemplo:
 */

import { useState } from "react";

const initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

export default function List() {
  const [artists, setArtists] = useState(initialArtists);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{" "}
            <button
              onClick={() => {
                //Aqui, artists.filter(a => a.id !== artist.id)significa “criar um array que consiste daqueles artistscujos IDs são diferentes de artist.id”. Em outras palavras, o botão “Delete” de cada artista filtrará esse artista para fora do array e, em seguida, solicitará uma nova renderização com o array resultante. Observe que isso filternão modifica o array original.
                setArtists(artists.filter((a) => a.id !== artist.id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
