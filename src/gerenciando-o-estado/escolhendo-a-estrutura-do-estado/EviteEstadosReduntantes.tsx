/**
 * * EVITE ESTADOS REDUNDANTES
 *
 *  Evite estados redundantes. Se você puder calcular algumas informações das props do componente ou de suas variáveis de estado existentes durante a renderização, não coloque essas informações no estado desse componente.
 *
 * Se você pode calcular algumas informações das props do componente ou de suas variáveis de estado existentes durante a renderização, você não deveria colocar essas informações no estado desse componente.
 */

import { useState } from "react";

export default function Form() {
  //O estado é inicializado apenas durante a primeira renderização.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //Você sempre pode calcular fullName a partir de firstName e lastName durante a renderização,
  //Aqui, fullName não é uma variável de estado. Em vez disso, ela é calculada durante a renderização:
  const fullName = firstName + " " + lastName;

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //Quando você chama setFirstName ou setLastName, você dispara uma nova renderização, e então o próximo fullName será calculado a partir dos dados atualizados.
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    //Quando você chama setFirstName ou setLastName, você dispara uma nova renderização, e então o próximo fullName será calculado a partir dos dados atualizados.
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Vamos fazer seu check-in</h2>
      <label>
        Primeiro nome:{" "}
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Sobrenome: <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>
        Seu ticket será emitido para: <b>{fullName}</b>
      </p>
    </>
  );
}
