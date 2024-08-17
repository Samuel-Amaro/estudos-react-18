/**
 * Um componente React é uma função JavaScript que permite você adicionar tags HTML.
 * Os componentes do React são funções comuns do JavaScript, mas seus nomes devem começar com letra maiúscula ou não funcionarão!
 * o corpo da function possui a sintaxe é chamada JSX e permite usar tags HTML dentro do JavaScript.
 *
 * @returns
 */
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}

/**
 * usando o componente <Profile />, posso colocá-lo dentro de outros componentes
 *
 *
 * @returns
 */
export default function Gallery() {
  return (
    <section>
      <h1>Cientistas incríveis</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
