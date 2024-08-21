/**
 * * Removendo comportamento padrão
 *
 * Alguns eventos do navegador têm um comportamento padrão associado a eles. Por exemplo, um evento de envio de formulário <form>, que acontece quando um botão dentro dele é clicado, recarregará a página inteira por padrão:
 *
 * É possível chamar e.preventDefault() no objeto do evento para impedir que isso aconteça:
 *
 * Não confunda e.stopPropagation() com e.preventDefault(). Ambos são úteis, mas não estão relacionados:
 *
 * e.stopPropagation() impede que os manipuladores de eventos associados às tags superiores sejam acionados.
 *
 * e.preventDefault() impede que o navegador execute o comportamento padrão associado a determinados eventos.
 */

export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Enviando!");
      }}
    >
      <input />
      <button>Enviar</button>
    </form>
  );
}
