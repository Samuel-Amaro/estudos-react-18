//etap 1: crie os contextos

import { createContext, Dispatch, useContext, useReducer } from "react";
import tasksReducer, { ACTIONTYPE, initialTasks } from "./taskReducer";

//TasksContext fornece a lista atual de tarefas.
//TasksDispatchContext fornece a função que permite que os componentes despachem ações.
//null como valor padrão para ambos os contextos

export const TaskContext = createContext<
  { id: number; text: string; done: boolean }[] | null
>(null);
export const TasksDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(
  null,
);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  //etapa 2: colocando o state e dispatch em contexto, fornecendo o valor ao contexto para prover para a arvore de componentes
  return (
    <TaskContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TaskContext.Provider>
  );
}

//Funções como useTasks e useTasksDispatch são chamadas de Hooks Personalizados. Sua função é considerada um Hook personalizado se seu nome começar com use. Isso permite que você use outros Hooks, como useContext, dentro dela.
// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
    return useContext(TaskContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTaskDispatch() {
    return useContext(TasksDispatchContext)
}