/**
 * * INDICANDO QUE O CONTEUDO ESTA DESATUALIZADO
 *
 * não há indicação de que a lista de resultados para a consulta mais recente ainda esteja carregando. Isso pode ser confuso para o usuário se os novos resultados demorarem para carregar. Para tornar mais óbvio para o usuário que a lista de resultados não corresponde à consulta mais recente, você pode adicionar uma indicação visual quando a lista de resultados obsoleta for exibida:
 *
 * Com essa mudança, assim que você começa a digitar, a lista de resultados obsoleta fica levemente esmaecida até que a nova lista de resultados seja carregada. Você também pode adicionar uma transição CSS para atrasar o escurecimento para que pareça gradual, como no exemplo abaixo:
 */

import { Suspense, useDeferredValue, useState } from "react";
import SearchResults from "./SearchResults";

export default function AppUso2() {
  const [query, setQuery] = useState("");
  //useDeferredValueé um React Hook que permite adiar a atualização de uma parte da interface do usuário.
  //Durante a renderização inicial, o valor diferido será o mesmo que o valor fornecido.
  //Durante as atualizações, o valor diferido ficará “atrasado” em relação ao valor mais recente . Em particular, o React primeiro renderizará novamente sem atualizar o valor diferido e, em seguida, tentará renderizar novamente com o valor recém-recebido em segundo plano.
  //Um padrão de UI alternativo comum é adiar a atualização da lista de resultados e continuar mostrando os resultados anteriores até que os novos resultados estejam prontos. Chamada useDeferredValue para passar uma versão adiada da consulta para baixo:
  //O queryserá atualizado imediatamente, então a entrada exibirá o novo valor. No entanto, o deferredQuerymanterá seu valor anterior até que os dados sejam carregados, então SearchResults mostrará os resultados obsoletos por um tempo.
  //Insira "a"o exemplo abaixo, aguarde o carregamento dos resultados e edite a entrada para "ab". Observe como, em vez do fallback Suspense, você agora vê a lista de resultados obsoletos até que os novos resultados sejam carregados:
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale
              ? "opacity 0.2s 0.2s linear"
              : "opacity 0s 0s linear",
          }}
        >
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
