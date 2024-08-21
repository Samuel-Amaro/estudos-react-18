/**
 * * ATUALIZANDO UM OBJETO ANINHADO
 */

import { useState } from "react";

export default function Form() {
  //o state e uma estrutura de objeto aninhado
  const [person, setPerson] = useState({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburgo",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      name: e.target.value,
    });
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value,
      },
    });
  }

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    //como atualizar uma estrutura de objeto aninha? de forma imutavel copiando os dados antigos e substituindo apenas os necessarios?
    //lembrar que devemos tratar o state como imutavel
    //Para alterar city, você precisaria primeiro produzir o novo objeto artwork (pré-preenchido com os dados do anterior) e, em seguida, produzir o novo objeto person que aponta para o novo artwork
    //escreito como uma unica chamada de função
    //Isto fica um pouco verboso, mas funciona bem em muitos casos
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value,
      },
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value,
      },
    });
  }

  return (
    <>
      <label>
        Nome:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Título:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        Cidade:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Imagem:
        <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" por "}
        {person.name}
        <br />
        (localizada em {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  );
}
