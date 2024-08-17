/**
 * * MUTAÇÃO LOCAL: O PEQUENO SEGREDO DO SEU COMPONENTE
 *
 * No exemplo acima, o problema era que o componente alterava uma variável preexistente durante a renderização. Isso é frequentemente chamado de “mutação” para soar um pouco mais assustador. Funções puras não alteram variáveis ​​fora do escopo da função ou objetos que foram criados antes da chamada — isso as torna impuras!
 *
 * No entanto, é completamente aceitável alterar variáveis ​​e objetos que você acabou de criar durante a renderização. Neste exemplo, você cria um []array, atribui a ele uma cupsvariável e, então, pushcoloca uma dúzia de cups nele:
 *
 * Se a cupsvariável ou o []array fossem criados fora da TeaGatheringfunção, isso seria um problema enorme! Você estaria alterando um objeto preexistente ao empurrar itens para aquele array.
 *
 * No entanto, está tudo bem porque você os criou durante o mesmo render , dentro de TeaGathering. Nenhum código fora de TeaGatheringjamais saberá que isso aconteceu. Isso é chamado de “mutação local” — é como o segredinho do seu componente.
 */

function Cup({ guest }: { guest: number }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  const cups: JSX.Element[] = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
