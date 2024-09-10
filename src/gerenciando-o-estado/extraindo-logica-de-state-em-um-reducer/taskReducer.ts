import { Task } from "../extraindo-logica-de-state-em-um-reducer/Consolidar-Logica-State-Com-Um-Reducer";

export const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

//Mas tenha em mente que os tipos de ação devem idealmente descrever “o que o usuário fez” em vez de “como você quer que o estado mude”. Isso torna mais fácil adicionar mais recursos posteriormente.
type ACTIONTYPE =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; task: Task }
  | { type: "deleted"; id: number };

//escrevendo uma function redutora
//O redutor deve ser uma função pura — ele deve apenas calcular o próximo estado. (Para ajudar a detectar erros como esse, o React chamará seus redutores várias vezes no Modo Estrito. É por isso que, se você colocar um alerta em um redutor, ele dispara duas vezes.)
//Uma função redutora é onde você colocará sua lógica de estado. Ela recebe dois argumentos, o estado atual e o objeto de ação, e retorna o próximo estado:
//O código acima usa instruções if/else, mas é uma convenção usar instruções switch dentro de reducers. O resultado é o mesmo, mas pode ser mais fácil ler instruções switch rapidamente.
//Recomendamos envolver cada bloco case nas chaves { e } para que as variáveis ​​declaradas dentro de cases diferentes não entrem em conflito umas com as outras. Além disso, um case geralmente deve terminar com um return. Se você esquecer de return, o código "cairá" para o próximo case, o que pode levar a erros!
//Se você ainda não se sente confortável com instruções switch, usar if/else é completamente aceitável.
//Os redutores do React são um exemplo da mesma ideia: eles pegam o estado até agora e a ação , e retornam o próximo estado. Dessa forma, eles acumulam ações ao longo do tempo em estado.
export default function tasksReducer(
  tasks: typeof initialTasks,
  action: ACTIONTYPE,
) {
  // retorna o próximo estado para o React definir
  //O React definirá o estado para o que você retornar do redutor.
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknow action: ");
    }
  }
}
