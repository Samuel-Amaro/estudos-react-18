export default function ContactList({
  contacts,
  selectedId,
  onSelect,
}: {
  contacts: {
    id: number;
    name: string;
    email: string;
  }[];
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <section>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact.id);
              }}
            >
              {contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
