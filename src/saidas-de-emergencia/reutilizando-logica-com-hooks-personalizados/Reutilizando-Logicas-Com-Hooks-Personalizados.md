# Reutilizando lógica com Hooks personalizados

O React vem com vários Hooks embutidos como useState, useContext, e useEffect. Às vezes, você desejará que houvesse um Hook para algum propósito mais específico: Por exemplo, para buscar dados, para acompanhar se o usuário está online, ou para se conectar a uma sala de bate-papo. Você pode não encontrar esses Hooks no React, mas pode criar seus próprios Hooks para as necessidades do seu aplicativo

## Nome dos hooks sempre começam com use

Aplicações React são construídas a partir de componentes. Os componentes são construídos a partir de Hooks, sejam eles embutidos ou personalizados. Provavelmente, você frequentemente usará Hooks personalizados criados por outras pessoas, mas ocasionalmente poderá escrever um você mesmo!

Você deve seguir estas convenções de nomenclatura:

 - **Os nomes dos componentes do React devem começar com uma letra maiúscula,** como StatusBar e SaveButton. Os componentes do React também precisam retornar algo que o React saiba como exibir, como um trecho de JSX.
 - **Os nomes do hooks devem começar com use seguido por uma letra maiúscula,** como useState (built-in) ou useOnlineStatus (personalizado, como mencionado anteriormente na página). Hooks podem retornar valores arbitrários.

Essa convenção garante que você sempre possa olhar para um componente e saber onde seu estado, efeitos e outras funcionalidades do React podem estar “escondidos”. Por exemplo, se você vir uma chamada de função getColor() dentro do seu componente, pode ter certeza de que ela não pode conter estado do React, pois seu nome não começa com use. No entanto, uma chamada de função como useOnlineStatus() provavelmente conterá chamadas a outros Hooks internamente!

### Todos os nomes de funções chamadas durante a renderização devem começar com o prefixo use? 

Não. Funções que não chamam Hooks não precisam ser Hooks.

Se sua função não chama nenhum Hook, evite o prefixo use. Em vez disso, escreva-a como uma função regular sem o prefixo use.

Você deve adicionar o prefixo use a uma função (e, portanto, transformá-la em um Hook) se ela usar pelo menos um Hook em seu interior.

Tecnicamente, isso não é exigido pelo React. Em princípio, é possível criar um Hook que não chama outros Hooks. Isso geralmente é confuso e limitante, então é melhor evitar esse padrão. No entanto, pode haver casos raros em que isso é útil.

## Passando valores reativos entre Hooks 

O código dentro dos seus Hooks personalizados será executado novamente durante cada nova renderização do seu componente. É por isso que, assim como os componentes, os Hooks personalizados precisam ser puros. Pense no código dos Hooks personalizados como parte do corpo do seu componente!

Como os Hooks personalizados são renderizados juntamente com o seu componente, eles sempre recebem as props e o estado mais recentes. 

## Quando usar Hooks personalizados 

Você não precisa extrair um Hook personalizado para cada pequeno trecho de código duplicado. Alguma duplicação é aceitável.

Por exemplo, extrair um Hook useFormInput para envolver uma única chamada useState como feito anteriormente provavelmente é desnecessário.

No entanto, sempre que você escrever um Efeito, considere se seria mais claro encapsulá-lo também em um Hook personalizado. Você não deve precisar de efeitos com muita frequência, então, se você estiver escrevendo um, significa que precisa “sair do mundo React” para sincronizar com algum sistema externo ou fazer algo para o qual o React não tenha uma API embutida. encapsular o Efeito em um Hook personalizado permite que você comunique claramente sua intenção e como os dados fluem por ele.

Extrair um Hook personalizado torna o fluxo de dados explícito. 

### Mantenha seus Hooks personalizados focados em casos de uso concretos de alto nível

Comece escolhendo o nome do seu Hook personalizado. Se você tiver dificuldade em escolher um nome claro, isso pode significar que seu Efeito está muito acoplado à lógica do restante do seu componente e ainda não está pronto para ser extraído.

Idealmente, o nome do seu Hook personalizado deve ser claro o suficiente para que até mesmo uma pessoa que não escreve código com frequência possa ter uma boa ideia do que seu Hook personalizado faz, o que ele recebe e o que retorna.

Quando você se sincroniza com um sistema externo, o nome do seu Hook personalizado pode ser mais técnico e usar jargões específicos desse sistema. Isso é bom, desde que seja claro para uma pessoa familiarizada com esse sistema.

Mantenha os Hooks personalizados focados em casos de uso concretos de alto nível. Evite criar e usar Hooks personalizados de “ciclo de vida” que atuem como alternativas e encapsuladores de conveniência para a própria API useEffect

Um bom Hook personalizado torna o código de chamada mais declarativo, restringindo o que ele faz. 