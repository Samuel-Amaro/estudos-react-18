/**
 * * PROPAGAÇÃO DE EVENTOS
 *
 * Os manipuladores de eventos também capturam eventos de quaisquer elementos filhos que o seu componente possa ter. Dizemos que um evento “borbulha” ou “se propaga” pela árvore: ele começa no local onde o evento ocorreu e, em seguida, se propaga pela árvore.
 *
 * Esta <div> contém dois botões, sendo que tanto a <div> quanto cada botão tem seu próprio manipulador onClick. Você sabe dizer quais manipuladores serão acionados quando clicar em um dos botões?
 *
 * Se você clicar em qualquer um dos botões, o onClick do botão clicado será executado primeiro e, em seguida, o onClick da <div> pai será executado. Como resultado, duas mensagens serão exibidas. Se você clicar na toolbar, apenas o onClick da <div> pai será executado.
 *
 * Todos os eventos se propagam no React, exceto onScroll, que funciona apenas na tag JSX à qual foi adicionado.
 */

export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("Você clicou na toolbar!");
      }}
    >
      <button
        /*os eventos de click do button aqui, vão acionar o manipulador da div, pois propaga para cima*/ onClick={() =>
          alert("Reproduzindo!")
        }
      >
        Reproduzir Filme
      </button>
      <button onClick={() => alert("Enviando!")}>Enviar Imagem</button>
    </div>
  );
}
