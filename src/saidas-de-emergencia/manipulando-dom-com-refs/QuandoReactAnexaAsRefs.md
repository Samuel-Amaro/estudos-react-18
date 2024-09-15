# Quando o React anexa as referências

No React, cada atualização é dividida em duas fases :

- Durante a renderização, o React chama seus componentes para descobrir o que deve estar na tela.
- Durante a confirmação, o React aplica alterações ao DOM.

Em geral, você não quer acessar refs durante a renderização. Isso vale para refs que contêm nós DOM também. Durante a primeira renderização, os nós DOM ainda não foram criados, então ref.currentserão null. E durante a renderização de atualizações, os nós DOM ainda não foram atualizados. Então é muito cedo para lê-los.

React define ref.currentdurante o commit. Antes de atualizar o DOM, o React define os ref.currentvalores afetados para null. Após atualizar o DOM, o React os define imediatamente para os nós DOM correspondentes.

Geralmente, você acessará refs de manipuladores de eventos. Se você quiser fazer algo com um ref, mas não há um evento específico para fazer isso, você pode precisar de um Effect. Discutiremos Effects nas próximas páginas.
