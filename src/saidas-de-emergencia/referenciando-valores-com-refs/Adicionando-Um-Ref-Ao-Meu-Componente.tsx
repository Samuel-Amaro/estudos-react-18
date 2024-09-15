/**
 * * REFERENCIANDO VALORES COM REFS
 *
 *  Quando você quer que um componente “lembre” de alguma informação, mas você não quer que aquela informação cause novos renders, você pode usar um ref.
 *
 * * Adicionando um ref ao seu componente
 *
 */

import { useRef } from "react"; //Você pode adicionar um ref ao seu componente importando o Hook useRef do React:

export default function Counter() {
  //Dentro do seu componente, invoque o Hook useRef e passe o valor inicial que você quer referenciar como o único argumento. Por exemplo, aqui está um ref para o valor 0:
  //useRef retorna um objeto assim:
  //{
  //    current: 0 // o valor que você passou para o useRef
  //}
  //O ref aponta para um número, mas, como state, você pode apontá-lo para qualquer coisa: uma string, um objeto, ou até mesmo uma função. Diferentemente do state, ref é um simples objeto Javascript com a propriedade current que você pode ler e modificar.
  //Note que o componente não re-renderiza com cada incremento. Assim como state, refs são retidos pelo React entre re-renderizações. Entretanto, alterar o state re-renderiza um componente. Mudar um ref não!
  const ref = useRef(0);

  function handleClick() {
    //Você pode acessar o valor atual daquele ref através da propriedade ref.current. Esse valor é intencionalmente mutável, o que significa que você pode tanto ler quanto escrever sobre ele. É como um bolso secreto do seu componente o qual o React não rastreia. (É isso que o faz uma “saída de emergência” do fluxo de data de mão-única do React
    //Aqui, um botão irá incrementar ref.current a cada clique:
    ref.current = ref.current + 1;
    alert("You clicked " + ref.current + " times!");
  }

  return <button onClick={handleClick}>Click me!</button>;
}
