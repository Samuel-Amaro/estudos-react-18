import { useEffect } from "react";
import { createConnection } from "./chat";

//Por exemplo, este useChatRoomHook personalizado “esconde” a lógica do seu Efeito por trás de uma API mais declarativa:
//logica extraida para um custom hook
export default function useChatRoom({
  roomId,
  serverUrl,
}: {
  serverUrl: string;
  roomId: string;
}) {
  //`useEffect`é um React Hook que permite sincronizar um componente com um sistema externo.
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
}
