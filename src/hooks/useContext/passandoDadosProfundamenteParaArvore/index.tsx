import "./style.css";
import { createContext, useContext } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<Theme>("system");

export default function MyAppTheme() {
  //Para passar contexto para um Button, envolva-o ou um de seus componentes pais no provedor de contexto correspondente:
  //Não importa quantas camadas de componentes existam entre o provedor e o Button. Quando um Button em qualquer lugar dentro de Form chama useContext(ThemeContext), ele receberá "dark"como o valor.
  //OBS: useContext()sempre procura o provedor mais próximo acima do componente que o chama. Ele procura para cima e não considera provedores no componente do qual você está chamando useContext().

  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
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

function Button({ children }: { children: React.ReactNode }) {
  //ira ler e assinar o contexto
  //useContext retorna o valor de contexto para o contexto que você passou. Para determinar o valor de contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return <button className={className}>{children}</button>;
}
