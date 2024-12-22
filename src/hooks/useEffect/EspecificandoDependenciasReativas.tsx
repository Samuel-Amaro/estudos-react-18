import { useEffect, useState } from "react";
import { createConnection } from "./chat";

/**
 * * Especificando dependências reativas
 *
 * Observe que você não pode “escolher” as dependências do seu Efeito. Cada valor reativo usado pelo código do seu Efeito deve ser declarado como uma dependência. A lista de dependências do seu Efeito é determinada pelo código ao redor:
 *
 * Valores reativos incluem props e todas as variáveis ​​e funções declaradas diretamente dentro do seu componente.
 *
 * Para remover uma dependência, você precisa “provar” ao linter que ela não precisa ser uma dependência.
 *
 * Se o código do seu Effect não usar nenhum valor reativo, sua lista de dependências deve estar vazia ( []):
 *
 * Um efeito com dependências vazias não é executado novamente quando qualquer uma das propriedades ou estado do seu componente muda.
 *
 *
 * @param param0
 * @returns
 */

//Se você especificar as dependências, seu efeito será executado após a renderização inicial e após novas renderizações com dependências alteradas.
// useEffect(() => {
//   // ...
// }, [a, b]); // Executa novamente se a ou b forem diferentes

//Se o seu efeito realmente não usar nenhum valor reativo, ele só será executado após a renderização inicial.
// useEffect(() => {
//   // ...
// }, []); // Não será executado novamente (exceto uma vez em desenvolvimento)

//Se você não passar nenhuma matriz de dependência, seu efeito será executado após cada renderização (e nova renderização) do seu componente.
// useEffect(() => {
//   // ...
// }); // Sempre executa de novo