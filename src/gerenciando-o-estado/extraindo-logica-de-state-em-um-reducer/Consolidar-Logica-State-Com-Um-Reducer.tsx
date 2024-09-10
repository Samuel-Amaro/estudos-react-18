/**
 * * CONSOLIDAR A LOGICA DE ESTADO COM UM REDUCER(REDUTOR)
 *
 * A lógica do componente pode ser mais fácil de ler quando você separa as preocupações como esta. Agora, os manipuladores de eventos apenas especificam o que aconteceu ao despachar ações, e a função redutora determina como o estado é atualizado em resposta a elas.
 *
 * * Escrevendo bem os redutores
 *
 * Tenha estas duas dicas em mente ao escrever redutores:
 *
 * Os redutores devem ser puros. Similares às funções de atualização de estado , os redutores são executados durante a renderização! (As ações são enfileiradas até a próxima renderização.) Isso significa que os redutores devem ser puros — as mesmas entradas sempre resultam na mesma saída. Eles não devem enviar solicitações, agendar tempos limite ou executar quaisquer efeitos colaterais (operações que impactam coisas fora do componente). Eles devem atualizar objetos e matrizes sem mutações.
 *
 * Cada ação descreve uma única interação do usuário, mesmo que isso leve a várias alterações nos dados. Por exemplo, se um usuário pressiona “Reset” em um formulário com cinco campos gerenciados por um reducer, faz mais sentido despachar uma reset_formação em vez de cinco set_fieldações separadas. Se você registrar cada ação em um reducer, esse registro deve ser claro o suficiente para que você reconstrua quais interações ou respostas aconteceram em qual ordem. Isso ajuda na depuração!
 */

import { useReducer } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import tasksReducer, {
  initialTasks,
} from "../escalando-com-reducer-e-context/taskReducer";

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function TaskApp() {
  //usando o hook useReducer
  //O useReducerHook é similar a useState— você deve passar um estado inicial e ele retorna um valor com estado e uma maneira de definir o estado (nesse caso, a função de despacho). Mas é um pouco diferente.
  //O useReducerHook aceita dois argumentos: Uma função redutora, Um estado inicial
  //E retorna: Um valor de estado, Uma função de despacho (para “despachar” ações do usuário para o redutor)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  //Gerenciar o estado com redutores é um pouco diferente de definir o estado diretamente. Em vez de dizer ao React "o que fazer" definindo o estado, você especifica "o que o usuário acabou de fazer" despachando "ações" dos seus manipuladores de eventos. (A lógica de atualização do estado ficará em outro lugar!) Então, em vez de "definir tasks" por meio de um manipulador de eventos, você está despachando uma ação "adicionou/alterou/excluiu uma tarefa". Isso é mais descritivo da intenção do usuário.

  function handleAddTask(text: string) {
    //despachando a action de added
    dispatch(
      //"action" object - objeto de ação
      //É um objeto JavaScript regular. Você decide o que colocar nele, mas geralmente ele deve conter o mínimo de informações sobre o que aconteceu.
      //Um objeto de ação pode ter qualquer formato.
      //Por convenção, é comum dar a ele uma string type que descreve o que aconteceu, e passar qualquer informação adicional em outros campos. O type é específico para um componente, então neste exemplo ou 'added' seria 'added_task' bom. Escolha um nome que diga o que aconteceu!
      {
        type: "added",
        id: nextId++,
        text: text,
      },
    );
  }

  function handleChangeTask(task: Task) {
    //despachando a action de changed
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    //despachando a action de deleted
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
