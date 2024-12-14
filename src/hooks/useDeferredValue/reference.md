# useDeferredValue

useDeferredValue é um React Hook que permite adiar a atualização de uma parte da interface do usuário.

`const deferredValue = useDeferredValue(value)`

`useDeferredValue(value, initialValue?)`

Chame useDeferredValue o nível superior do seu componente para obter uma versão adiada desse valor.

```js
import { useState, useDeferredValue } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

## Parâmetros

- value: O valor que você quer diferir. Pode ter qualquer tipo.
- Canary only opcional initialValue : Um valor a ser usado durante a renderização inicial de um componente. Se esta opção for omitida, useDeferredValue não será adiada durante a renderização inicial, porque não há nenhuma versão anterior que value possa renderizar em vez disso.

## Devoluções

- currentValue: Durante a renderização inicial, o valor adiado retornado será o mesmo que o valor que você forneceu. Durante as atualizações, o React tentará primeiro uma nova renderização com o valor antigo (então ele retornará o valor antigo) e, em seguida, tentará outra nova renderização em segundo plano com o novo valor (então ele retornará o valor atualizado).

Canário
Nas versões mais recentes do React Canary, useDeferredValueele retorna o initialValuena renderização inicial e agenda uma nova renderização em segundo plano com o valueretornado.

### Qual é a diferença entre adiar um valor(deferring a value), eliminar o efeito de rejeição(debouncing) e limitar o desempenho(throttling)?

Há duas técnicas comuns de otimização que você pode ter usado antes neste cenário:

Debouncing significa que você esperaria o usuário parar de digitar (por exemplo, por um segundo) antes de atualizar a lista.
A limitação significa que você atualizaria a lista de vez em quando (por exemplo, no máximo uma vez por segundo).
Embora essas técnicas sejam úteis em alguns casos, useDeferredValueelas são mais adequadas para otimizar a renderização porque são profundamente integradas ao React e se adaptam ao dispositivo do usuário.

Ao contrário do debouncing ou throttling, não requer a escolha de nenhum atraso fixo. Se o dispositivo do usuário for rápido (por exemplo, um laptop potente), a nova renderização adiada aconteceria quase imediatamente e não seria perceptível. Se o dispositivo do usuário for lento, a lista ficaria "atrasada" em relação à entrada proporcionalmente à lentidão do dispositivo.

Além disso, diferentemente do debouncing ou do throttling, as re-renderizações adiadas feitas por useDeferredValuesão interrompíveis por padrão. Isso significa que se o React estiver no meio da re-renderização de uma lista grande, mas o usuário fizer outro pressionamento de tecla, o React abandonará essa re-renderização, manipulará o pressionamento de tecla e, em seguida, começará a renderizar em segundo plano novamente. Por outro lado, o debouncing e o throttling ainda produzem uma experiência instável porque estão bloqueando: eles apenas adiam o momento em que a renderização bloqueia o pressionamento de tecla.

Se o trabalho que você está otimizando não acontece durante a renderização, debouncing e throttling ainda são úteis. Por exemplo, eles podem deixar você disparar menos solicitações de rede. Você também pode usar essas técnicas juntas.