import { useId } from "react";

function PasswordField() {
  //1. Chame useId no nível superior do seu componente para gerar um ID único:
  //useId é um Hook do React para gerar IDs únicos que podem ser passados para atributos de acessibilidade.
  //retorna uma sequência de ID único associada a esta chamada useId específica neste componente específico.
  const passwordHintId = useId();

  //Você pode então passar o ID gerado para diferentes atributos:
  //Vamos analisar um exemplo para ver quando isso é útil.
  //Atributos de acessibilidade do HTML como aria-describedby permite especificar que duas tags estão relacionadas entre si. Por exemplo, você pode especificar que um elemento (como um input) seja descrito por outro elemento (como um parágrafo).
  //No HTML normal, você escreveria assim:
  // <label>
  //   Senha:
  //   <input
  //     type="password"
  //     aria-describedby="password-hint"
  //   />
  // </label>
  // <p id="password-hint">
  //   A senha deve conter pelo menos 18 caracteres
  // </p>

  //No entanto, codificar IDs como esse não é uma boa prática no React. Um componente pode ser renderizado mais de uma vez na página, mas os IDs devem ser únicos! Em vez de codificar um ID, gere um ID único com useId:
  //Agora, mesmo que PasswordField apareça várias vezes na tela, os IDs gerados não entrarão em conflito.
  return (
    <>
      <label>
        Senha:
        <input type="password" aria-describedby={passwordHintId} />
      </label>
      <p id={passwordHintId}>A senha deve conter pelo menos 18 caracteres</p>
    </>
  );
}

export default function AppUsoId1() {
  return (
    <>
      <h2>Escolha uma senha</h2>
      <PasswordField />
      <h2>Confirme a senha</h2>
      <PasswordField />
    </>
  );
}
