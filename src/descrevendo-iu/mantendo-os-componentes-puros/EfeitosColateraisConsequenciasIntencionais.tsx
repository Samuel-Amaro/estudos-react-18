/**
 * * EFEITOS COLATERAIS: CONSEQUÊNCIAS (IN)TENCIONAIS
 *
 *  O processo de renderização do React deve ser sempre puro. Os componentes devem retornar apenas seus JSX, e não alterar nenhum objeto ou variável que existia antes da renderização — isso os tornaria impuros!
 *
 * Aqui está um componente que quebra essa regra:
 *
 * Este componente está lendo e escrevendo uma guestvariável declarada fora dele. Isso significa que chamar este componente várias vezes produzirá JSX diferentes! E mais, se outros componentes lerem guest, eles produzirão JSX diferentes também, dependendo de quando foram renderizados! Isso não é previsível.
 */

/*let guest = 0;

function Cup() {
  // mal: alterando uuma variavel pre-existente
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}*/

/**
 * Voltando à nossa fórmula y = 2 x , agora mesmo se x = 2 , não podemos confiar que y = 4 . Nossos testes podem falhar, nossos usuários ficariam perplexos, aviões cairiam do céu — você pode ver como isso levaria a bugs confusos!
 *
 * Você pode corrigir esse componente passando- guest o como um prop :
 */

function Cup({ guest }: { guest: number }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}

/**
 * Agora seu componente está puro, pois o JSX que ele retorna depende apenas da guest prop.
 */
