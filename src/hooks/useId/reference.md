# useId

useId é um Hook do React para gerar IDs únicos que podem ser passados para atributos de acessibilidade.

```js
const id = useId()
``` 

Chame useId no nível superior do seu componente para gerar um ID único.

## Parâmetros

useId não aceita nenhum parâmetro.

## Retorna

useId retorna uma sequência de ID único associada a esta chamada useId específica neste componente específico.

##Ressalvas 

- useId é um Hook, então você só pode chamá-lo no nível superior do seu componente ou no seus próprios Hooks. Você não pode chamá-lo dentro de loops ou condições. Se precisar, extraia um novo componente e mova o estado para ele.

- useId não deve ser usado para gerar chaves em uma lista. As chaves devem ser geradas a partir de seus dados.

## Por que useId é melhor que um contador de incremento? 

O principal benefício do useId é que o React garante que funcione com a renderização do servidor. Durante a renderização do servidor, seus componentes geram saídas HTML. Posteriormente, no cliente, a hidratação anexa seus manipuladores de eventos ao HTML gerado. Para que a hidratação funcione, a saída do cliente deve corresponder ao HTML do servidor.