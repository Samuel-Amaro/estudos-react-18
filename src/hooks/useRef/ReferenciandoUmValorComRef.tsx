/**
 * * REFERENCIANDO UM VALOR COM UMA REF
 *
 * Este componente usa um ref para manter o controle de quantas vezes o botão foi clicado. Note que não há problema em usar um ref em vez de state aqui porque a contagem de cliques é somente lida e escrita em um manipulador de eventos.
 * 
 * Se você mostrar {ref.current}no JSX, o número não será atualizado no clique. Isso ocorre porque a configuração ref.currentnão dispara uma nova renderização. As informações que são usadas para renderização devem ser state em vez disso.
 * 
 * Não escreva nem leia ref.current durante a renderização.
 * 
 * O React espera que o corpo do seu componente se comporte como uma função pura:
 * 
 * Se as entradas ( props , state e context ) forem as mesmas, ele deverá retornar exatamente o mesmo JSX.
 * Chamá-lo em uma ordem diferente ou com argumentos diferentes não deve afetar os resultados de outras chamadas.
Ler ou escrever uma referência durante a renderização quebra essas expectativas.
 * Você pode ler ou escrever referências de manipuladores de eventos ou efeitos .
 * Se você tiver que ler ou escrever algo durante a renderização, use state.
 * Quando você quebra essas regras, seu componente pode continuar funcionando, mas a maioria dos recursos mais novos que estamos adicionando ao React dependerá dessas expectativas.
*/

import { useRef } from "react";

export default function Counter() {
  //useRef é um React Hook que permite referenciar um valor que não é necessário para renderização.
  //declarando uma referencia para um valor do contador
  //Chame useRef o nível superior do seu componente para declarar uma ou mais referências.
  //useRef retorna um objeto ref com uma única current propriedade inicialmente definida como o valor inicial fornecido.
  //Nas próximas renderizações, useRef retornará o mesmo objeto. Você pode alterar sua current propriedade para armazenar informações e lê-las mais tarde. Isso pode lembrá-lo de state , mas há uma diferença importante.
  //Alterar uma ref não aciona uma nova renderização. Isso significa que as refs são perfeitas para armazenar informações que não afetam a saída visual do seu componente. Por exemplo, se você precisar armazenar um ID de intervalo e recuperá-lo mais tarde, você pode colocá-lo em uma ref. Para atualizar o valor dentro da ref, você precisa alterar manualmente sua current propriedade.
  //Mais tarde, você pode ler esse ID de intervalo da referência para que possa chamar clear esse intervalo:
  // Ao usar uma referência, você garante que:
  //- Você pode armazenar informações entre novas renderizações (ao contrário de variáveis ​​regulares, que são redefinidas em cada renderização).
  // - Alterá-lo não aciona uma nova renderização (ao contrário das variáveis ​​de estado, que acionam uma nova renderização).
  //- As informações são locais para cada cópia do seu componente (diferentemente das variáveis ​​externas, que são compartilhadas).
  //Alterar uma ref não aciona uma nova renderização, então refs não são apropriadas para armazenar informações que você deseja exibir na tela. Use state para isso.
  const ref = useRef(0);

  function handleClick() {
    //atualizando o valor manualmente dentro da ref, passando um novo valor para a current propriedade
    ref.current = ref.current + 1;
    alert("You clicked " + ref.current + " times!");
  }

  return <button onClick={handleClick}>Click me!</button>;
}
