import { useId } from "react";

/**
 * * GERANDO IDs para vários elementos relacionados
 *
 * Se você precisar fornecer IDs para vários elementos relacionados, você pode chamar useId para gerar um prefixo compartilhado para eles:
 *
 * Isso permite que você evite chamar useId para cada elemento que precisa de um ID único.
 *
 * @returns
 */

export default function Form() {
  //useId é um Hook do React para gerar IDs únicos que podem ser passados para atributos de acessibilidade.
  //retorna uma sequência de ID único associada a esta chamada useId específica neste componente específico.
  const id = useId();

  //aqui usamos o id gerado pelo useId para ser um prefixo para os ids
  return (
    <form>
      <label htmlFor={id + "-firstName"}>Primeiro nome:</label>
      <input id={id + "-firstName"} type="text" />
      <hr />
      <label htmlFor={id + "-lastName"}>Sobrenome:</label>
      <input id={id + "-lastName"} type="text" />
    </form>
  );
}
