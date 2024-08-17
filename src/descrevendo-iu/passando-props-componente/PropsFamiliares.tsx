/**
 * * PROPS FAMILIARES
 *
 * Props são as informações que você passa usando uma tag JSX. Por exemplo, className, src, alt, width, e height são algumas das props que você pode passar a uma <img>:
 *
 * As props que você pode passar a uma tag <img> são predefinidas (A ReactDOM conforma-se ao padrão HTML). Mas você pode passar quaisquer props aos seus próprios componentes, como um <Avatar>, para customizá-los. Veja como fazer isso!
 *
 * @returns
 */

function Avatar() {
  return (
    //passando props(informações) usaando uma tag jsx
    //aqui são props predefinidas da tag <img>
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return <Avatar />;
}
