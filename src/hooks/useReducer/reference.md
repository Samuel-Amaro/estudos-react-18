# useReducer

useReducer é um React Hook que permite adicionar um redutor ao seu componente.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

Chame useReducer o nível superior do seu componente para gerenciar seu estado com um redutor.

```js
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

## Parâmetros

- **reducer**: A função redutora que especifica como o estado é atualizado. Ela deve ser pura, deve receber o estado e a ação como argumentos e deve retornar o próximo estado. O estado e a ação podem ser de qualquer tipo.
- **initialArg**: O valor do qual o estado inicial é calculado. Pode ser um valor de qualquer tipo. Como o estado inicial é calculado a partir dele depende do próximo initargumento.
- **opcional init** : A função inicializadora que deve retornar o estado inicial. Se não for especificado, o estado inicial é definido como initialArg. Caso contrário, o estado inicial é definido como o resultado da chamada init(initialArg).

## Devoluções

useReducer retorna uma matriz com exatamente dois valores:

1. O estado atual. Durante a primeira renderização, é definido como init(initialArg) ou initialArg(se não houver init).
2. A dispatch função que permite atualizar o estado para um valor diferente e acionar uma nova renderização.

### `dispatch` function

A dispatch função retornada por useReducer permite que você atualize o estado para um valor diferente e acione uma nova renderização. Você precisa passar a ação como o único argumento para a dispatch função:

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
```

O React definirá o próximo estado como o resultado da chamada da reducer função que você forneceu com o current state e a ação que você passou para dispatch.

#### Parâmetros

- action: A ação realizada pelo usuário. Pode ser um valor de qualquer tipo. Por convenção, uma ação é geralmente um objeto com uma typepropriedade que o identifica e, opcionalmente, outras propriedades com informações adicionais.

#### Devoluções

dispatch funções não têm um valor de retorno.

#### Advertências

A dispatch função apenas atualiza a variável de estado para o próximo render . Se você ler a variável de estado após chamar a dispatchfunção, você ainda obterá o valor antigo que estava na tela antes da sua chamada.

Se o novo valor que você fornecer for idêntico ao atual state, conforme determinado por uma Object.iscomparação, o React pulará a nova renderização do componente e seus filhos. Isso é uma otimização. O React ainda pode precisar chamar seu componente antes de ignorar o resultado, mas isso não deve afetar seu código.

O React em lotes atualiza o estado(batches state updates.). Ele atualiza a tela depois que todos os manipuladores de eventos foram executados e chamaram suas setfunções. Isso evita múltiplas re-renderizações durante um único evento. No caso raro de você precisar forçar o React a atualizar a tela antes, por exemplo, para acessar o DOM, você pode usar flushSync.

## Comparando `useState` e `useReducer`

Os redutores não são isentos de desvantagens! Aqui estão algumas maneiras de compará-los:

- **Tamanho do código**: Geralmente, com useStatevocê tem que escrever menos código antecipadamente. Com useReducer, você tem que escrever uma função redutora e ações de despacho. No entanto, useReducerpode ajudar a reduzir o código se muitos manipuladores de eventos modificarem o estado de forma semelhante.
- **Legibilidade**: useState é muito fácil de ler quando as atualizações de estado são simples. Quando ficam mais complexas, podem inchar o código do seu componente e dificultar a varredura. Nesse caso, useReducerpermite que você separe claramente o como da lógica de atualização do o que aconteceu dos manipuladores de eventos.
- **Depuração**: Quando você tem um bug com useState, pode ser difícil dizer onde o estado foi definido incorretamente e por quê . Com useReducer, você pode adicionar um log de console em seu redutor para ver cada atualização de estado e por que isso aconteceu (devido a qual action). Se cada um actionestiver correto, você saberá que o erro está na lógica do redutor em si. No entanto, você tem que percorrer mais código do que com useState.
- **Teste**: Um redutor é uma função pura que não depende do seu componente. Isso significa que você pode exportá-lo e testá-lo separadamente, isoladamente. Embora geralmente seja melhor testar componentes em um ambiente mais realista, para lógica de atualização de estado complexa pode ser útil afirmar que seu redutor retorna um estado específico para um estado inicial e ação específicos.
- **Preferência pessoal**: Algumas pessoas gostam de redutores, outras não. Tudo bem. É uma questão de preferência. Você sempre pode converter entre useStatee useReducerpara frente e para trás: eles são equivalentes!
  Recomendamos usar um redutor se você frequentemente encontra bugs devido a atualizações de estado incorretas em algum componente e quer introduzir mais estrutura ao seu código. Você não precisa usar redutores para tudo: sinta-se à vontade para misturar e combinar! Você pode até mesmo useStatee useReducerno mesmo componente.
