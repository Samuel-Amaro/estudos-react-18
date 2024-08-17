/**
 * * RETORNO CONDICIONAL DE JSX
 *
 * Digamos que você tenha um componente PackingList renderizando vários Items, que podem ser marcados como empacotados ou não:
 */

type Props = {
  name: string;
  isPacked: boolean;
};

function Item({ name, isPacked }: Props) {
  //Observe como você está criando lógica de ramificação com as declarações if e return do JavaScript. No React, o fluxo de controle (como condições) é tratado pelo JavaScript.
  if (isPacked) return <li className="item">{name} ✔</li>;
  return <li className="item">{name}</li>;
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
