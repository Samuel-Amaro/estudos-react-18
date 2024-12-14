/**
 * * Exibindo conteúdo obsoleto enquanto o conteúdo novo está sendo carregado
 *
 * Chame useDeferredValue o nível superior do seu componente para adiar a atualização de alguma parte da sua interface do usuário.
 *
 */

import { Suspense, useDeferredValue, useState } from "react";
import SearchResults from "./SearchResults";

export default function AppUso1() {
  const [query, setQuery] = useState("");
  //useDeferredValueé um React Hook que permite adiar a atualização de uma parte da interface do usuário.
  //Durante a renderização inicial, o valor diferido será o mesmo que o valor fornecido.
  //Durante as atualizações, o valor diferido ficará “atrasado” em relação ao valor mais recente . Em particular, o React primeiro renderizará novamente sem atualizar o valor diferido e, em seguida, tentará renderizar novamente com o valor recém-recebido em segundo plano.
  //Um padrão de UI alternativo comum é adiar a atualização da lista de resultados e continuar mostrando os resultados anteriores até que os novos resultados estejam prontos. Chamada useDeferredValue para passar uma versão adiada da consulta para baixo:
  //O queryserá atualizado imediatamente, então a entrada exibirá o novo valor. No entanto, o deferredQuerymanterá seu valor anterior até que os dados sejam carregados, então SearchResults mostrará os resultados obsoletos por um tempo.
  //Insira "a"o exemplo abaixo, aguarde o carregamento dos resultados e edite a entrada para "ab". Observe como, em vez do fallback Suspense, você agora vê a lista de resultados obsoletos até que os novos resultados sejam carregados:
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}

/**
 * * COMO FUNCIONA O ADIAMENTO DE UM VALOR ?
 *
 * Você pode pensar nisso como algo que acontece em duas etapas:
 * 
 * Primeiro, o React renderiza novamente com o novo query( "ab"), mas com o antigo deferredQuery(ainda "a"). O deferredQueryvalor que você passa para a lista de resultados é adiado: ele “fica atrás” do query valor.
 * 
 * Em segundo plano, o React tenta renderizar novamente com ambos query e deferredQueryatualizado para "ab". Se essa renderização for concluída, o React a mostrará na tela. No entanto, se ele suspender (os resultados para "ab"ainda não foram carregados), o React abandonará essa tentativa de renderização e tentará renderizar novamente após os dados serem carregados. O usuário continuará vendo o valor deferred obsoleto até que os dados estejam prontos.
 * 
 * A renderização “em segundo plano” adiada é interrompível. Por exemplo, se você digitar na entrada novamente, o React a abandonará e reiniciará com o novo valor. O React sempre usará o último valor fornecido. 
 * 
 * Note que ainda há uma solicitação de rede para cada pressionamento de tecla. O que está sendo adiado aqui é a exibição de resultados (até que estejam prontos), não as solicitações de rede em si. Mesmo que o usuário continue digitando, as respostas para cada pressionamento de tecla são armazenadas em cache, então pressionar Backspace é instantâneo e não busca novamente.
*/
