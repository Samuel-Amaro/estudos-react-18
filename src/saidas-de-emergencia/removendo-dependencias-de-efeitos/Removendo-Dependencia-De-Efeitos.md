# Removendo dependências de efeitos

Quando você escreve um Efeito, o linter verificará se você incluiu todos os valores reativos (como props e state) que o Efeito lê na lista de dependências do seu Efeito. Isso garante que seu Efeito permaneça sincronizado com os últimos props e state do seu componente. Dependências desnecessárias podem fazer com que seu Efeito seja executado com muita frequência ou até mesmo criar um loop infinito. Siga este guia para revisar e remover dependências desnecessárias dos seus Efeitos.

## As dependências devem corresponder ao código

Os efeitos “reagem” a valores reativos.

### Para remover uma dependência, prove que não é uma dependência

Observe que você não pode “escolher” as dependências do seu Efeito. Cada valor reativo usado pelo código do seu Efeito deve ser declarado na sua lista de dependências. A lista de dependências é determinada pelo código circundante.

Valores reativos incluem props e todas as variáveis ​​e funções declaradas diretamente dentro do seu componente.

**Para remover uma dependência, “prove” ao linter que ela não precisa ser uma dependência.**

### Para alterar as dependências, altere o código

Você pode ter notado um padrão em seu fluxo de trabalho:

- 1. Primeiro, você **altera o código** do seu Efeito ou como seus valores reativos são declarados.
- 2. Em seguida, siga o linter e ajuste as dependências para **corresponder ao código que você alterou.**
- 3. Se você não estiver satisfeito com a lista de dependências, **volte para o primeiro passo (e altere o código novamente).**

A última parte é importante. **Se você quiser alterar as dependências, altere o código ao redor primeiro.** Você pode pensar na lista de dependências como uma lista de todos os valores reativos usados ​​pelo código do seu Efeito. Você não escolhe o que colocar nessa lista. A lista descreve seu código. Para alterar a lista de dependências, altere o código.

Isso pode parecer como resolver uma equação. Você pode começar com um objetivo (por exemplo, remover uma dependência) e precisa "encontrar" o código que corresponde a esse objetivo. Nem todo mundo acha divertido resolver equações, e a mesma coisa pode ser dita sobre escrever Efeitos! Felizmente, há uma lista de receitas comuns que você pode tentar abaixo.

**Quando as dependências não correspondem ao código, há um risco muito alto de introduzir bugs.** Ao suprimir o linter, você “mente” para o React sobre os valores dos quais seu Effect depende.

#### Por que suprimir o linter de dependência é tão perigoso?

**Recomendamos tratar o erro de dependência lint como um erro de compilação. Se você não o suprimir, nunca verá bugs como esse.**

## Removendo dependências desnecessárias

Toda vez que você ajustar as dependências do Effect para refletir o código, olhe para a lista de dependências. Faz sentido que o Effect seja executado novamente quando qualquer uma dessas dependências mudar? Às vezes, a resposta é "não":

- Talvez você queira reexecutar diferentes partes do seu Efeito sob diferentes condições.
- Talvez você queira ler apenas o valor mais recente de alguma dependência em vez de “reagir” às suas alterações.
- Uma dependência pode mudar com muita frequência sem querer porque é um objeto ou uma função.

Para encontrar a solução certa, você precisará responder algumas perguntas sobre seu Efeito. Vamos examiná-las.

### Esse código deve ser movido para um manipulador de eventos?

A primeira coisa que você deve pensar é se esse código deve ser um Efeito.

### Seu Efeito está fazendo várias coisas não relacionadas?

A próxima pergunta que você deve se fazer é se o seu Efeito está fazendo várias coisas não relacionadas.

O problema com esse código é que você está sincronizando duas coisas diferentes e não relacionadas.

duas coisas diferentes são sincronizadas por dois Efeitos separados. Dois Efeitos separados têm duas listas de dependências separadas, então eles não vão disparar um ao outro involuntariamente.

### Você está lendo algum estado para calcular o próximo estado?

### Você quer ler um valor sem “reagir” às suas alterações?

Eventos de Efeito permitem que você divida um Efeito em partes reativas (que devem "reagir" a valores reativos como roomIde suas alterações) e partes não reativas (que apenas leem seus valores mais recentes, como onMessagereads isMuted). Agora que você lê isMuteddentro de um Evento de Efeito, ele não precisa ser uma dependência do seu Efeito.

Eventos de Efeito não são reativos, então você não precisa especificá-los como dependências. Como resultado, o chat não se reconectará mais mesmo se o componente pai passar uma função que seja diferente em cada nova renderização.

### Algum valor reativo muda involuntariamente?

Às vezes, você quer que seu Efeito “reaja” a um certo valor, mas esse valor muda com mais frequência do que você gostaria — e pode não refletir nenhuma mudança real da perspectiva do usuário.

**Este problema afeta apenas objetos e funções. Em JavaScript, cada objeto e função recém-criados são considerados distintos de todos os outros. Não importa que o conteúdo dentro deles possa ser o mesmo!**

**Dependências de objetos e funções podem fazer com que seu efeito seja ressincronizado com mais frequência do que o necessário.**

É por isso que, sempre que possível, você deve tentar evitar objetos e funções como dependências do seu Efeito. Em vez disso, tente movê-los para fora do componente, para dentro do Efeito, ou extrair valores primitivos deles.
