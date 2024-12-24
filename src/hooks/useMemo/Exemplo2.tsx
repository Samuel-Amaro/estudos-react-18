/**
 * * IGNORANDO A NOVA RENDERIZAÇÃO DE COMPONENTES
 *
 * Em alguns casos, useMemo também pode ajudar a otimizar o desempenho de re-renderização de componentes filhos. Para ilustrar isso, digamos que este TodoList componente passa o visibleTodos como prop para o List componente filho:
 *
 * Por padrão, quando um componente é renderizado novamente, o React renderiza novamente todos os seus filhos recursivamente
 *
 * É por isso que, quando TodoList é renderizado novamente com um theme, o Listcomponente também é renderizado novamente. Isso é bom para componentes que não exigem muito cálculo para renderizar novamente. Mas se você verificou que uma renderização novamente é lenta, você pode dizer List para pular a renderização novamente quando seus props forem os mesmos da última renderização, envolvendo-o em memo:
 */

import { memo, useMemo, useState } from "react";
import { createTodos, filterTodos, Tab, Todo } from "./utils";

type Props = {
  todos: Todo[];
  theme: string;
  tab: Tab;
};

//component List ira para pular a renderização novamente quando seus props forem os mesmos da última renderização, envolvendo-o em memo:
//so ira renderizar novamente quando a prop items for diferente da renderização anterior
//Com essa mudança, Listpulará a re-renderização se todos os seus props forem os mesmos da última renderização.
const List = memo(function List({ items }: { items: Todo[] }) {
  console.log(
    "[ARTIFICIALLY SLOW] Rendering <List /> with " + items.length + " items",
  );
  const startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.completed ? <s>{item.text}</s> : item.text}</li>
      ))}
    </ul>
  );
});

function TodoList({ todos, theme, tab }: Props) {
  //useMemo é um React Hook que permite armazenar em cache o resultado de um cálculo entre novas renderizações.
  //aqui vamos armazenar em cache o resultado de tarefas filtradas, assim o visible todos ficara aramzenado em cache entre renderizaçõe até que a dependecia tenham sido alteradas e esstejam diferentess da utlima renderização, para que possa ser calculado novamente
  //Esse tipo de armazenamento em cache é chamado de memorização.
  //Ao encapsular o visibleTodoscálculo em useMemo, você garante que ele tenha o mesmo valor entre as re-renderizações (até que as dependências mudem). Você não precisa encapsular um cálculo em useMemoa menos que o faça por algum motivo específico. Neste exemplo, o motivo é que você o passa para um componente encapsulado em memo, e isso permite que ele pule a re-renderização. Há alguns outros motivos para adicionar useMemoque são descritos mais adiante nesta página.
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab, false),
    [todos, tab],
  );

  return (
    <div className={theme}>
      <p>
        <b>
          Note: <code>List</code> is artificially slowed down!
        </b>
      </p>
      {/* 
        Em alguns casos, useMemo também pode ajudar a otimizar o desempenho de re-renderização de componentes filhos. Para ilustrar isso, digamos que este TodoList componente passa o visibleTodos como prop para o List componente filho:
        */}
      <List items={visibleTodos} />
    </div>
  );
}

const todos = createTodos();

export default function AppExUso2() {
  const [tab, setTab] = useState<Tab>("all");
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("active")}>Active</button>
      <button onClick={() => setTab("completed")}>Completed</button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList todos={todos} tab={tab} theme={isDark ? "dark" : "light"} />
    </>
  );
}
