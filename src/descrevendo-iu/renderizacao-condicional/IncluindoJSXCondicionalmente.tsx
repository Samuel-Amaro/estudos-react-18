/**
 * * Incluindo JSX condicionalmente
 */

type Props = {
  name: string;
  isPacked: boolean;
};

function Item({ name, isPacked }: Props) {
  //incluir condicionalmente um pouco de JSX para tornar seu código mais DRY.
  //O JavaScript possui uma sintaxe compacta para escrever uma expressão condicional — o operador condicional ou “operador ternário”.
  //Você pode adicionar ainda mais quebras de linha e parênteses para facilitar a aninhamento de mais JSX em cada um dos casos
  //Este estilo funciona bem para condições simples, mas use-o com moderação. Se seus componentes ficarem bagunçados com marcação condicional aninhada demais, considere extrair componentes filhos para limpar as coisas. No React, a marcação faz parte do seu código, então você pode usar ferramentas como variáveis e funções para organizar expressões complexas.
  return (
    <li className="item">{isPacked ? <del>{name + " ✔"}</del> : name}</li>
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
