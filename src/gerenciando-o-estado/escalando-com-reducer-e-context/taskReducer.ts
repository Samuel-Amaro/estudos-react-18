export const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

//Mas tenha em mente que os tipos de ação devem idealmente descrever “o que o usuário fez” em vez de “como você quer que o estado mude”. Isso torna mais fácil adicionar mais recursos posteriormente.
export type ACTIONTYPE =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; id: number; text: string; done: boolean }
  | { type: "deleted"; id: number };

//escrevendo uma function redutora

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
        if (t.id === action.id) {
          return {
            id: action.id,
            text: action.text,
            done: action.done,
          };
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
