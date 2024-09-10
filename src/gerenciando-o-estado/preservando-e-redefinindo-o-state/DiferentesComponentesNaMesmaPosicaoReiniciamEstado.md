# Diferentes componentes na mesma posição reiniciam o estado

quando você renderiza um componente diferente na mesma posição, ele redefine o estado de toda a sua subárvore

Como regra geral, se você quiser preservar o estado entre as re-renderizações, a estrutura da sua árvore precisa “corresponder” de uma renderização para outra. Se a estrutura for diferente, o estado é destruído porque o React destrói o estado quando remove um componente da árvore.

sempre declare funções de componentes no nível superior e não aninhe suas definições.
