/**
 * * ATUALIZAÇÕES DE ESTADO DE DESCARGA SINCRONIZADAS COM FLUSH SYNC
 *
 *  Considere um código como este, que adiciona um novo todo e rola a tela para baixo até o último filho da lista.
 */

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

export default function TodoList() {
  const listRef = useRef<null | HTMLUListElement>(null);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    //No React, atualizações de estado são enfileiradas. Normalmente, é isso que você quer. No entanto, aqui isso causa um problema porque setTodosnão atualiza imediatamente o DOM. Então, no momento em que você rola a lista para seu último elemento, o todo ainda não foi adicionado. É por isso que a rolagem sempre “fica para trás” em um item.
    //Para corrigir esse problema, você pode forçar o React a atualizar (“flush”) o DOM de forma síncrona. Para fazer isso, importe flushSync e react-dom envolva a atualização de estado em uma flushSync chamada:
    //Isso instruirá o React a atualizar o DOM de forma síncrona logo após o código encapsulado em flushSync executar. Como resultado, o último todo já estará no DOM no momento em que você tentar rolar até ele:
    flushSync(() => {
      setText("");
      setTodos([...todos, newTodo]);
    });
    const lastChild = listRef.current?.querySelector("li:last-child");

    if (lastChild) {
      lastChild.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  return (
    <>
      <button onClick={handleAdd}>Add</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ul ref={listRef}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
const initialTodos: { id: number; text: string }[] = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: "Todo #" + (i + 1),
  });
}
