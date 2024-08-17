import { getImageUrl } from "../../utils";

type Props = {
  person: { name: string; imageId: string };
  size?: number;
  profession: string;
  awards: string[];
  discovered: string;
};

function Profile({
  person,
  size = 70,
  profession,
  awards = [],
  discovered,
}: Props) {
  return (
    <>
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
        width={size}
        height={size}
      />
      <ul>
        <li>
          <b>Profession: </b>
          {profession}
        </li>
        <li>
          <b>Awards: {awards.length} </b>
          {awards.join(", ")}
        </li>
        <li>
          <b>Discovered: </b>
          {discovered}
        </li>
      </ul>
    </>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <Profile
          person={{
            name: "Maria Skłodowska-Curie",
            imageId: "szV5sdG",
          }}
          profession="physicist and chemist"
          awards={[
            "Nobel Prize in Physics",
            "Nobel Prize in Chemistry",
            "Davy Medal",
            "Matteucci Medal",
          ]}
          discovered="polonium (chemical element)"
        />
      </section>
      <section className="profile">
        <Profile
          person={{
            name: "Katsuko Saruhashi",
            imageId: "YfeOqp2",
          }}
          profession="geochemis"
          awards={["Miyake Prize for geochemistry", "Tanaka Prize"]}
          discovered="a method for measuring carbon dioxide in seawater"
        />
      </section>
    </div>
  );
}
