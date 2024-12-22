/**
 * * CONECTANDO A UM SISTEMA EXTERNO
 *
 *  Alguns componentes precisam permanecer conectados à rede, alguma API do navegador ou uma biblioteca de terceiros, enquanto são exibidos na página. Esses sistemas não são controlados pelo React, então são chamados de externos.
 *
 * Para conectar seu componente a algum sistema externo, chame useEffect no nível superior do seu componente:
 *
 * Neste exemplo, o ChatRoom componente usa um Efeito para permanecer conectado a um sistema externo definido em chat.js. Pressione “Abrir chat” para fazer o ChatRoomcomponente aparecer. Este sandbox é executado no modo de desenvolvimento, então há um ciclo extra de conectar e desconectar, conforme explicado aqui. Tente alterar o roomIde serverUrlusando o menu suspenso e a entrada, e veja como o Efeito se reconecta ao chat. Pressione “Fechar chat” para ver o Efeito se desconectar uma última vez.
 */

import { useEffect, useState } from "react";
import { createConnection } from "./chat";

function ChatRoom({ roomId }: { roomId: string }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  //`useEffect`é um React Hook que permite sincronizar um componente com um sistema externo.
  //Você precisa passar dois argumentos para useEffect:
  //1. Uma função de configuração com código de configuração que se conecta a esse sistema.
  //1.1 Ele deve retornar uma função de limpeza com código de limpeza que se desconecta desse sistema.
  //2. Uma lista de dependências incluindo todos os valores do seu componente usados ​​dentro dessas funções.
  useEffect(() => {
    //function de configuração com implementação de configuração que se conecta a um sistema externo
    const connection = createConnection(serverUrl, roomId);
    connection.connect();

    //function de limpeza que implementa uma forma de desconectar de um sistema externo
    return () => {
      connection.disconnect();
    };
    //array de dependencias, com valores reativos(props, states, ...) que são usados dentro das funções de configuração e limpeza
  }, [serverUrl, roomId]);

  //O React chama suas funções de configuração e limpeza sempre que necessário, o que pode acontecer diversas vezes:
  //1. Seu código de configuração é executado quando seu componente é adicionado à página (montagens).
  //2. Após cada nova renderização do seu componente em que as dependências foram alteradas:
  //2.1 Primeiro, seu código de limpeza é executado com os antigos props e state.
  //2.2 Em seguida, seu código de configuração é executado com os novos props e estado.
  //3. Seu código de limpeza é executado uma última vez depois que seu componente é removido da página (desmontado).

  //OBS: Para ajudar você a encontrar bugs, no desenvolvimento o React executa setup e cleanup uma vez extra antes do setup . Este é um teste de estresse que verifica se a lógica do seu Effect está implementada corretamente. Se isso causar problemas visíveis, sua função de limpeza está sem alguma lógica. A função de limpeza deve parar ou desfazer o que quer que a função de configuração esteja fazendo. A regra geral é que o usuário não deve ser capaz de distinguir entre a configuração sendo chamada uma vez (como na produção) e uma sequência setup → cleanup → setup (como no desenvolvimento).

  //OBS: Tente escrever cada Efeito como um processo independente e pense em um único ciclo de configuração/limpeza por vez. Não deve importar se seu componente está montando, atualizando ou desmontando. Quando sua lógica de limpeza “espelha” corretamente a lógica de configuração, seu Efeito é resiliente para executar configuração e limpeza sempre que necessário.

  //OBS: Um Effect permite que você mantenha seu componente sincronizado com algum sistema externo (como um serviço de chat). Aqui, sistema externo significa qualquer pedaço de código que não seja controlado pelo React, como:
  // - Um temporizador gerenciado com setInterval()e clearInterval().
  // - Uma assinatura de evento usando window.addEventListener()e window.removeEventListener().
  // - Uma biblioteca de animação de terceiros com uma API como animation.start()e animation.reset().
  //Se você não estiver se conectando a nenhum sistema externo, provavelmente não precisa de um efeito.

  return (
    <>
      <label>
        Server URL:{" "}
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

export default function AppUsoEffect1() {
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{" "}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? "Close chat" : "Open chat"}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
