export default function Avatar() {
  const avatar = "https://i.imgur.com/7vQD0fPs.jpg";
  const description = "Gregorio Y. Zara";

  return (
    <img
      className="avatar"
      //Quando você quiser passar um atributo de string para a JSX, coloque-o entre aspas simples ou duplas
      //src="https://i.imgur.com/7vQD0fPs.jpg"
      //alt="Gregorio Y. Zara"
      //Mas e se você quiser especificar dinamicamente o atributo src ou alt? Você poderia usar um valor do JavaScript substituindo " e " por { e }:
      src={avatar}
      alt={description}
    />
  );
}
