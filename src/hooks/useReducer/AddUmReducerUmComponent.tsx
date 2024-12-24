/**
 * * ADICIONAR UM REDUTOR A UM COMPONENT
 *
 *  Chame useReducer o nível superior do seu componente para gerenciar o estado com um redutor.
 *
 * useReduceré muito similar a useState, mas permite que você mova a lógica de atualização de estado de manipuladores de eventos para uma única função fora do seu componente.
 */

import { useReducer } from "react";

//function redutora, que possui a logica de atualização de estado, com base na action, especifica como o estado e atualizado
//o react passara para esta function o state atual, e a action(um objeto que representa oque o usuario fez, A ação realizada pelo usuário. Pode ser um valor de qualquer tipo. Por convenção, uma ação é geralmente um objeto com uma typepropriedade que o identifica e, opcionalmente, outras propriedades com informações adicionais.)
function reducer(state: { age: number }, action: { type: "incremented_age" }) {
  if (action.type === "incremented_age") {
    return {
      age: state.age + 1,
    };
  }
  throw Error("Unknown action.");
}

export default function Counter() {
  //gerenciando o estado com um reducer
  //useReducer retorna uma matriz com exatamente dois itens:
  //O estado atual desta variável de estado, inicialmente definido como o estado inicial fornecido.
  //A dispatch função que permite alterá-lo em resposta à interação.
  //Para atualizar o que está na tela, chame dispatch com um objeto que representa o que o usuário fez, chamado de ação :
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button
        onClick={() => {
          //esta function ira chama uma action que ira atualizar o state e acionar uma nova render
          //O React passará o estado atual e a ação para sua função reducer . Seu reducer calculará e retornará o próximo estado. O React armazenará esse próximo estado, renderizará seu componente com ele e atualizará a UI.
          dispatch({ type: "incremented_age" });
        }}
      >
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
