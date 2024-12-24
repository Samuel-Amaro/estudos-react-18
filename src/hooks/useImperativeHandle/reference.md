# useImperativeHandle

useImperativeHandle é um React Hook que permite customizar o identificador exposto como ref.

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

Chame useImperativeHandle no nível superior do seu componente para customizar o identificador de referência que ele expõe:

```js
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
    useImperativeHandle(ref, () => {
    return {
        // ... seus métodos ...
    };
}, []);
// ...
```

## Parâmetros

ref: A ref que você recebeu como segundo argumento da função de renderização forwardRef.

createHandle: Uma função que não aceita argumentos e retorna o identificador de referência que você deseja expor. Essa identificador de referência pode ter qualquer tipo. Normalmente, você retornará um objeto com os métodos que deseja expor.

opcional dependencies: A lista de todos os valores reativos referenciados dentro do código createHandle. Os valores reativos incluem propriedades, estado, e todas as variáveis e funções declaradas diretamente dentro do corpo do seu componente. Se o seu linter estiver configurado para React, ele verificará se cada valor reativo está especificado corretamente como uma dependência. A lista de dependências devem ter um número constante de items e ser escrito inline como [dep1, dep2, dep3]. O React comparará cada dependência com seu valor anterior usando a comparação Object.is. Se uma nova renderização resultou em uma alteração em alguma dependência, ou se você omitiu este argumento, sua função createHandle será executada novamente e o identificador recém-criado será atribuído à ref.

## Retorna 

useImperativeHandle retorna undefined.

Não abuse das referências. Você deve apenas usar referências para comportamentos imperativos que você não pode expressar como propriedades: por exemplo, rolar até um nó, focar em um nó, disparar uma animação, selecionar texto e assim por diante.

Se você pode expressar algo como uma propriedade, não deve usar uma referência. Por exemplo, em vez de expor um identificador imperativo como { open, close } de um componente Modal, é melhor usar isOpen como um suporte como <Modal isOpen={isOpen} />. Efeitos podem ajudá-lo a expor comportamentos imperativos por meio de propriedades.