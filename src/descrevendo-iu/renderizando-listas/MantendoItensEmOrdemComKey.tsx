/**
 * * MANTENDO ITENS EMM ORDEM COM KEY
 *
 *  Você precisa dar a cada item do array uma key — uma string ou um número que o identifique unicamente dentre os demais itens naquele array:
 */

import { people } from "../../data";
import { getImageUrl } from "../../utils";

export default function List() {
  const listItems = people.map((person) => (
    //Você precisa dar a cada item do array uma key — uma string ou um número que o identifique unicamente dentre os demais itens naquele array:
    //Keys dizem ao React a qual item do array cada componente corresponde, para que ele possa combiná-los mais tarde. Isso se torna importante se os itens do seu array podem se mover (por exemplo, ao ser ordenado), serem inseridos, ou serem removidos. Uma key bem escolhida ajuda o React a identificar o que exatamente aconteceu, e fazer as atualizações corretas à árvore da DOM.
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}</b>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
