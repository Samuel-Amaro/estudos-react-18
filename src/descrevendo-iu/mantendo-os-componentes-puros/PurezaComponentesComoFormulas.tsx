/**
 * * PUREZA: COMPONENTES COMO FÓRMULAS
 *
 * Algumas funções JavaScript são puras. Funções puras só realizam um cálculo e nada mais.
 *
 * Na ciência da computação (e especialmente no mundo da programação funcional), uma função pura é uma função com as seguintes características:
 *
 * Ele cuida da própria vida. Ele não altera nenhum objeto ou variável que existia antes de ser chamado.
 * Mesmas entradas, mesma saída. Dadas as mesmas entradas, uma função pura deve sempre retornar o mesmo resultado.
 * Você já deve estar familiarizado com um exemplo de funções puras: fórmulas em matemática.
 *
 * O React é projetado em torno desse conceito. O React assume que cada componente que você escreve e ​uma função pura. Isso significa que os componentes React que você escreve devem sempre retornar o mesmo JSX, dadas as mesmas entradas:
 *
 * Você pode pensar em seus componentes como receitas: se você segui-los e não introduzir novos ingredientes durante o processo de cozimento, você obterá o mesmo prato todas as vezes. Esse “prato” é o JSX que o componente serve para o React renderizar .
 */

function Recipe({ drinkers }: { drinkers: number }) {
  return (
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>
        Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.
      </li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
