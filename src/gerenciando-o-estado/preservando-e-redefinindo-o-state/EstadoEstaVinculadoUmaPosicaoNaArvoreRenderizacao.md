# O estado está vinculado a uma posição na árvore de renderização

O React cria árvores de renderização para a estrutura do componente na sua interface do usuário.

Quando você dá um estado de componente, você pode pensar que o estado “vive” dentro do componente. Mas o estado é, na verdade, mantido dentro do React. O React associa cada pedaço de estado que ele está mantendo com o componente correto por onde esse componente fica na árvore de renderização.

No React, cada componente na tela tem um estado totalmente isolado.

O React manterá o estado enquanto você renderizar o mesmo componente na mesma posição na árvore.

quando o React remove um componente, ele destrói seu estado.

O React preserva o estado de um componente enquanto ele estiver sendo renderizado em sua posição na árvore da IU. Se ele for removido, ou um componente diferente for renderizado na mesma posição, o React descarta seu estado.
