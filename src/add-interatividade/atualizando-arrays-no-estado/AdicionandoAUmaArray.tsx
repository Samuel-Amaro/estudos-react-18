/**
 * Em JavaScript, arrays são apenas outro tipo de objeto. Assim como com objects , você deve tratar arrays no estado React como somente leitura. Isso significa que você não deve reatribuir itens dentro de um array como arr[0] = 'bird', e você também não deve usar métodos que mutam o array, como push()and pop().
 *
 * Em vez disso, toda vez que você quiser atualizar um array, você vai querer passar um novo array para sua função de configuração de estado. Para fazer isso, você pode criar um novo array a partir do array original em seu estado chamando seus métodos não mutáveis ​​como filter()e map(). Então você pode definir seu estado para o novo array resultante.
 *
 * * Adicionando a uma matriz
 */

import { useState } from "react";

let nextId = 0;

export default function List() {
  const [name, setName] = useState("");
  const [artists, setArtists] = useState<{ id: number; name: string }[]>([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          //para add um novo item no array não podemos usar push() metodo, porque ele faz mutação no array
          //Em vez disso, crie um novo array que contenha os itens existentes e um novo item no final. Há várias maneiras de fazer isso, mas a mais fácil é usar a sintaxe ... de array spread:
          //podemos usar também o concat methodo
          setArtists([...artists, { id: nextId++, name: name }]);
        }}
      >
        Add
      </button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
