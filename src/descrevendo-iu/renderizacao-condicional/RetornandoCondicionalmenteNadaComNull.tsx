/**
 * * Retornando condicionalmente nada com null
 *
 * Em algumas situações, você não desejará renderizar nada. Por exemplo, digamos que você não queira mostrar itens embalados de jeito nenhum. Um componente deve retornar algo. Nesse caso, você pode retornar null:
 */

type Props = {
  name: string;
  isPacked: boolean;
};

function Item({ name, isPacked }: Props) {
  //Se isPacked equivaler à true, o componente não retornará nada, null.
  //Na prática, retornar null de um componente não é comum porque pode surpreender um desenvolvedor que está tentando renderizá-lo. Com mais frequência, você condicionalmente incluiria ou excluíria o componente no JSX do componente pai. Veja como fazer isso!
  if (isPacked) return null;
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
