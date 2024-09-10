# Princípios para estruturar estados

Quando você escreve um componente que mantém algum estado, você terá que fazer escolhas sobre quantas variáveis de estado usar e qual deve ser a forma dos dados. Embora seja possível escrever programas corretos mesmo com uma estrutura de estado subótima, existem alguns princípios que podem orientá-lo a fazer escolhas melhores:

- **Agrupe estados relacionados.** Se você sempre atualiza duas ou mais variáveis de estado ao mesmo tempo, considere uni-las em uma única variável de estado.

- **Evite contradições no estado.** Quando o estado é estruturado de forma que várias partes do estado possam se contradizer e “discordar” umas das outras, você deixa espaço para erros. Tente evitar isso.

- **Evite estados redundantes.** Se você puder calcular algumas informações das props do componente ou de suas variáveis de estado existentes durante a renderização, não coloque essas informações no estado desse componente.

- **Evite duplicação no estado.** Quando os mesmos dados são duplicados entre várias variáveis de estado, ou dentro de objetos aninhados, é difícil mantê-los sincronizados. Reduza a duplicação quando puder.

- **Evite estados muito aninhados.** Um estado muito hierárquico não é muito conveniente para atualizar. Quando possível, prefira estruturar o estado de forma plana.

O objetivo por trás destes princípios é tornar o estado fácil de atualizar sem introduzir erros. Remover dados redundantes e duplicados do estado ajuda a garantir que todas as suas partes permaneçam sincronizadas. Isso é semelhante a como um engenheiro de banco de dados pode querer “normalizar” a estrutura do banco de dados para reduzir a chance de erros. Parafraseando Albert Einstein, “Faça seu estado o mais simples possível - mas não simples demais.”
