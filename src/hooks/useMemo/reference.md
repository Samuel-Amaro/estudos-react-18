# useMemo

useMemo é um React Hook que permite armazenar em cache o resultado de um cálculo entre novas renderizações.

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```

## Parâmetros

- **calculateValue:** A função que calcula o valor que você deseja armazenar em cache. Deve ser puro, não deve receber argumentos e deve retornar um valor de qualquer tipo. O React chamará sua função durante a renderização inicial. Nas próximas renderizações, o React retornará o mesmo valor novamente se dependencies não tiver mudado desde a última renderização. Caso contrário, ele chamará calculateValue, retornará seu resultado e o armazenará para que possa ser reutilizado mais tarde.

- **dependencies:** A lista de todos os valores reativos referenciados dentro do calculateValue código. Os valores reativos incluem props, state e todas as variáveis ​​e funções declaradas diretamente dentro do corpo do seu componente. Se o seu linter estiver configurado para React , ele verificará se cada valor reativo está especificado corretamente como uma dependência. A lista de dependências deve ter um número constante de itens e ser escrita em linha como [dep1, dep2, dep3]. O React comparará cada dependência com seu valor anterior usando a Object.is comparação.

## Devoluções

Na renderização inicial, useMemo retorna o resultado da chamada calculateValue sem argumentos.

Durante as próximas renderizações, ele retornará um valor já armazenado da última renderização (se as dependências não tiverem sido alteradas) ou chamará calculateValue novamente e retornará o resultado calculateValue retornado.

O armazenamento em cache de valores de retorno como esse também é conhecido como memorização , e é por isso que esse Hook é chamado de useMemo.

### Como saber se um cálculo é caro?

Em geral, a menos que você esteja criando ou fazendo loop em milhares de objetos, provavelmente não é caro. Se quiser ter mais confiança, você pode adicionar um log de console para medir o tempo gasto em um pedaço de código:

```js
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
```

Execute a interação que você está medindo (por exemplo, digitando na entrada). Você verá então logs como filter array: 0.15ms no seu console. Se o tempo total registrado somar uma quantia significativa (digamos, 1ms ou mais), pode fazer sentido memorizar esse cálculo. Como um experimento, você pode então encapsular o cálculo useMemo para verificar se o tempo total registrado diminuiu para essa interação ou não:

```js
console.time('filter array');
const visibleTodos = useMemo(() => {
  return filterTodos(todos, tab); // Skipped if todos and tab haven't changed
}, [todos, tab]);
console.timeEnd('filter array');
```

useMemo não tornará a primeira renderização mais rápida. Só ajuda você a pular trabalhos desnecessários em atualizações.

Tenha em mente que sua máquina provavelmente é mais rápida que a dos seus usuários, então é uma boa ideia testar o desempenho com uma desaceleração artificial. Por exemplo, o Chrome oferece uma opção de CPU Throttling para isso.

### Você deve adicionar useMemo em todos os lugares?

Na prática, você pode tornar muita memorização desnecessária seguindo alguns princípios:

- Quando um componente encapsula visualmente outros componentes, deixe-o aceitar JSX como filhos. Dessa forma, quando o componente wrapper atualiza seu próprio estado, o React sabe que seus filhos não precisam renderizar novamente.
- Prefira o estado local e não eleve o estado mais do que o necessário. Por exemplo, não mantenha o estado transiente como formulários e se um item está pairando no topo da sua árvore ou em uma biblioteca de estado global.
- Mantenha sua lógica de renderização pura. Se a re-renderização de um componente causar um problema ou produzir algum artefato visual perceptível, é um bug no seu componente! Corrija o bug em vez de adicionar memoização.
- Evite efeitos desnecessários que atualizam o estado. A maioria dos problemas de desempenho em aplicativos React são causados ​​por cadeias de atualizações originadas de efeitos que fazem com que seus componentes sejam renderizados repetidamente.
- Tente remover dependências desnecessárias dos seus Efeitos. Por exemplo, em vez de memoização, geralmente é mais simples mover algum objeto ou uma função dentro de um Efeito ou fora do componente.

Se uma interação específica ainda parecer lenta, use o profiler do React Developer Tools para ver quais componentes se beneficiariam mais da memorização e adicione a memorização onde necessário. Esses princípios tornam seus componentes mais fáceis de depurar e entender, então é bom segui-los em qualquer caso. A longo prazo, estamos pesquisando fazer memorização granular automaticamente para resolver isso de uma vez por todas.