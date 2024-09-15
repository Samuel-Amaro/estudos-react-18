# Como lidar com o efeito disparando duas vezes durante o desenvolvimento?

O React remonta intencionalmente seus componentes em desenvolvimento para encontrar bugs como no último exemplo.**A pergunta certa não é "como executar um Efeito uma vez", mas "como consertar meu Efeito para que ele funcione após a remontagem".**

Geralmente, a resposta é implementar a função de limpeza. A função de limpeza deve parar ou desfazer o que quer que o Efeito esteja fazendo. A regra geral é que o usuário não deve ser capaz de distinguir entre o Efeito sendo executado uma vez (como na produção) e uma sequência de configuração → limpeza → configuração (como você veria no desenvolvimento).

A maioria dos efeitos que você escreverá se encaixará em um dos padrões comuns abaixo.
