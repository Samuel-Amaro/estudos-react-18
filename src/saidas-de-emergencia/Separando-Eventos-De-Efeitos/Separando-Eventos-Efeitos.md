# Separando eventos de efeitos

Os manipuladores de eventos só são executados novamente quando você realiza a mesma interação novamente. Diferentemente dos manipuladores de eventos, os efeitos são ressincronizados se algum valor que eles leem, como uma prop ou uma variável de estado, for diferente do que era durante a última renderização. Às vezes, você também quer uma mistura de ambos os comportamentos: um efeito que é executado novamente em resposta a alguns valores, mas não a outros.

## Escolhendo entre manipuladores de eventos e efeitos

Primeiro, vamos recapitular a diferença entre manipuladores de eventos e efeitos.

### Os manipuladores de eventos são executados em resposta a interações específicas

Os manipuladores de eventos permitem que você manipule interações específicas

### Os efeitos são executados sempre que a sincronização é necessária

O motivo para executar esse código não é alguma interação em particular.

## Valores reativos e lógica reativa

Intuitivamente, você poderia dizer que os manipuladores de eventos são sempre acionados “manualmente”, por exemplo, clicando em um botão. Os efeitos, por outro lado, são “automáticos”: eles rodam e re-rodam sempre que necessário para permanecerem sincronizados.

Há uma maneira mais precisa de pensar sobre isso.

Props, state e variáveis ​​declaradas dentro do corpo do seu componente são chamadas de valores reativos.

Valores reativos como esses podem mudar devido a uma nova renderização.

Manipuladores de eventos e efeitos respondem a mudanças de forma diferente:

- **A lógica dentro dos manipuladores de eventos não é reativa.** Ela não será executada novamente a menos que o usuário execute a mesma interação (por exemplo, um clique) novamente. Os manipuladores de eventos podem ler valores reativos sem “reagir” às suas alterações.
- **A lógica dentro dos Efeitos é reativa.** Se o seu Efeito lê um valor reativo, você tem que especificá-lo como uma dependência. Então, se uma nova renderização fizer com que esse valor mude, o React executará novamente a lógica do seu Efeito com o novo valor.
- Os manipuladores de eventos não são reativos
- Os efeitos são reativos

## Extraindo lógica não reativa de efeitos

As coisas ficam mais complicadas quando você quer misturar lógica reativa com lógica não reativa.

Você precisa de uma maneira de separar essa lógica não reativa do Efeito reativo ao redor dela.

### Declarando um evento de efeito

**_EM CONSTRUÇÃO: Esta seção descreve uma API experimental que ainda não foi lançada em uma versão estável do React._**

Use um Hook especial chamado `useEffectEvent` para extrair essa lógica não reativa do seu Efeito:

```js
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
```

Aqui, onConnected é chamado de Evento de Efeito. É uma parte da sua lógica de Efeito, mas se comporta muito mais como um manipulador de eventos. A lógica dentro dele não é reativa, e sempre “vê” os valores mais recentes dos seus props e estado.

Agora você pode chamar o onConnected Evento de Efeito de dentro do seu Efeito:

```js
    function ChatRoom({ roomId, theme }) {
        const onConnected = useEffectEvent(() => {
            showNotification('Connected!', theme);
        });

        useEffect(() => {
            const connection = createConnection(serverUrl, roomId);
            connection.on('connected', () => {
            onConnected();
            });
            connection.connect();
            return () => connection.disconnect();
        }, [roomId]); // ✅ All dependencies declared

        // ...
```

Isso resolve o problema. Note que você teve que remover onConnected da lista de dependências do seu Efeito. **Eventos de Efeito não são reativos e devem ser omitidos das dependências.**

Você pode pensar em Eventos de Efeito como sendo muito semelhantes a manipuladores de eventos. A principal diferença é que os manipuladores de eventos são executados em resposta a interações do usuário, enquanto Eventos de Efeito são acionados por você a partir de Efeitos. Eventos de Efeito permitem que você “quebre a cadeia” entre a reatividade de Efeitos e o código que não deve ser reativo.

### Lendo os últimos adereços(props) e estado com eventos de efeito

**_EM CONSTRUÇÃO: Esta seção descreve uma API experimental que ainda não foi lançada em uma versão estável do React._**

Eventos de efeito permitem que você corrija muitos padrões nos quais você pode ficar tentado a suprimir o linter de dependência.
