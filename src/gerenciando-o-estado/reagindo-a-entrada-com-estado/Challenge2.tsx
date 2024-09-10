import { useState } from "react";

export default function EditProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Jacobs");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "firstName") setFirstName(e.target.value);
    else setLastName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsEdit(!isEdit);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:{" "}
        {isEdit ? (
          <input name="firstName" value={firstName} onChange={handleOnChange} />
        ) : (
          <b>Jane</b>
        )}
      </label>
      <label>
        Sobrenome:{" "}
        {isEdit ? (
          <input name="lastName" value={lastName} onChange={handleOnChange} />
        ) : (
          <b>Jacobs</b>
        )}
      </label>
      <button type="submit">
        {isEdit ? "Salvar Perfil" : "Editar Perfil"}
      </button>
      <p>
        <i>
          Olá, {firstName} {lastName}!
        </i>
      </p>
    </form>
  );
}
