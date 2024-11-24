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
 * * EXEMPLO 4 Extraindo provedores para um componente
 *
 * Conforme seu aplicativo cresce, espera-se que você tenha uma “pirâmide” de contextos mais próximos da raiz do seu aplicativo. Não há nada de errado nisso. No entanto, se você não gosta do aninhamento esteticamente, pode extrair os provedores em um único componente. Neste exemplo, MyProviders oculta o “encanamento” e renderiza os filhos passados ​​a ele dentro dos provedores necessários. Observe que o estado theme and é necessário por si só, então ainda possui essa parte do estado.setThemeMyAppMyApp
 *
 * @returns
 */

export default function MyAppEx4() {
  const [theme, setTheme] = useState<ThemeContext>("light");

  return (
    <Providers theme={theme}>
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
    </Providers>
  );
}

//extrair os provedores em um único componente.
function Providers({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: ThemeContext;
}) {
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
        {children}
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
