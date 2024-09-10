import { useState } from "react";
import { Task } from "./Consolidar-Logica-State-Com-Um-Reducer";

type PropsTaskList = {
  tasks: {
    id: number;
    text: string;
    done: boolean;
  }[];
  onChangeTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
};

type PropsT = {
  task: {
    id: number;
    text: string;
    done: boolean;
  };
  onChange: (task: Task) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: PropsTaskList) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <T task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function T({ task, onChange, onDelete }: PropsT) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
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
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
