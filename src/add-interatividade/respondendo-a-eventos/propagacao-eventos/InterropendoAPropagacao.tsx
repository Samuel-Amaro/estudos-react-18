/**
 * * INTERROPENDO A PROPAGAÇÃO
 *
 *  Os manipuladores de eventos recebem um event object como único argumento. Por convenção, ele é normalmente chamado de e, que significa “event”, em inglês. Você pode usar esse objeto para obter informações sobre o evento.
 *
 * Esse event object também permite que você interrompa a propagação. Caso deseje que um evento não chegue aos componentes pai, você precisa chamar e.stopPropagation() como no exemplo do componente Button abaixo:
 *
 */

type PropsButton = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
};

function Button({ onClick, children }: PropsButton) {
  return (
    <button
      onClick={(e) => {
        //impede que este evento se propague para cima da arvore do react, para que não acione eventos de click nos componente pai
        e.stopPropagation();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("Você clicou na toolbar!");
      }}
    >
      <Button onClick={() => alert("Reproduzindo!")}>Reproduzir Filme</Button>
      <Button onClick={() => alert("Enviando!")}>Enviar Imagem</Button>
    </div>
  );
}
