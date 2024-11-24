import "./style6.css";
import { createContext, useContext } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<Theme | null>(null);

/**
 * * Substituindo o contexto para uma parte da árvore
 *
 * Você pode substituir o contexto de uma parte da árvore encapsulando essa parte em um provedor com um valor diferente.
 *
 * Você pode aninhar e substituir provedores quantas vezes precisar.
 *
 * @returns
 */

export default function MyAppTheme3() {
  return (
    <>
      <ThemeContext.Provider value="dark">
        <Form />
      </ThemeContext.Provider>
    </>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
      {/* Você pode substituir o contexto de uma parte da árvore encapsulando essa parte em um provedor com um valor diferente. 
        Aqui, o botão dentro do Footer recebe um valor de contexto diferente ( "light") do que os botões fora do ( "dark").
      */}
      <ThemeContext.Provider value="light">
        <Footer />
      </ThemeContext.Provider>
    </Panel>
  );
}

function Footer() {
  return (
    <footer>
      <Button>Settings</Button>
    </footer>
  );
}

function Panel({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  //ira ler e assinar o contexto
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;

  return (
    <section className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  //ira ler e assinar o contexto
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;

  return <button className={className}>{children}</button>;
}
