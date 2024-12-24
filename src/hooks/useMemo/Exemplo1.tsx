import "./style.css";

/**
 * * IGNORANDO RECÁLCULOS CAROS
 *
 * Para armazenar em cache um cálculo entre novas renderizações, envolva-o em uma useMemo chamada no nível superior do seu componente:
 *
 * Você deve confiar apenas em useMemo como uma otimização de desempenho. Se seu código não funcionar sem ele, encontre o problema subjacente e corrija-o primeiro. Então você pode adicionar useMemo para melhorar o desempenho.
 *
 * Neste exemplo, a filterTodosimplementação é desacelerada artificialmente para que você possa ver o que acontece quando alguma função JavaScript que você está chamando durante a renderização está genuinamente lenta. Tente alternar as guias e alternar o tema.
 *
 * Trocar as abas parece lento porque força o que está mais lento filterTodosa ser executado novamente. Isso é esperado porque o tabfoi alterado, e então todo o cálculo precisa ser executado novamente.
 *
 * Alterne o tema. Graças a useMemo, ele é rápido apesar da desaceleração artificial! A filterTodoschamada slow foi pulada porque ambos todose tab(que você passa como dependências para useMemo) não mudaram desde a última renderização.
 */

import { useMemo, useState } from "react";
import { createTodos, filterTodos, Tab, Todo } from "./utils";

type Props = {
  todos: Todo[];
  theme: string;
  tab: Tab;
};

function TodoList({ todos, theme, tab }: Props) {
  //useMemo é um React Hook que permite armazenar em cache o resultado de um cálculo entre novas renderizações.
  //Você precisa passar duas coisas para useMemo:
  //Uma função de cálculo que não aceita argumentos, como () =>, e retorna o que você queria calcular.
  //Uma lista de dependências incluindo todos os valores dentro do seu componente que são usados ​​dentro do seu cálculo.
  //Na renderização inicial, o valor que você obterá useMemo será o resultado da chamada do seu cálculo .
  //Em cada renderização subsequente, o React comparará as dependências com as dependências que você passou durante a última renderização. Se nenhuma das dependências tiver mudado (comparado com Object.is), useMemo retornará o valor que você já calculou antes. Caso contrário, o React executará novamente seu cálculo e retornará o novo valor.
  //Em outras palavras, useMemo armazena em cache um resultado de cálculo entre novas renderizações até que suas dependências sejam alteradas.
  //Por padrão, o React executará novamente todo o corpo do seu componente toda vez que ele for renderizado novamente. Por exemplo, se isso TodoListatualizar seu estado ou receber novas props de seu pai, a filterTodos função executará novamente:
  // function TodoList({ todos, tab, theme }) {
  //   const visibleTodos = filterTodos(todos, tab);
  //   // ...
  // }
  //Geralmente, isso não é um problema porque a maioria dos cálculos é muito rápida. No entanto, se você estiver filtrando ou transformando uma matriz grande, ou fazendo algum cálculo caro, você pode querer pular isso novamente se os dados não tiverem mudado. Se ambos todos e tab forem os mesmos que eram durante a última renderização, encapsular o cálculo useMemo como antes permite que você reutilize visibleTodos o que já calculou antes.
  //aqui vamos armazenar em cache o resultado de tarefas filtradas, assim o visible todos ficara aramzenado em cache entre renderizaçõe até que a dependecia tenham sido alteradas e esstejam diferentess da utlima renderização, para que possa ser calculado novamente
  //Esse tipo de armazenamento em cache é chamado de memorização.
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  return (
    <div className={theme}>
      <p>
        <b>
          Note: <code>filterTodos</code> is artificially slowed down!
        </b>
      </p>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const todos = createTodos();

export default function AppEx1() {
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
