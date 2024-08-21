/**
 * * PASSANDO MANIPULADORES DE EVENTOS COMO PROPS
 *
 *  É comum que o componente pai defina o manipulador de eventos de um componente filho.
 */

type PropsButton = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
};

type PropsPlayButton = {
  movieName: string;
};

function Button({ onClick, children }: PropsButton) {
  return <button onClick={onClick}>{children}</button>;
}

function PlayButton({ movieName }: PropsPlayButton) {
  //definindo o event handler no componente pai
  //funcion manipuladora de evento do componente Button
  function handlePlayClick() {
    alert(`Reproduzindo ${movieName}!`);
  }

  return (
    //o componente pai esta definindo o manipulador de eventos do componente filho
    //passe uma prop que o componente recebe de seu pai como o manipulador de eventos
    <Button onClick={handlePlayClick}>Reproduzir "{movieName}"</Button>
  );
}

function UploadButton() {
  //aqui definimos um evento handler inline e pasamos como prop para o componente button, componente pai definindo o event handler do filho
  return <Button onClick={() => alert("Enviando!")}>Enviar Imagem</Button>;
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="O Serviço de Entregas da Kiki" />
      <UploadButton />
    </div>
  );
}
