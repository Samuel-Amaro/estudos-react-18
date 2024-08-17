/**
 * * Operador lógico AND (&&)
 *
 * Outro atalho comum que você encontrará é o operador JavaScript AND lógico (&&). Dentro de componentes React, ele geralmente é usado quando você deseja renderizar algum JSX quando a condição for verdadeira, ou não renderizar nada caso contrário. Com &&, você pode renderizar condicionalmente o marcador de verificação apenas se isPacked for true:
 *
 * A Express JavaScript && retorna o valor do seu lado direito (no nosso caso, o marcador de verificação) se o lado esquerdo (a nossa condição) for true. Mas se a condição for false, a expressão inteira se torna false. O React considera false como um “vazio” na árvore JSX, assim como null ou undefined, e não renderiza nada em seu lugar.
 */

type Props = {
  name: string;
  isPacked: boolean;
};

function Item({ name, isPacked }: Props) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
  );
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
