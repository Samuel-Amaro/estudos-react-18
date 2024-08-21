/**
 * * COPIANDO OBJETOS COM A SINTAXE DE ESPALHAMENTO
 *
 *
 */

import { useState } from "react";

export default function Form() {
  const [person, setPerson] = useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    email: "bhepworth@sculpture.com",
  });

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //altera o state, mutação
    //person.firstName = e.target.value;

    //A maneira confiável de obter o comportamento que você está procurando é criar um novo objeto e passá-lo para setPerson. Mas aqui, você também deseja copiar os dados existentes para ele porque apenas um dos campos foi alterado:
    //Você pode usar a sintaxe de espalhamento ... para não precisar copiar cada propriedade separadamente.
    //Observe que a sintaxe de espalhamento ... é “rasa” — ela copia apenas um nível de profundidade. Isso a torna rápida, mas também significa que, se você quiser atualizar uma propriedade aninhada, terá de usá-la mais de uma vez.
    setPerson({
      ...person, //copie os campos antigos
      firstName: e.target.value, //mas substitua esse
    });
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //altera o state, mutação
    //person.lastName = e.target.value;

    //usando sintaxe de espalhamento para copiar o state e substituir um valor
    setPerson({
      ...person,
      lastName: e.target.value,
    });
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    //altera o state, mutação
    //person.email = e.target.value;

    //usando sintaxe de espalhamento para copiar o state e substituir um valor
    setPerson({
      ...person,
      email: e.target.value,
    });
  }

  return (
    <>
      <label>
        Nome:
        <input value={person.firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Sobrenome:
        <input value={person.lastName} onChange={handleLastNameChange} />
      </label>
      <label>
        E-mail:
        <input value={person.email} onChange={handleEmailChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  );
}
