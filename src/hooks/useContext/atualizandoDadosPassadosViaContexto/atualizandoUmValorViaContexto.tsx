import "./style1.css";
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<Theme>("system");

/**
 * * ATUALIZANDO UM VALOR VIA CONTEXTO
 *
 * Neste exemplo, o MyAppcomponente mantém uma variável de estado que é então passada para o ThemeContext provedor. Marcar a caixa de seleção “Dark mode” atualiza o estado. Alterar o valor fornecido renderiza novamente todos os componentes usando esse contexto.
 *
 * Note que value="dark" passa a "dark"string, mas value={theme} passa o valor da theme variável JavaScript com chaves JSX. Chaves também permitem que você passe valores de contexto que não são strings.
 *
 * @returns
 */

export default function MyAppThemeEx1() {
  //Frequentemente, você vai querer que o contexto mude ao longo do tempo. Para atualizar o contexto, combine-o com o estado. Declare uma variável de estado no componente pai e passe o estado atual como o valor de contexto para o provedor.
  const [theme, setTheme] = useState<Theme>("light");

  return (
    //provedor de contexto provem um value
    <ThemeContext.Provider value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => {
            //Agora, qualquer Button dentro do provedor receberá o theme valor atual. Se você chamar setTheme para atualizar o theme valor que você passa para o provedor, todos Button os componentes serão renderizados novamente com o novo 'light' valor.
            setTheme(e.target.checked ? "dark" : "light");
          }}
        />
        Use dark mode
      </label>
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
