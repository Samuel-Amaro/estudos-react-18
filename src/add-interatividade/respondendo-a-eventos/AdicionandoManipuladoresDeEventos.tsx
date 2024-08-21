/**
 * * ADICIONANDO MANIPULADORES DE EVENTOS
 *
 * manipuladores de eventos (event handlers)
 * Os manipuladores de eventos são funções independentes que são acionadas em resposta a interações como clicar com o mouse, passar o cursor do mouse sobre um certo elemento, focar em campos de formulário, entre outros.
 *
 * Para adicionar um manipulador de eventos, primeiro defina uma função e depois passe-a como uma prop para o elemento JSX desejado.
 */

export default function Button() {
  //define a função manipulação do evento (event handlers)
  //aqui e um manipulador de eventos
  //os event handlers são definidos dentro de seus respectivos componentes
  //tem nomes que começam com a palavra handle, seguido do nome do evento em camel case
  //Por convenção, é comum nomear manipuladores de eventos com a palavra handle seguida do nome do evento.
  function handleClick() {
    alert("Você clicou no botão!");
  }

  return (
    //add o evento de click ao JSX do elemento button, informando como uma prop o manipulador do evento
    //Se desejar, você pode definir um manipulador de eventos diretamente na prop da tag JSX:
    //Todos esses estilos são equivalentes. Os manipuladores de eventos diretamente na prop são adequados para funções pequenas.
    //As funções passadas para os manipuladores de eventos devem ser passadas como referência, e não chamá-la diretamente.
    //passando uma função como referência (correto): <button onClick={handleClick}>, Isso diz ao React para lembrá-lo e apenas chamar sua função quando o usuário clicar no botão.
    //chamando uma função (incorreto): <button onClick={handleClick()}>, No segundo exemplo, o () no final de handleClick() dispara a função imediatamente durante a renderização, sem nenhum clique. Isso ocorre porque o JavaScript dentro do JSX { e } é executado imediatamente.
    //Quando você escreve código diretamente na prop, você pode cometer o mesmo erro de uma maneira diferente:
    //passando uma função como referência (correto): <button onClick={() => alert('...')}>, Se você deseja definir seu manipulador de eventos diretamente na prop, envolva-o em uma função anônima da seguinte forma: <button onClick={() => alert('Você clicou em mim!')}>
    //chamando uma função (incorreto): <button onClick={alert('...')}>: Passar código diretamente na prop, não dispara no clique - ele será disparado toda vez que o componente for renderizado: <button onClick={alert('Você clicou em mim!')}>

    <button
      onClick={handleClick}
      /*onClick={function handleClick() {
        alert('Você clicou no botão!');
        //definindo manipulador diretamente na prop da tag jsx
      }}*/
      /*onClick={() => {
        //definindo de forma mais concisa usando arrow function
        alert('Você clicou no botão!');
      }}*/
    >
      Este botão não faz nada
    </button>
  );
}
