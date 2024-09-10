import { useState } from "react";
import { useTaskDispatch } from "./TasksContext";

let nextId = 3;

export default function AddTask() {
  const [text, setText] = useState("");
  //le o contexto e obtem a function para chamala
  const dispatch = useTaskDispatch()

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          if (dispatch) {
            //despachando a action de added
            dispatch({
              type: "added",
              id: nextId++,
              text: text,
            });
          }
        }}
      >
        Add
      </button>
    </>
  );
}
