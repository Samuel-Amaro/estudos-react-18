# Melhores práticas para manipulação de DOM com refs

Refs são uma saída de emergência. Você só deve usá-los quando tiver que “sair do React”. Exemplos comuns disso incluem gerenciar foco, posição de rolagem ou chamar APIs de navegador que o React não expõe.

Se você se ater a ações não destrutivas como foco e rolagem, não deverá encontrar problemas. No entanto, se tentar modificar o DOM manualmente, pode correr o risco de entrar em conflito com as alterações que o React está fazendo.

**Evite alterar nós DOM gerenciados pelo React.** Modificar, adicionar filhos ou remover filhos de elementos gerenciados pelo React pode levar a resultados visuais inconsistentes ou travamentos como acima.

No entanto, isso não significa que você não pode fazer isso de forma alguma. Requer cautela. **Você pode modificar com segurança partes do DOM que o React não tem razão para atualizar.** Por exemplo, se algum <div> estiver sempre vazio no JSX, o React não terá razão para tocar em sua lista de filhos. Portanto, é seguro adicionar ou remover manualmente elementos ali.
