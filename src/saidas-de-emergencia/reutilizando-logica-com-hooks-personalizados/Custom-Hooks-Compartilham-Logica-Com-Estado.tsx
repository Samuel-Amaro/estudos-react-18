/**
 * *  Hooks personalizados permitem compartilhar lógica com estado, não o próprio estado
 * 
 * Os Hooks personalizados permitem compartilhar lógica com estado e não o próprio estado. Cada chamada a um Hook é completamente independente de qualquer outra chamada ao mesmo Hook.
*/

import { useState } from "react";

//Você pode extrair a lógica repetitiva para este Hook personalizado useFormInput:
function useFormInput(initialValue: string) {
    //Observe que ele declara apenas uma variável de estado chamada value.
    const [value, setValue] = useState(initialValue);
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
    }
  
    const inputProps = {
      value: value,
      onChange: handleChange
    };
  
    return inputProps;
  }

export default function Form() {
    //No entanto, o componente Form chama useFormInput duas vezes:
    //É por isso que funciona como se estivéssemos declarando duas variáveis de estado separadas!
    const firstNameProps = useFormInput('Mary');
    const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        Primeiro nome:
        <input {...firstNameProps} />
      </label>
      <label>
        Último nome:
        <input {...lastNameProps} />
      </label>
      <p><b>Bom dia, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
  }