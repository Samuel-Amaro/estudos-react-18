import "./style5.css";
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark" | "system";

//Se o React não conseguir encontrar nenhum provedor desse contexto específico na árvore pai, o valor de contexto retornado por useContext() será igual ao valor padrão que você especificou quando criou esse contexto:
//nesse caso aqui system, o tema default
//O valor padrão nunca muda . Se você quiser atualizar o contexto, use-o com o estado conforme descrito acima.
//Muitas vezes, em vez de null, há algum valor mais significativo que você pode usar como padrão, por exemplo:
//Dessa forma, se você renderizar acidentalmente algum componente sem um provedor correspondente, ele não quebrará. Isso também ajuda seus componentes a funcionarem bem em um ambiente de teste sem configurar muitos provedores nos testes.
//Note que o valor padrão da sua createContext(defaultValue)chamada só é usado se não houver nenhum provedor correspondente acima.
const ThemeContext = createContext<Theme>("dark");

/**
 * * ESPECIFICANDO UM VALOR PADRÃO DE FALLBACK
 *
 * No exemplo abaixo, o botão “Toggle theme” está sempre aceso porque está fora de qualquer provedor de contexto de tema e o valor do tema de contexto padrão é 'light'. Tente editar o tema padrão para ser 'dark'.
 *
 * @returns
 */

export default function MyAppTheme2() {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Form />
      </ThemeContext.Provider>
      {/* No exemplo abaixo, o botão “Toggle theme” está darkaceso porque está fora de qualquer provedor de contexto de tema e o valor do tema de contexto padrão é 'dark'. Tente editar o tema padrão para ser 'light'. 
      //Dessa forma, se você renderizar acidentalmente algum componente sem um provedor correspondente, ele não quebrará. Isso também ajuda seus componentes a funcionarem bem em um ambiente de teste sem configurar muitos provedores nos testes.
      //renderiza um button fora do provider do contexto, mas mesmo assim quando este componente tentar consumir o contexto ele obtem o valor default que foi passado para o contexto quando criado, mas as atualizações do contexto ele não podera consumir pois não e um filho do provider do contexto
      //Note que o valor padrão da sua createContext(defaultValue) chamada só é usado se não houver nenhum provedor correspondente acima. 
      */}
      <Button
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        Toggle theme
      </Button>
    </>
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

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  //ira ler e assinar o contexto
  //useContext retorna o valor de contexto para o contexto que você passou. Para determinar o valor de contexto, o React pesquisa a árvore de componentes e encontra o provedor de contexto mais próximo acima para aquele contexto específico.
  //Se o React não conseguir encontrar nenhum provedor desse contexto específico na árvore pai, o valor de contexto retornado por useContext() será igual ao valor padrão que você especificou quando criou esse contexto:
  //Dessa forma, se você renderizar acidentalmente algum componente sem um provedor correspondente, ele não quebrará. Isso também ajuda seus componentes a funcionarem bem em um ambiente de teste sem configurar muitos provedores nos testes.
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
