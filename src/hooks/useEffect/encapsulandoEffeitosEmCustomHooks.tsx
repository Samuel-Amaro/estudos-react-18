/**
 * * ENCAPSULANDO EFEITOS EM CUSTOM HOOKS
 *
 * Efeitos são uma “saída de emergência”: você os usa quando precisa “sair do React” e quando não há uma solução interna melhor para seu caso de uso. Se você frequentemente precisa escrever Efeitos manualmente, geralmente é um sinal de que precisa extrair alguns Hooks personalizados para comportamentos comuns dos quais seus componentes dependem.
 *
 * Por exemplo, este useChatRoom Hook personalizado “esconde” a lógica do seu Efeito por trás de uma API mais declarativa:
 */

import { useState } from "react";
import useChatRoom from "./useChatRoom";

//Então você pode usá-lo a partir de qualquer componente como este:
//Há também muitos Hooks personalizados excelentes para cada finalidade disponíveis no ecossistema React.
function ChatRoom({ roomId }: { roomId: string }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  //custom hook, porque e um efeito manual que eu escreveria para algo que eu necessitaria em varios componentes por isso essa custom hook, comum para usar em varios lugares
  //encapsula em um custom hook
  //quando usar um custom hook:
  //Você não precisa extrair um Hook personalizado para cada pequeno trecho de código duplicado. Alguma duplicação é aceitável. Por exemplo, extrair um Hook useFormInput para envolver uma única chamada useState como feito anteriormente provavelmente é desnecessário.
  //No entanto, sempre que você escrever um Efeito, considere se seria mais claro encapsulá-lo também em um Hook personalizado. Você não deve precisar de efeitos com muita frequência, então, se você estiver escrevendo um, significa que precisa “sair do mundo React” para sincronizar com algum sistema externo ou fazer algo para o qual o React não tenha uma API embutida. encapsular o Efeito em um Hook personalizado permite que você comunique claramente sua intenção e como os dados fluem por ele.
  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
  });

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

export function AppUsoEffect4() {
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
