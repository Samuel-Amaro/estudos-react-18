# Hook

No React, assim como qualquer outra função iniciada com “use”, é denominada de Hook.

Hooks são funções especiais que estão disponíveis somente enquanto o React está renderizando. Eles permitem que você “se conecte” a diferentes recursos do React.

# useEffect

`useEffect`é um React Hook que permite sincronizar um componente com um sistema externo.

```js
 useEffect(setup, dependencies?)
```

Chame useEffect o nível superior do seu componente para declarar um efeito:

## Parâmetros

- setup: A função com a lógica do seu Efeito. Sua função de configuração também pode retornar opcionalmente uma função de limpeza . Quando seu componente for adicionado ao DOM, o React executará sua função de configuração. Após cada nova renderização com dependências alteradas, o React executará primeiro a função de limpeza (se você a forneceu) com os valores antigos e, em seguida, executará sua função de configuração com os novos valores. Após seu componente ser removido do DOM, o React executará sua função de limpeza.
- opcional dependencies : A lista de todos os valores reativos referenciados dentro do setup código. Os valores reativos incluem props, state e todas as variáveis ​​e funções declaradas diretamente dentro do corpo do seu componente. Se o seu linter estiver configurado para React , ele verificará se cada valor reativo está especificado corretamente como uma dependência. A lista de dependências deve ter um número constante de itens e ser escrita em linha como [dep1, dep2, dep3]. O React comparará cada dependência com seu valor anterior usando a Object.is comparação. Se você omitir esse argumento, seu Effect será executado novamente após cada nova renderização do componente.

## Devoluções

useEffect retorna undefined.

### Removendo dependências de objetos desnecessárias

Se seu Efeito depender de um objeto ou função criado durante a renderização, ele pode ser executado com muita frequência. 

Evite usar um objeto criado durante a renderização como uma dependência. Em vez disso, crie o objeto dentro do Effect

### Removendo dependências de funções desnecessárias

Se seu Efeito depender de um objeto ou função criado durante a renderização, ele pode ser executado com muita frequência.

Por si só, criar uma função do zero em cada re-renderização não é um problema. Você não precisa otimizar isso. No entanto, se você usá-la como uma dependência do seu Efeito, isso fará com que seu Efeito seja executado novamente após cada re-renderização.

Evite usar uma função criada durante a renderização como uma dependência.

