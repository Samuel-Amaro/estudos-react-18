/**
 * JSX é uma forma especial de escrever JavaScript. Isso significa que é possível usar JavaScript dentro dela - com chaves { }.
 */

export function TodoList() {
  //declara um nome e depois o insere dentro do h1
  const name = "Gregorio Y. Zara";

  return (
    //aqui ira ler a variavel name
    <h1>{name}'s To Do List</h1>
  );
}

//Qualquer expressão JavaScript funcionará entre chaves, incluindo chamadas de função como formatDate()

const today = new Date();

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

export default function TodoList2() {
  return (
    //Qualquer expressão JavaScript funcionará entre chaves, incluindo chamadas de função como formatDate():
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
