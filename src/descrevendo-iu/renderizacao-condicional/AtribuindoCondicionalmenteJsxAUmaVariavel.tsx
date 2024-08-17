/**
 * * Atribuindo condicionalmente JSX à uma variável
 *
 *  Quando os atalhos atrapalham a escrita de código simples, tente usar uma declaração if e uma variável. Você pode reatribuir variáveis definidas com let, portanto, comece fornecendo o conteúdo padrão que você deseja exibir, o nome:
 */

import { ReactNode } from "react";

type Props = {
  name: string;
  isPacked: boolean;
};

function Item({ name, isPacked }: Props) {
  let itemContent: string | ReactNode = name;
  //Use uma declaração if para reatribuir uma expressão JSX a itemContent se isPacked for true:
  //Este estilo é o mais verbose, mas também o mais flexível.
  //Como antes, isso funciona não apenas para texto, mas também para JSX arbitrário:
  if (isPacked) {
    itemContent = <del>{name + " ✔"}</del>;
  }
  return <li className="item">{itemContent}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Packing List de Sally Ride</h1>
      <ul>
        <Item isPacked={true} name="Traje espacial" />
        <Item isPacked={true} name="Capacete com folha dourada" />
        <Item isPacked={false} name="Foto de Tam" />
      </ul>
    </section>
  );
}
