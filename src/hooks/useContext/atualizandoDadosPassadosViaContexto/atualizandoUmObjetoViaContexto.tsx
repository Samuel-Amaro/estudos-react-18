import { createContext, useContext, useState } from "react";
import "./style2.css";

type UserContext = {
  currentUser: {
    name: string;
  } | null;
  setCurrentUser: (user: { name: string }) => void;
};

//cria um contexto
const CurrentUserContext = createContext<UserContext | null>(null);

/**
 * * ATUALIZANDO UM OBJETO VIA CONTEXTO
 *
 *  Neste exemplo, há uma currentUservariável de estado que contém um objeto. Você combina { currentUser, setCurrentUser }em um único objeto e o passa para baixo através do contexto dentro do value={}. Isso permite que qualquer componente abaixo, como LoginButton, leia ambos currentUsere setCurrentUser, e então chame setCurrentUserquando necessário.
 */

export default function MyAppEx2() {
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      <Form />
    </CurrentUserContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {
  //ler e assinar o contexto
  //obtem o valor de contexto do provedor mais proximo acima na arvore de componentes
  const contextUser = useContext(CurrentUserContext);

  if (contextUser !== null && contextUser.currentUser) {
    return <p>You logged in as {contextUser.currentUser.name}.</p>;
  }

  return (
    <Button
      onClick={() => {
        if (contextUser !== null)
          contextUser.setCurrentUser({ name: "Advika" });
      }}
    >
      Log in as Advika
    </Button>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
