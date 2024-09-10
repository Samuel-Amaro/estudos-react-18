/**
 * * Evite contradições no estado
 *
 * Evite contradições no estado. Quando o estado é estruturado de forma que várias partes do estado possam se contradizer e “discordar” umas das outras, você deixa espaço para erros. Tente evitar isso.
 *
 * Aqui está um formulário de feedback do hotel com as variáveis de estado isSending e isSent:
 */

import { useState } from "react";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("typing");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await sendMessage(text);
    setStatus("sent");
  }

  const isSending = status === "sending";
  const isSent = status === "sent";

  if (isSent) {
    return <h1>Obrigado pelo feedback!</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Como foi sua estadia no Pônei Saltitante?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button disabled={isSending} type="submit">
        Enviar
      </button>
      {isSending && <p>Enviando...</p>}
    </form>
  );
}

// Simula o envio de uma mensagem.
function sendMessage(text: string) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}
