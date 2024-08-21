/**
 * * Quando uma variável comum não é o suficiente
 *
 * Aqui está um componente que renderiza a imagem de uma escultura. Ao clicar no botão “Next” ele deveria mostrar a próxima escultura mudando o index para 1, então 2, e assim por diante. Entretanto, isso não funcionará (você pode tentar!):
 *
 * O manipulador de eventos handleClick está atualizando a variável local, index. Mas duas coisas previnem essa mudança de ser visível:
 *
 * Variáveis locais não persistem entre renderizações. Quando o React renderiza esse componente uma segunda vez, ele o faz do princípio—sem considerar quaisquer mudanças às variáveis locais.
 * Mudanças às variáveis locais não acionam renderizações. O React não percebe que precisa renderizar o componente novamente com os novos dados.
 *
 * Para atualizar um componente com novos dados, duas coisas precisam acontecer:
 *
 * Reter os dados entre renderizações.
 * Acionar o React para renderizar o componente com os novos dados (rerrenderização).
 *
 * O Hook useState provê essas duas coisas:
 *
 * Uma Variável de state para reter os dados entre renderizações.
 * Uma função de definição de state para atualizar a variável e acionar o React para renderizar o componente novamente.
 *
 *
 */

import { sculptureList } from "../../data";

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  const sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
