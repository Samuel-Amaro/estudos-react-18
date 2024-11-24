import React, { createContext, memo, useContext, useState } from "react";
import "./style3.css";

type UserContext = {
  currentUser: {
    name: string;
  } | null;
  setCurrentUser: (user: { name: string }) => void;
};

type ThemeContext = "light" | "dark" | "system";

const ThemeContext = createContext<ThemeContext | null>(null);
const CurrentUserContext = createContext<UserContext | null>(null);

/**
 * * EXEMPLO 3 Contextos múltiplos
 *
 * Neste exemplo, há dois contextos independentes. ThemeContextfornece o tema atual, que é uma string, enquanto CurrentUserContext contém o objeto que representa o usuário atual.
 * @returns
 */

export default function MyAppEx3() {
  const [theme, setTheme] = useState<ThemeContext>("light");
  const [currentUser, setCurrentUser] = useState<{
    name: string;
  } | null>(null);

  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <WelcomePanel />
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
            }}
          />
          Use dark mode
        </label>
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

function WelcomePanel() {
  //ler e assinar o contexto
  //obtem o valor de contexto do provedor mais proximo acima na arvore de componentes
  const userContext = useContext(CurrentUserContext);

  return (
    <Panel title="Welcome">
      {userContext !== null && userContext.currentUser ? (
        <Greeting name={userContext.currentUser.name} />
      ) : (
        <LoginForm />
      )}
    </Panel>
  );
}

const Greeting = memo(function Greeting({ name }: { name: string }) {
  return <p>You logged in as {name}.</p>;
});

function LoginForm() {
  //ler e assinar o contexto
  //obtem o valor de contexto do provedor mais proximo acima na arvore de componentes
  const userContext = useContext(CurrentUserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName.trim() !== "" && lastName.trim() !== "";

  return (
    <>
      <label>
        First name{": "}
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{": "}
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          if (userContext !== null)
            userContext.setCurrentUser({
              name: firstName + " " + lastName,
            });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
