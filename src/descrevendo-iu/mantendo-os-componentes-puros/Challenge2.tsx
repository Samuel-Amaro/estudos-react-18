import { useState } from "react";
import { getImageUrl } from "../../utils";

function Panel({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? "Collapse" : "Expand"}
      </button>
      {open && children}
    </section>
  );
}

function Profile({ person }: { person: { name: string; imageId: string } }) {
  return (
    <Panel>
      <Header name={person.name} />
      <Avatar person={person} />
    </Panel>
  );
}

function Header({ name }: { name: string }) {
  return <h1>{name}</h1>;
}

function Avatar({ person }: { person: { name: string; imageId: string } }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}

export default function App() {
  return (
    <>
      <Profile
        person={{
          imageId: "lrWQx8l",
          name: "Subrahmanyan Chandrasekhar",
        }}
      />
      <Profile
        person={{
          imageId: "MK3eW3A",
          name: "Creola Katherine Johnson",
        }}
      />
    </>
  );
}
