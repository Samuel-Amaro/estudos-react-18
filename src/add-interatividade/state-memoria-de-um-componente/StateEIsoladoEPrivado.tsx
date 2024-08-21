/**
 * * STATE É ISOLADO E PRIVADO
 *
 * State é local a uma instância do componente na tela. Em outras palavras, se você renderiza o mesmo componente duas vezes, cada cópia terá state completamente isolado! Alterar um deles não irá afetar o outro.
 *
 * Nesse exemplo, o componente Gallery de antes é renderizado duas vezes sem mudanças a sua lógica. Tente clicar nos botões dentro de cada uma das galerias. Note que seus states são independentes:
 *
 * Isto é o que faz do state diferente de variáveis comuns que você pode declarar no topo de seu módulo. State não é atrelado a uma chamada de função em particular ou a um lugar no código, mas sim é “local” a um lugar específico na tela. Você renderizou dois componentes <Gallery />, então seus states são armazenados separadamente.
 *
 * Perceba também como o componente Page não “sabe” nada sobre o state de Gallery ou se até ele tem algum. Diferentemente das props, o state é completamente privado ao componente que o declara. O componente pai não pode alterá-lo. Isso permite que você adicione state a qualquer componente ou remova-o sem impactar o restante dos componentes.
 *
 * E se você quisesse que ambas as galerias mantivessem seus states sincronizados? A maneira correta de fazer isso em React se dá por meio da remoção do state dos componentes filhos e armazenando-o no componente pai comum mais próximo a eles.
 */

import { useState } from "react";
import { sculptureList } from "../../data";

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </section>
  );
}
