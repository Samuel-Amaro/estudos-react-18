import { people } from "../../data";
import { getImageUrl } from "../../utils";

type Person = {
  id: number;
  name: string;
  profession: string;
  accomplishment: string;
  imageId: string;
};

type ItemProps = {
  peoples: Person[];
  title: string;
};

function Article({ peoples, title }: ItemProps) {
  return (
    <>
      <article>
        <h2>{title}</h2>
      </article>
      <ul>
        {peoples.map((p) => (
          <li key={p.id}>
            <img src={getImageUrl(p)} alt={p.name} />
            <p>
              <b>{p.name}:</b>
              {" " + p.profession + " "}
              known for {p.accomplishment}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function List() {
  const listItemsChemist = people.filter(
    (people) => people.profession === "chemist",
  );

  const listItemsOthers = people.filter(
    (people) => people.profession !== "chemist",
  );

  return (
    <>
      <h1>Scientists</h1>
      <Article title="Chemist" peoples={listItemsChemist} />
      <Article title="Others Professions" peoples={listItemsOthers} />
    </>
  );
}
