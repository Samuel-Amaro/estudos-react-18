# useContext

useContext é um React Hook que permite que você leia e assine o contexto do seu componente.

`const value = useContext(SomeContext)`

Chame useContext o nível superior do seu componente para ler e assinar o contexto.

```js
import { useContext } from 'react';

function MyComponent() {
const theme = useContext(ThemeContext);
```

## Parâmetros

SomeContext: O contexto que você criou anteriormente com createContext. O contexto em si não contém as informações, ele apenas representa o tipo de informação que você pode fornecer ou ler dos componentes.

## Devoluções

useContext retorna o valor de contexto para o componente de chamada. Ele é determinado como o value passado para o mais próximo SomeContext.Provider acima do componente de chamada na árvore. Se não houver tal provedor, então o valor retornado será o que defaultValue você passou para createContext esse contexto. O valor retornado está sempre atualizado. O React renderiza novamente automaticamente os componentes que leem algum contexto se ele mudar.
