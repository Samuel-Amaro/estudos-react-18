/**
 * * COMBINANDO UM REDUCER COM CONTEXT
 *
 *  Neste exemplo da introdução aos reducers , o estado é gerenciado por um reducer. A função reducer contém toda a lógica de atualização de estado e é declarada em outro arquivo
 */

import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksProvider } from "./TasksContext";

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Prague itinerary</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
