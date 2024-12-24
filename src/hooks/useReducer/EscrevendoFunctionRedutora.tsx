/**
 * * ESCREVENDO A FUNÇÃO REDUTORA
 * 
 * Neste exemplo, o redutor gerencia um objeto de estado com dois campos: name e age.
 */

import { useReducer } from "react";

//function redutora
//function redutora, que possui a logica de atualização de estado, com base na action, especifica como o estado e atualizado
//o react passara para esta function o state atual, e a action(um objeto que representa oque o usuario fez, A ação realizada pelo usuário. Pode ser um valor de qualquer tipo. Por convenção, uma ação é geralmente um objeto com uma typepropriedade que o identifica e, opcionalmente, outras propriedades com informações adicionais.)
//Então você precisa preencher o código que irá calcular e retornar o próximo estado. Por convenção, é comum escrevê-lo como uma switch declaração. Para cada um case no switch, calcule e retorne algum próximo estado.
//Ações podem ter qualquer formato. Por convenção, é comum passar objetos com uma typepropriedade identificando a ação. Ela deve incluir as informações mínimas necessárias que o reducer precisa para calcular o próximo estado.
//Os nomes dos tipos de ação são locais para seu componente. Cada ação descreve uma única interação, mesmo que isso leve a múltiplas alterações nos dados. O formato do estado é arbitrário, mas geralmente será um objeto ou uma matriz.
function reducer(
  state: {
    name: string;
    age: number;
  },
  action:
    | { type: "incremented_age" }
    | { type: "changed_name"; nextName: string },
) {
  switch (action.type) {
    //O estado é somente leitura. Não modifique nenhum objeto ou array no estado:
    //Em vez disso, sempre retorne novos objetos do seu redutor:
    case "incremented_age": {
      return {
        name: state.name,
        age: state.age + 1,
      };
    }
    case "changed_name": {
      return {
        name: action.nextName,
        age: state.age,
      };
    }
    default:
      throw Error("Unknown action");
  }
}

const initialState = { name: "Taylor", age: 42 };

export default function Form() {
  //gerenciando o estado com um reducer
  //useReducer retorna uma matriz com exatamente dois itens:
  //O estado atual desta variável de estado, inicialmente definido como o estado inicial fornecido.
  //A dispatch função que permite alterá-lo em resposta à interação.
  //Para atualizar o que está na tela, chame dispatch com um objeto que representa o que o usuário fez, chamado de ação :
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    //esta function ira chama uma action que ira atualizar o state e acionar uma nova render
    //O React passará o estado atual e a ação para sua função reducer . Seu reducer calculará e retornará o próximo estado. O React armazenará esse próximo estado, renderizará seu componente com ele e atualizará a UI.
    dispatch({ type: "incremented_age" });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "changed_name",
      nextName: e.target.value,
    });
  }

  return (
    <>
      <input value={state.name} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Increment age</button>
      <p>
        Hello, {state.name}. You are {state.age}.
      </p>
    </>
  );
}
