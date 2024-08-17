import { getImageUrl } from "../../utils";

//passo 2: leia props dentro de um componente filho
function Avatar({
  person,
  size,
}: {
  person: { name: string; imageId: string };
  size: number;
}) {
  //2: Agora você pode ler essas props dentro do componente Avatar.
  return (
    //passando props(informações) usaando uma tag jsx
    //aqui são props predefinidas da tag <img>
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        //passo 1: passando algumas props ao componente filho Avatar
        person={{ name: "Lin Lanying", imageId: "1bX5QH6" }}
        size={100}
      />
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />
      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}
