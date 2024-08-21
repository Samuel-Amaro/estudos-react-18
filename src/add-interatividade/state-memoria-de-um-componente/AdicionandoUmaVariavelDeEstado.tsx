/**
 * * ADICIONANDO UMA VARIÁVEL DE ESTADO
 *
 * * CONHEÇA SEU PRIMEIRO HOOK
 *
 * No React, useState, assim como qualquer outra função iniciada com “use”, é denominada de Hook.
 *
 * Hooks são funções especiais que estão disponíveis somente enquanto o React está renderizando (as quais nós entraremos em mais detalhes na próxima página). Eles permitem que você “se conecte” a diferentes recursos do React.
 *
 * State é só um destes recursos
 *
 * Hooks—funções iniciadas com use — só podem ser chamadas no nível superior dos seus componentes ou em seus próprios Hooks. Você não pode chamar Hooks dentro de condições, loops, ou outras funções aninhadas. Hooks são funções, mas é útil pensar neles como declarações incondicionais sobre as necessidades do seu componente. Você “usa” recursos do React no topo de seu componente similarmente a como você “importa” módulos no topo de seu arquivo.
 *
 * * ANATOMIA DO useState
 *
 * Ao chamar useState, você está dizendo ao React que você quer que esse componente lembre-se de algo:
 *
 * A convenção é nomear esse par como const [algo, setAlgo]. Você poderia nomeá-lo de qualquer outra coisa, mas convenções tornam as coisas mais fáceis de se entender entre projetos.
 *
 * O único argumento para o useState é o valor inicial da sua variável de state. Nesse exemplo, o valor inicial de index é definido como 0 com useState(0).
 *
 * Toda vez que seu componente é renderizado, useState lhe dá um array contendo dois valores:
 *
 * A variável de state (index) com o valor que você armazenou.
 * A função de definição de state (setIndex) a qual pode atualizar a variável de state e acionar o React para renderizar o componente novamente.
 *
 *
 */

import { useState } from "react"; //importar o useState
import { sculptureList } from "../../data";

export default function Gallery() {
  //add uma variavel de estado usando o hook useState
  //oque e um hook? e uma function especial que so estao disponiveis enquanto o react esta renderizando, permitem que o dev se conecte a diferentes recursos do react
  //Hooks—funções iniciadas com use — só podem ser chamadas no nível superior dos seus componentes ou em seus próprios Hooks.
  //Ao chamar useState, você está dizendo ao React que você quer que esse componente lembre-se de algo:
  //toda vez que este componente e renderizado useState lhe da um array contendo dois valores
  //index e Uma Variável de state para reter os dados entre renderizações.
  //setIndex Uma função de definição de state para atualizar a variável e acionar o React para renderizar o componente novamente.
  //o argumento para a function useState() e o valor inicial da variavel de state
  const [index, setIndex] = useState(0);

  function handleClick() {
    //aqui atualiza o state, quando o user clica no button
    setIndex(index + 1);
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
