# Ciclo de vida dos efeitos reativos

Os efeitos têm um ciclo de vida diferente dos componentes. Os componentes podem montar, atualizar ou desmontar. Um efeito só pode fazer duas coisas: começar a sincronizar algo e, mais tarde, parar de sincronizá-lo.

## O ciclo de vida de um efeito

Cada componente React passa pelo mesmo ciclo de vida:

- Um componente é montado quando é adicionado à tela.
- Um componente é atualizado quando recebe novos adereços ou estados, geralmente em resposta a uma interação.
- Um componente é desmontado quando é removido da tela.

```
  LifeCyCle Componente: Mount(add UI) -> Update(props, state) -> Unmount(remove UI)
```

**É uma boa maneira de pensar sobre componentes, mas não sobre Efeitos.** Em vez disso, tente pensar sobre cada Efeito independentemente do ciclo de vida do seu componente. Um Efeito descreve como sincronizar um sistema externo com os props e o estado atuais. Conforme seu código muda, a sincronização precisará acontecer com mais ou menos frequência.

Intuitivamente, você pode pensar que o React **começaria a sincronizar** quando seu componente montasse e **pararia de sincronizar** quando seu componente desmontasse. No entanto, esse não é o fim da história! Às vezes, também pode ser necessário **iniciar e parar a sincronização várias vezes** enquanto o componente permanece montado.

**OBSERVAÇÃO:** Alguns efeitos não retornam uma função de limpeza. Na maioria das vezes, você vai querer retornar uma — mas se não retornar, o React se comportará como se você tivesse retornado uma função de limpeza vazia.

## Por que a sincronização pode precisar acontecer mais de uma vez

Após a UI ser exibida, o React executará seu Effect para **iniciar a sincronização.**

O corpo do seu Effect especifica como iniciar a sincronização, e sua função de limpeza especifica como parar a sincronização. Tudo o que o React precisa fazer agora é chamá-los na ordem correta e com os props e state corretos.

## Como o React ressincroniza seu efeito

Para **parar de sincronizar**, o React chamará a função de limpeza que seu Effect retornou

Então o React executará o Effect que você forneceu durante esta renderização. para que ele comece a sincronizar, até que sua função de limpeza seja eventualmente chamada também.

Por exemplo, digamos que o usuário mude roomIdde "travel"para "music". O React interromperá novamente a sincronização do seu Effect chamando sua função de limpeza (desconectando você da "travel"sala). Então, ele começará a sincronizar novamente executando seu corpo com o novo roomIdprop (conectando você à "music"sala).

Por fim, quando o usuário vai para uma tela diferente, ChatRoom desmonta. Agora não há necessidade de permanecer conectado. O React parará de sincronizar seu Effect uma última vez e desconectará você da "music"sala de bate-papo.

## Pensando na perspectiva do efeito

Anteriormente, você estava pensando da perspectiva do componente. Quando você olhava da perspectiva do componente, era tentador pensar em Efeitos como “callbacks” ou “eventos de ciclo de vida” que disparam em um momento específico como “após uma renderização” ou “antes de desmontar”. Essa maneira de pensar se complica muito rápido, então é melhor evitar.

**Em vez disso, sempre foque em um único ciclo de início/parada por vez. Não deve importar se um componente está montando, atualizando ou desmontando. Tudo o que você precisa fazer é descrever como iniciar a sincronização e como pará-la. Se você fizer isso bem, seu Effect será resiliente a ser iniciado e parado quantas vezes for necessário.**

## Como o React verifica se seu efeito pode ressincronizar

No desenvolvimento, o React sempre remonta cada componente uma vez.

**O React verifica se seu Efeito pode ressincronizar forçando-o a fazer isso imediatamente no desenvolvimento.** Isso pode lembrá-lo de abrir uma porta e fechá-la uma vez a mais para verificar se a fechadura da porta funciona. O React inicia e para seu Efeito uma vez a mais no desenvolvimento para verificar se você implementou bem sua limpeza.

O principal motivo pelo qual seu Efeito será ressincronizado na prática é se alguns dados que ele usa tiverem mudado.

## Como o React sabe que precisa ressincronizar o efeito

Toda vez que seu componente for renderizado novamente, o React examinará o array de dependências que você passou. Se algum dos valores no array for diferente do valor no mesmo ponto que você passou durante a renderização anterior, o React ressincronizará seu Effect.

Por outro lado, se seu componente for renderizado novamente, mas roomIdnão tiver mudado, seu Effect permanecerá conectado à mesma sala.

## Cada efeito representa um processo de sincronização separado

**Cada efeito no seu código deve representar um processo de sincronização separado e independente.**

Por outro lado, se você dividir uma parte coesa da lógica em Efeitos separados, o código pode parecer "mais limpo", mas será mais difícil de manter. É por isso que você deve pensar se os processos são iguais ou separados, não se o código parece mais limpo.

## Os efeitos “reagem” aos valores reativos

**Props, state e outros valores declarados dentro do componente são reativos porque são calculados durante a renderização e participam do fluxo de dados do React.**

Valores reativos devem ser incluídos em dependências.

## O que significa um efeito com dependências vazias

Pensando da perspectiva do componente, a [] matriz de dependências vazia significa que esse efeito se conecta à sala de bate-papo somente quando o componente é montado e se desconecta somente quando o componente é desmontado. (Tenha em mente que o React ainda o ressincronizaria uma vez a mais no desenvolvimento para testar sua lógica.)

No entanto, se você pensar da perspectiva do Efeito, não precisa pensar em montar e desmontar. O importante é que você especificou o que seu Efeito faz para iniciar e parar a sincronização. Hoje, ele não tem dependências reativas.

## Todas as variáveis ​​declaradas no corpo do componente são reativas

Props e state não são os únicos valores reativos. Valores que você calcula a partir deles também são reativos. Se os props ou state mudarem, seu componente será renderizado novamente, e os valores calculados a partir deles também mudarão. É por isso que todas as variáveis ​​do corpo do componente usadas pelo Effect devem estar na lista de dependências do Effect.

É uma variável regular que você calcula durante a renderização. Mas é calculada durante a renderização, então pode mudar devido a uma nova renderização. É por isso que é reativa.

Todos os valores dentro do componente (incluindo props, state e variáveis ​​no corpo do seu componente) são reativos. Qualquer valor reativo pode mudar em uma nova renderização, então você precisa incluir valores reativos como dependências do Effect.

Em outras palavras, os efeitos “reagem” a todos os valores do corpo do componente.

## Valores globais ou mutáveis ​​podem ser dependências?

Valores mutáveis ​​(incluindo variáveis ​​globais) não são reativos.

Um valor mutável como location.pathnamenão pode ser uma dependência. Ele é mutável, então pode mudar a qualquer momento completamente fora do fluxo de dados de renderização do React. Mudá-lo não acionaria uma nova renderização do seu componente. Portanto, mesmo se você o especificasse nas dependências, o React não saberia ressincronizar o Effect quando ele mudasse. Isso também quebra as regras do React porque ler dados mutáveis ​​durante a renderização (que é quando você calcula as dependências) quebra a pureza da renderização. Em vez disso, você deve ler e assinar um valor mutável externo com useSyncExternalStore.

Um valor mutável como ref.currentou coisas que você lê dele também não pode ser uma dependência. O objeto ref retornado por useRefsi só pode ser uma dependência, mas sua currentpropriedade é intencionalmente mutável. Ele permite que você acompanhe algo sem disparar uma nova renderização. Mas como alterá-lo não dispara uma nova renderização, ele não é um valor reativo, e o React não saberá executar novamente seu Effect quando ele mudar.

## O React verifica se você especificou cada valor reativo como uma dependência

Se seu linter estiver configurado para React, ele verificará se cada valor reativo usado pelo código do seu Effect é declarado como sua dependência.

**OBSERVAÇÃO:** Em alguns casos, o React sabe que um valor nunca muda, mesmo que seja declarado dentro do componente. Por exemplo, a set função retornada de useState e o objeto ref retornado por useRef são estáveis ​​— eles têm a garantia de não mudar em uma nova renderização. Valores estáveis ​​não são reativos, então você pode omiti-los da lista. Incluí-los é permitido: eles não mudarão, então não importa.

## O que fazer quando você não deseja ressincronizar

**No entanto, você poderia, em vez disso, “provar” ao linter que esses valores não são valores reativos,** ou seja, que eles não podem mudar como resultado de uma nova renderização.

Efeitos são blocos reativos de código. Eles ressincronizam quando os valores que você lê dentro deles mudam. Diferentemente de manipuladores de eventos, que só são executados uma vez por interação, os efeitos são executados sempre que a sincronização é necessária.

Você não pode “escolher” suas dependências. Suas dependências devem incluir todos os valores reativos que você lê no Efeito. O linter impõe isso. Às vezes, isso pode levar a problemas como loops infinitos e à ressincronização frequente do seu Efeito. Não conserte esses problemas suprimindo o linter! Aqui está o que tentar em vez disso:

- **Verifique se seu Efeito representa um processo de sincronização independente.** Se seu Efeito não sincronizar nada, pode ser desnecessário. Se ele sincronizar várias coisas independentes, divida-o.
- **Se você quiser ler o valor mais recente de props ou state sem "reagir" a ele e ressincronizar o Effect,** você pode dividir seu Effect em uma parte reativa (que você manterá no Effect) e uma parte não reativa (que você extrairá em algo chamado Effect Event ).
- **Evite depender de objetos e funções como dependências.** Se você criar objetos e funções durante a renderização e depois lê-los de um Efeito, eles serão diferentes em cada renderização. Isso fará com que seu Efeito seja ressincronizado toda vez.
