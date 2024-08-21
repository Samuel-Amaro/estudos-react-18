/**
 * * Nomeando props de manipuladores de eventos
 *
 * Os componentes nativos, como <button> e <div>, suportam apenas os nomes de eventos do navegador, tais como onClick. No entanto, quando você está criando seus próprios componentes, você pode nomear os manipuladores de eventos da forma que preferir.
 *
 * Por convenção, as props dos manipuladores de eventos devem começar com o termo on, seguido por uma letra maiúscula.
 *
 * No entanto, é você quem escolhe o nome da prop recebida pelo seu componente personalizado Button!
 */

type PropsButton = {
  onSmash: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
};

type PropsToolbar = {
  onPlayMovie: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onUploadImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function Button({ onSmash, children }: PropsButton) {
  return <button onClick={onSmash}>{children}</button>;
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert("Reproduzindo!")}>Reproduzir Filme</Button>
      <Button onSmash={() => alert("Enviando!")}>Enviar Imagem</Button>
    </div>
  );
}

/**
 * Quando seu componente oferece suporte a várias interações, você pode nomear as props dos manipuladores de eventos com base em conceitos específicos da sua aplicação. Por exemplo, o componente Toolbar pode receber os manipuladores de eventos onPlayMovie e onUploadImage:
 */

export function App2() {
  return (
    <Toolbar
      onPlayMovie={() => alert("Reproduzindo!")}
      onUploadImage={() => alert("Enviando!")}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }: PropsToolbar) {
  return (
    <div>
      <Button onSmash={onPlayMovie}>Reproduzir Filme</Button>
      <Button onSmash={onUploadImage}>Enviar Imagem</Button>
    </div>
  );
}

/**
 * Note como o componente App não precisa saber o que o componente Toolbar fará com o onPlayMovie ou onUploadImage. Isso é um detalhe de implementação da Toolbar. Aqui, a Toolbar os passa como manipuladores onClick para seus componentes Button, mas posteriormente pode acioná-los também em um atalho de teclado. Nomear as props com base em interações específicas da aplicação, como onPlayMovie, oferece a flexibilidade para alterar como elas são usadas no futuro.
 */
