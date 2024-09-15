# Talvez você não precise de um Effect

Effects são um escape do paradigma do React. Eles te permitem “dar um passo para fora” do React e sincronizar seus componentes com algum serviço externo, como um widget não React, a rede ou o DOM do navegador. Se não houver nenhum sistema externo envolvido (por exemplo, se você quiser atualizar o state de um componente quando algumas props ou state mudarem), você não deveria precisar de um Effect. Remover Effects desnecessários tornará seu código mais compreensível, mais rápido de executar e menos propenso a erros.

## Como remover Effects desnecessários

Existem dois casos comuns em que você não precisa de Effects:

- **Você não precisa de Effects para manipular seus dados para renderização.** Para evitar renderizações desnecessárias, transforme todos os dados na raiz de seus componentes. Esse código será reexecutado automaticamente sempre que suas props ou state forem alterados.
- **Você não precisa de Effects para lidar com eventos do usuário.** . É por isso que você normalmente tratará os eventos do usuário nos manipuladores de evento correspondentes.

Você precisa de Effects para sincronizar com sistemas externos. Por exemplo, você pode escrever um Effect que mantenha um widget jQuery sincronizado com o state do React. Também é possível buscar dados com Effects: por exemplo, você pode sincronizar os resultados da pesquisa com o termo que você pesquisou. Lembre-se de que frameworks modernos oferecem mecanismos internos de busca de dados mais eficientes do que escrever Effects diretamente em seus componentes.

Para ajudá-lo a adquirir a intuição correta, vamos dar uma olhada em alguns exemplos concretos comuns!

- **Quando algo pode ser calculado a partir de props ou state, não o coloque em um state. Em vez disso, calcule durante a renderização.** Isso torna seu código mais rápido (você evita “cascatear” atualizações extras), simples (você remove código), e menos propenso a erros (você evita bugs causados por diferentes states ficando desatualizadas entre si)
- Fazer cache de calculos custosos, evitar de ter que ficar recalculando uma operação custosa em um componente porque alguma variavel de state não relacionada mudou e gerou nova renderização, isso faria a operação ser recalculada novamente, assim podemos fazer cache (ou memoizar) um calculo custoso envolvendo-o num Hook useMemo:

  ```js
  import { useMemo, useState } from "react";

  function TodoList({ todos, filter }) {
    const [newTodo, setNewTodo] = useState("");

    //Isto diz ao React que você não quer que a função de dentro seja reexecutada a não ser que todos ou filter tenham mudado. O React lembrará do retorno de getFilteredTodos() durante a renderização inicial. Durante as próximas renderizações, ele vai checar se todos ou filter são diferentes. Se eles são os mesmos da última vez, useMemo vai retornar o último valor salvo. Mas se forem diferentes, o React vai executar a função de dentro novamente (e armazenar seu resultado).
    //A função envolvida no useMemo executa durante a renderização, então apenas funciona para cálculos puros.
    const visibleTodos = useMemo(() => {
      // ✅ Não reexecuta a não ser que `todos` ou `filter` mudem
      return getFilteredTodos(todos, filter);
    }, [todos, filter]);
    // ...
  }
  ```

  Para saber se uma operação e custosa [Como dizer se um cálculo é custoso? ](https://pt-br.react.dev/learn/you-might-not-need-an-effect#how-to-tell-if-a-calculation-is-expensive)

- Normalmente, o React preserva o state quando o mesmo componente é renderizado no mesmo local.
- Às vezes, você pode querer redefinir ou ajustar algum state específico, sem afetar outros, quando uma prop for alterada.
  - Armazenar informações de renderizações anteriores dessa maneira pode ser difícil de entender, mas é melhor do que atualizar o mesmo state em um Effect.
  - Quando você atualiza um componente durante a renderização, o React descarta o JSX retornado e imediatamente reinicia a renderização. Para evitar repetições em cascata muito lentas, o React só permite que você atualize o state do mesmo componente durante uma renderização. Se você atualizar o state de outro componente durante uma renderização, verá um erro. Uma condição como items !== prevItems é necessária para evitar loops. Você pode ajustar o state dessa forma, mas quaisquer outros efeitos colaterais (como alterar o DOM ou definir timeouts) devem ficar em manipuladores de evento ou Effects para manter os componentes puros.
  - Embora esse padrão seja mais eficiente do que um Effect, a maioria dos componentes também não deve precisar dele. Não importa como você o faça, o ajuste do state com base em props ou outro state torna o fluxo de dados mais difícil de entender e depurar. Sempre verifique se, em vez disso, você pode redefinir todos os states com uma chave ou calcular tudo durante a renderização.
- **Quando não tiver certeza se algum código deve estar em um Effect ou em um manipulador de eventos, pergunte a si mesmo por que esse código precisa ser executado. Use Effects somente para códigos que devem ser executados porque o componente foi exibido ao usuário.**
- **Ao decidir se deve colocar alguma lógica em um manipulador de evento ou em um Effect, a principal pergunta que precisa ser respondida é que tipo de lógica ela é da perspectiva do usuário. Se essa lógica for causada por uma interação específica, mantenha-a no manipulador de evento. Se for causada pelo fato de o usuário ver o componente na tela, mantenha-a no Effect.**
- O React processa em lote atualizações de diferentes componentes juntos, de modo que haverá apenas uma passagem de renderização.
- “Elevar o state” permite que o componente pai controle totalmente o Toggle alternando o state do próprio componente pai. Isso significa que o componente pai terá que conter mais lógica, mas haverá menos state geral com o qual se preocupar. Sempre que você tentar manter duas variáveis de state diferentes sincronizadas, tente elevar o state em vez disso!
- No React, os dados fluem dos componentes pai para seus filhos. Quando você vê algo errado na tela, pode rastrear a origem da informação subindo a cadeia de componentes até encontrar o componente que passa a prop errada ou tem o state errado. Quando os componentes filhos atualizam o state de seus componentes pais em Effects, o fluxo de dados se torna muito difícil de rastrear. Como tanto o componente filho quanto o pai precisam dos mesmos dados, deixe o componente pai buscar esses dados e, em vez disso, passá-los para o filho
- Isso é mais simples e mantém o fluxo de dados previsível: os dados fluem do pai para o filho.
- React tem um Hook criado especificamente para assinar um armazenamento externo que é preferível. `useSyncExternalStore`
