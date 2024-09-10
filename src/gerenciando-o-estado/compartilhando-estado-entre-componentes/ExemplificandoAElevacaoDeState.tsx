/**
 * * Exemplificando a elevação de state
 * 
 * Neste exemplo, um componente Accordion pai renderiza dois componentes Panel separados:
 * 
 * Accordion
    Panel
    Panel
 * 
 * Cada componente Panel tem um state booleano isActive que determina se o seu conteúdo está visível.
 * 
 * Mas agora digamos que você queira alterá-lo para que apenas um painel seja expandido por vez. Com esse design, expandir o segundo painel deve recolher o primeiro. 
 * 
 * Para coordenar esses dois painéis, você precisa “elevar o state deles” para um componente pai 
*/

import { useState } from "react";

function Panel({
  title,
  children,
  isActive,
  onShow,
}: {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onShow: () => void;
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}

export default function Accordion() {
  //exemplo de elevação de state, o compoente pai mais proximo compartilha o estado entre componentes filhos
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <h2>Almaty, Cazaquistão</h2>
      <Panel
        title="Sobre"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Com uma população de cerca de 2 milhões de habitantes, Almaty é a maior
        cidade do Cazaquistão. De 1929 a 1997, foi sua capital.
      </Panel>
      <Panel
        title="Etimologia"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        O nome vem de <span lang="kk-KZ">алма</span>, a palavra cazaque para
        "maçã", e é frequentemente traduzido como "cheio de maçãs". De fato,
        acredita-se que a região em torno de Almaty seja o lar ancestral da
        maçã, e o <i lang="la">Malus sieversii</i> selvagem é considerado um
        provável candidato a ancestral da maçã doméstica moderna.
      </Panel>
    </>
  );
}
