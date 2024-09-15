# Sincronizando com efeitos

Os efeitos permitem que você execute algum código após a renderização para que você possa sincronizar seu componente com algum sistema fora do React.

## O que são efeitos e como eles são diferentes de eventos?

Antes de chegar aos efeitos, você precisa estar familiarizado com dois tipos de lógica dentro dos componentes React:

- **O código de renderização** (apresentado em Descrevendo a IU ) fica no nível superior do seu componente. É aqui que você pega os props e o estado, os transforma e retorna o JSX que deseja ver na tela. O código de renderização deve ser puro. Como uma fórmula matemática, ele deve calcular apenas o resultado, mas não fazer mais nada.
- **Manipuladores de eventos** (introduzidos em Adicionando Interatividade ) são funções aninhadas dentro de seus componentes que fazem coisas em vez de apenas calculá-las. Um manipulador de eventos pode atualizar um campo de entrada, enviar uma solicitação HTTP POST para comprar um produto ou navegar o usuário para outra tela. Os manipuladores de eventos contêm “efeitos colaterais” (eles alteram o estado do programa) causados ​​por uma ação específica do usuário (por exemplo, um clique de botão ou digitação).

Às vezes isso não é suficiente. Considere um ChatRoomcomponente que deve se conectar ao servidor de bate-papo sempre que estiver visível na tela. Conectar-se a um servidor não é um cálculo puro (é um efeito colateral), então não pode acontecer durante a renderização. No entanto, não há um único evento em particular, como um clique, que faça com que ChatRoomseja exibido.

**Os efeitos permitem que você especifique efeitos colaterais que são causados ​​pela renderização em si, em vez de por um evento em particular.** Enviar uma mensagem no chat é um evento porque é causado diretamente pelo usuário clicando em um botão específico. No entanto, configurar uma conexão de servidor é um efeito porque deve acontecer não importa qual interação fez o componente aparecer. Os efeitos são executados no final de um commit após as atualizações da tela. Este é um bom momento para sincronizar os componentes React com algum sistema externo (como rede ou uma biblioteca de terceiros).

Aqui e mais adiante neste texto, “Efeito” em maiúsculas se refere à definição específica do React acima, ou seja, um efeito colateral causado pela renderização. Para se referir ao conceito de programação mais amplo, diremos “efeito colateral”.

## Você pode não precisar de um efeito

**Não tenha pressa em adicionar Efeitos aos seus componentes.** Tenha em mente que Efeitos são normalmente usados ​​para “sair” do seu código React e sincronizar com algum sistema externo. Isso inclui APIs de navegador, widgets de terceiros, rede e assim por diante. Se o seu Efeito apenas ajusta algum estado com base em outro estado, você pode não precisar de um Efeito.
