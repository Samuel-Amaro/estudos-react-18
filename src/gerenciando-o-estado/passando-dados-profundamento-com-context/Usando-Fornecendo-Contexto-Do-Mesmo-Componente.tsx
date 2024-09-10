/**
 * * USANDO E FORNECENDO CONTEXTO DO MESMO COMPONENTE
 *
 * Como o contexto permite que você leia informações de um componente acima, cada um Section poderia ler o level do Section acima e passar level + 1 para baixo automaticamente.
 */

import Heading from "./Heading";
import Section2 from "./Section2";

export default function Page() {
  return (
    <Section2>
      {/*level 0 (default) + 1 provendo da section atual somando = 1 aqui*/}
      <Heading>Title</Heading>
      {/*lera 1 da section pai que proveu 1*/}
      <Section2>
        {/*level 1 (fornecido pelo section pai) + 1 proovendo da section atual somado = 2*/}
        <Heading>Heading</Heading>
        {/*lera 2 aqui da section pai que proveu 2*/}
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section2>
          {/*level 2 (fornecido pelo section pai) + 1 provendo da section atual somado = 3*/}
          <Heading>Sub-heading</Heading>
          {/*lera 3 aqui da section pai que proveu 3*/}
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section2>
            {/*level 3 (fornecido pelo section pai) + 1 provendo da section atual somado = 4*/}
            <Heading>Sub-sub-heading</Heading>
            {/*lera 4 aqui da section pai que proveu 4*/}
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section2>
        </Section2>
      </Section2>
    </Section2>
  );
}
