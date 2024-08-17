/**
 * * FILTRANDO ARRAYS DE ITENS
 */

import { people } from "../../data";
import { getImageUrl } from "../../utils";

export default function List() {
  //Vamos supor que você queira exibir somente as pessoas cuja profissão seja 'chemist'. Neste caso, voce pode usar o método filter() do JavaScript para retornar apenas essas pessoas.
  const chemists = people.filter((person) => person.profession === "chemist");
  const listItems = chemists.map((person) => (
    <li>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <strong>{person.name}:</strong>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
