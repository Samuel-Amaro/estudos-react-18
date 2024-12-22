/**
 * * BUSCANDO DADOS COM EFEITOS
 *
 *  Você pode usar um Effect para buscar dados para seu componente. Note que se você usar um framework, usar o mecanismo de busca de dados do seu framework será muito mais eficiente do que escrever Effects manualmente.
 *
 * Se você quiser buscar dados de um efeito manualmente, seu código pode ficar assim:
 *
 * Observe a ignore variável que é inicializada para false, e é definida como true durante a limpeza. Isso garante que seu código não sofra de “condições de corrida”: as respostas de rede podem chegar em uma ordem diferente da que você as enviou.
 *
 * Escrever busca de dados diretamente no Effects se torna repetitivo e dificulta adicionar otimizações como cache e renderização de servidor mais tarde.
 */

import { useEffect, useState } from "react";
import { fetchBio } from "./api";

export default function AppUsoEffect5() {
  const [person, setPerson] = useState("Alice");
  const [bio, setBio] = useState<string | null>(null);

  //`useEffect`é um React Hook que permite sincronizar um componente com um sistema externo.
  //buscando dados manualmente usando um effect
  useEffect(
    //function de configuração com implementação de configuração que se conecta a um sistema externo
    () => {
      //EXEMPLO USANDO PROMISES E THEN
      //para evitar race condition
      //vamos usar o o sinalizado booleano
      //let ignore = false;
      //   setBio(null);
      //   fetchBio(person).then((result) => {
      //     if (!ignore) {
      //       setBio(result);
      //     }
      //   });

      //EXEMPLO USANDO ASYNC/AWAIT
      async function startFetching() {
        setBio(null);
        const result = await fetchBio(person);
        if (!ignore) {
          setBio(result);
        }
      }

      //para evitar race condition
      //vamos usar o o sinalizado booleano
      let ignore = false;
      startFetching();

      //function de limpeza que implementa uma forma de desconectar de um sistema externo
      return () => {
        //para evitar race condition
        //a cada nova renderização, conseguente de person ter mudado, ira somente permitir atualizar o state com a request mais recente, as absoletas não atualização o state
        //ainda teremos condições de corrida em andamento no sentido de varias request mas apenas os resultados da ultima serão usados
        ignore = true;
      };
    },
    //array de dependencias, com valores reativos(props, states, ...) que são usados dentro das funções de configuração e limpeza
    //Valores reativos incluem props e todas as variáveis ​​e funções declaradas diretamente dentro do seu componente.
    [person],
  );

  return (
    <>
      <select
        value={person}
        onChange={(e) => {
          setPerson(e.target.value);
        }}
      >
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p>
        <i>{bio ?? "Loading..."}</i>
      </p>
    </>
  );
}
