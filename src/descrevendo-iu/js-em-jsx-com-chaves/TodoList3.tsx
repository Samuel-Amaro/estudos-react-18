/**
 * Além de strings, números e outras expressões JavaScript, você pode até passar objetos em JSX. Os objetos também são denotados por chaves, como { name: "Hedy Lamarr", inventions: 5 }. Portanto, para passar um objeto JS em JSX, você deve envolver o objeto em outro par de chaves: person={{ name: "Hedy Lamarr", inventions: 5 }}.
 *
 * Você pode ver isso com estilos CSS em linha na JSX.
 *
 */

/*
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
*/

/**
 * Você pode colocar várias expressões dentro de um objeto e referenciá-las em seu JSX dentro de chaves:
 */

const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList3() {
  return (
    //lendo propriedades do objeto js para jsx
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
