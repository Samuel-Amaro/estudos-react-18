/**
 * * ETAPA 3: ADICIONE CLEANUP SE NECESSARIO
 *
 * Considere um exemplo diferente. Você está escrevendo um ChatRoom componente que precisa se conectar ao servidor de bate-papo quando ele aparece. Você recebe uma createConnection() API que retorna um objeto com métodos connect()e disconnect(). Como você mantém o componente conectado enquanto ele é exibido ao usuário?
 */

import { useEffect } from "react";
import { createConnection } from "./chat";

export default function ChatRoom() {
  //Comece escrevendo a lógica do efeito
  //Seria lento conectar-se ao chat após cada nova renderização, então você adiciona a matriz de dependências
  //O código dentro do Effect não usa nenhuma props ou state, então seu array de dependências está [](vazio). Isso diz ao React para executar esse código somente quando o componente “monta”, ou seja, aparece na tela pela primeira vez.
  //Este efeito só roda na montagem, então você pode esperar "✅ Connecting..."que seja impresso uma vez no console. No entanto, se você verificar o console, " ✅ Connecting..."é impresso duas vezes. Por que isso acontece?
  //Imagine que o ChatRoomcomponente é parte de um aplicativo maior com muitas telas diferentes. O usuário inicia sua jornada na ChatRoompágina. O componente monta e chama connection.connect(). Então imagine que o usuário navega para outra tela — por exemplo, para a página Configurações. O ChatRoomcomponente desmonta. Finalmente, o usuário clica em Voltar e ChatRoommonta novamente. Isso configuraria uma segunda conexão — mas a primeira conexão nunca foi destruída! Conforme o usuário navega pelo aplicativo, as conexões continuariam se acumulando.
  //Bugs como esse são fáceis de passar despercebidos sem testes manuais extensivos. Para ajudar você a identificá-los rapidamente, no desenvolvimento o React remonta cada componente uma vez imediatamente após sua montagem inicial.
  //Ver o "✅ Connecting..."log duas vezes ajuda você a perceber o problema real: seu código não fecha a conexão quando o componente é desmontado.
  //Para corrigir o problema, retorne uma função de limpeza(cleanup) do seu efeito:
  //O React chamará sua função de limpeza toda vez antes que o Effect seja executado novamente, e uma última vez quando o componente for desmontado (removido).
  useEffect(() => {
    const connection = createConnection();
    connection.connect();

    //function cleanup(limpeza)
    //O React chamará sua função de limpeza toda vez antes que o Effect seja executado novamente, e uma última vez quando o componente for desmontado (removido).
    //Este é o comportamento correto no desenvolvimento. Ao remontar seu componente, o React verifica se navegar para longe e para trás não quebraria seu código. Desconectar e conectar novamente é exatamente o que deve acontecer! Quando você implementa bem a limpeza, não deve haver nenhuma diferença visível para o usuário entre executar o Effect uma vez vs executá-lo, limpá-lo e executá-lo novamente. Há um par de chamadas de conexão/desconexão extra porque o React está sondando seu código em busca de bugs no desenvolvimento. Isso é normal — não tente fazer isso desaparecer!
    //Na produção, você só verá "✅ Connecting..."impresso uma vez. A remontagem de componentes só acontece no desenvolvimento para ajudar você a encontrar efeitos que precisam de limpeza. Você pode desativar o Modo Estrito para optar por não participar do comportamento de desenvolvimento, mas recomendamos mantê-lo ativado. Isso permite que você encontre muitos bugs como o acima.
    return () => {
      connection.disconnect();
    };
  }, []);

  return <h1>Welcome to the chat!</h1>;
}
