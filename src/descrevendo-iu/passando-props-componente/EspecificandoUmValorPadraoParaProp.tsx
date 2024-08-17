import { getImageUrl } from "../../utils";

/**
 * * Especificando um valor padrão para uma prop
 *
 * Se você quer dar a uma prop um valor padrão para usar quando nenhum valor for especificado, pode fazer isso com a desestruturação colocando = e o valor padrão logo depois do parâmetro:
 *
 * Agora, se <Avatar person={...} /> for renderizado sem a prop size, size será igual a 100.
 *
 * O valor padrão é apenas utilizado se a prop size não for especificada ou se você passar size={undefined}. Mas caso você passe size={null} ou size={0}, o valor padrão não será usado.
 * @param param0
 * @returns
 */

export default function Avatar({
  person,
  size = 100,
}: {
  person: { name: string; imageId: string };
  size: number;
}) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
