export default function TodoList() {
  return (
    //Essa tag vazia é chamada de Fragment. Fragments permitem que você agrupe coisas sem deixar rastros na árvore HTML do navegador.
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
