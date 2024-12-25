# useRef

useRef é um React Hook que permite referenciar um valor que não é necessário para renderização.

```js
const ref = useRef(initialValue)
```

Chame useRef o nível superior do seu componente para declarar uma referência.

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
``` 

## Parâmetros

- **initialValue:** O valor que você quer que a propriedade do objeto ref current seja inicialmente. Pode ser um valor de qualquer tipo. Este argumento é ignorado após a renderização inicial.

## Devoluções
 useRef retorna um objeto com uma única propriedade:

- **current:** Inicialmente, ele é definido como o que initialValue você passou. Você pode defini-lo posteriormente como outra coisa. Se você passar o objeto ref para React como um ref atributo para um nó JSX, o React definirá sua current propriedade.

Nas próximas renderizações, useRefretornará o mesmo objeto.

## Advertências

- Você pode mutar a ref.current propriedade. Diferentemente de state, ela é mutável. No entanto, se ela contém um objeto que é usado para renderização (por exemplo, um pedaço do seu state), então você não deve mutar esse objeto.
- Quando você altera a ref.current propriedade, o React não renderiza novamente seu componente. O React não sabe quando você o altera porque uma ref é um objeto JavaScript simples.
- Não escreva ou leia ref.current durante a renderização, exceto para inicialização. Isso torna o comportamento do seu componente imprevisível.
- No Modo Estrito, o React chamará sua função de componente duas vezes para ajudar você a encontrar impurezas acidentais. Esse é um comportamento somente de desenvolvimento e não afeta a produção. Cada objeto ref será criado duas vezes, mas uma das versões será descartada. Se sua função de componente for pura (como deveria ser), isso não deve afetar o comportamento.