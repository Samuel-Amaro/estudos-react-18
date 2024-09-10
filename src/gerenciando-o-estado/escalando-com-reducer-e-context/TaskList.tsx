import { useState } from "react";
import { useTaskDispatch, useTasks } from "./TasksContext";

type PropsT = {
  task: {
    id: number;
    text: string;
    done: boolean;
  };
};

export default function TaskList() {
  //le o contexto para obter tasks
  const tasks = useTasks()

  if (tasks) {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <T task={task} />
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

function T({ task }: PropsT) {
  const [isEditing, setIsEditing] = useState(false);
  //para atualizar o state ler o contexto da dispatch function para obtela e chamala
  const dispatch = useTaskDispatch()

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            if (dispatch) {
              //despachando a action de changed
              dispatch({
                type: "changed",
                ...task,
                text: e.target.value,
              });
            }
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          if (dispatch) {
            //despachando a action de changed
            dispatch({
              type: "changed",
              ...task,
              done: e.target.checked,
            });
          }
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          if (dispatch) {
            //despachando a action de deleted
            dispatch({
              type: "deleted",
              ...task,
              id: task.id,
            });
          }
        }}
      >
        Delete
      </button>
    </label>
  );
}
