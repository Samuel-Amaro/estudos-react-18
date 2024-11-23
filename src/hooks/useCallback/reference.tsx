/**
 * * useCallback
 *
 * useCallback é um React Hook que permite armazenar em cache uma definição de função entre novas renderizações.
 *
 * const cachedFn = useCallback(fn, dependencies)
 *
 * * REFERÊNCIA
 *
 * Parâmetros
 *
 * fn: O valor da função que você deseja armazenar em cache. Ele pode receber quaisquer argumentos e retornar quaisquer valores. O React retornará (não chamará!) sua função de volta para você durante a renderização inicial. Nas próximas renderizações, o React fornecerá a mesma função novamente se dependenciesnão tiver mudado desde a última renderização. Caso contrário, ele fornecerá a função que você passou durante a renderização atual e a armazenará caso ela possa ser reutilizada mais tarde. O React não chamará sua função. A função é retornada para você para que você possa decidir quando e se deve chamá-la.
 * dependencies: A lista de todos os valores reativos referenciados dentro do fncódigo. Os valores reativos incluem props, state e todas as variáveis ​​e funções declaradas diretamente dentro do corpo do seu componente. Se o seu linter estiver configurado para React , ele verificará se cada valor reativo está especificado corretamente como uma dependência. A lista de dependências deve ter um número constante de itens e ser escrita em linha como [dep1, dep2, dep3]. O React comparará cada dependência com seu valor anterior usando o Object.isalgoritmo de comparação.
 *
 * Devoluções
 *
 * Na renderização inicial, useCallback retorna a fn função que você passou.
 * Durante renderizações subsequentes, ele retornará uma fn  função já armazenada da última renderização (se as dependências não tiverem sido alteradas) ou retornará a fn função que você passou durante esta renderização.
 *
 * Advertências
 *
 * useCallback é um Hook, então você só pode chamá-lo no nível superior do seu componente ou dos seus próprios Hooks. Você não pode chamá-lo dentro de loops ou condições. Se precisar disso, extraia um novo componente e mova o estado para ele.
 * O React não descartará a função em cache a menos que haja um motivo específico para isso. Por exemplo, no desenvolvimento, o React descarta o cache quando você edita o arquivo do seu componente. Tanto no desenvolvimento quanto na produção, o React descartará o cache se o seu componente for suspenso durante a montagem inicial. No futuro, o React pode adicionar mais recursos que aproveitem o descarte do cache — por exemplo, se o React adicionar suporte integrado para listas virtualizadas no futuro, faria sentido descartar o cache para itens que rolam para fora da janela de visualização da tabela virtualizada. Isso deve corresponder às suas expectativas se você confiar nele useCallback como uma otimização de desempenho. Caso contrário, uma variável de estado ou uma referência podem ser mais apropriadas.
 */
