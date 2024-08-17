/**
 * * RENDERIZANDO DADOS DE ARRAYS
 *
 *  armazenar dados em objetos ou arrays JavaScript e usar métodos como map() e filter() para renderizar listas de componentes a partir deles.
 */

//dados
const people = [
  "Creola Katherine Johnson: mathematician",
  "Mario José Molina-Pasquel Henríquez: chemist",
  "Mohammad Abdus Salam: physicist",
  "Percy Lavon Julian: chemist",
  "Subrahmanyan Chandrasekhar: astrophysicist",
];

export default function List() {
  //mapeia os items de people a um novo array de nodes jsx
  const listItems = people.map((person) => <li>{person}</li>);
  //Retorne listItems do seu componente dentro de uma <ul>
  return <ul>{listItems}</ul>;
}
