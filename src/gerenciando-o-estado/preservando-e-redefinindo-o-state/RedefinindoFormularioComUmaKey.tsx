/**
 * * Redefinindo um formulário com uma chave
 *
 * Redefinir o estado com uma tecla(key) é particularmente útil ao lidar com formulários.
 *
 * Neste aplicativo de bate-papo, o <Chat> componente contém o estado de entrada de texto:
 */

import { useState } from "react";

function Chat({
  contact,
}: {
  contact: {
    id: number;
    name: string;
    email: string;
  };
}) {
  const [text, setText] = useState("");
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={"Chat to " + contact.name}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}

function ContactList({
  selectedContact,
  contacts,
  onSelect,
}: {
  contacts: {
    id: number;
    name: string;
    email: string;
  }[];
  onSelect: (contact: { id: number; name: string; email: string }) => void;
  selectedContact: {
    id: number;
    name: string;
    email: string;
  };
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact);
              }}
            >
              {contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact) => setTo(contact)}
      />
      {
        //Isso garante que, quando você selecionar um destinatário diferente, o Chatcomponente será recriado do zero, incluindo qualquer estado na árvore abaixo dele. O React também recriará os elementos DOM em vez de reutilizá-los.
      }
      <Chat key={to.id} contact={to} />
    </div>
  );
}

const contacts = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];
